import { throttle, debounce } from "throttle-debounce";
import { default as imageBrightness } from "image-brightness";
import * as imageFilter from "image-filter-core";
import { default as saveFile } from "save-file";

function createCanvas({ image } = {}) {
  const canvas = document.createElement("canvas");
  if (image) {
    canvas.width = image.width;
    canvas.height = image.height;
  }
  const context = canvas.getContext("2d");
  return { canvas, context };
}

function getImageData(base64Url) {
  return new Promise((resolve, reject) => {
    const image = document.createElement("img");
    image.src = base64Url;
    image.onload = () => {
      const { canvas, context } = createCanvas({ image });
      context.drawImage(image, 0, 0);
      resolve(context.getImageData(0, 0, image.width, image.height));
    };
    image.onerror = e => reject(new Error("Could not load this image."));
  });
}

const runFiltersThrottled = throttle(50, function(data, filters, callback) {
  try {
    const newImageData = imageBrightness({
      data,
      adjustment: Number(filters.brightness) + 0.01
    });
    callback(null, imageFilter.convertImageDataToCanvasURL(newImageData));
  } catch (error) {
    callback(error);
  }
});

function runFilters(imageData, filters) {
  return new Promise((resolve, reject) => {
    runFiltersThrottled(imageData, filters, (err, base64Url) => {
      if (err) return reject(err);
      return resolve(base64Url);
    });
  });
}

function getImageBinaryFromSvg(svgString) {
  return new Promise((resolve, reject) => {
    const svg = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svg);
    const image = document.createElement("img");

    image.onload = function() {
      const { canvas, context } = createCanvas({ image });
      context.drawImage(image, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob(resolve, "image/png");
    };
    image.src = url;

    // the onerror handler isn't working here for some reason
    setTimeout(() => {
      if (image.complete) reject(new Error("Error exporting image. Sorry!"));
      image.src = "";
    }, 2000);
  });
}

function svgToDownload(svgString) {
  return getImageBinaryFromSvg(svgString).then(blob =>
    saveFile(blob, "image.png")
  );
}

export { getImageData, runFilters, svgToDownload, getImageBinaryFromSvg };
