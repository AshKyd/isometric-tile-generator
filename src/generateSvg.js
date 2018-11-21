function generateSvg({ width, height }) {
  const edgeHeight = (height || width) / width;
  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg id="svg" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" width=${width} height=${width /
    2 +
    height / 2} version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink">
    
<defs>
    <g id="flat" transform="matrix(1,-.5,1,.5,0,${width / 4})">
        <use xlink:href="#grass" />
    </g>
    <g id="side-left" transform="matrix(1,0.5,0,${edgeHeight},0,${width / 4})">
        <use xlink:href="#grass" />
    </g>
    <g id="side-right" transform="matrix(1,-0.5,0,${edgeHeight},${width /
    2},${width / 2})">
        <use xlink:href="#grass" />
    </g>
    
    <image id="grass" xlink:href="https://i.imgur.com/U6huXdN.png" x="0" y="0" height="${width /
      2}px" width="${width / 2}px"/>

</defs>
<g>
    <use x="0" y="0" xlink:href="#flat" />
    <use x="0" y="0" xlink:href="#side-left" />
    <use x="0" y="0" xlink:href="#side-right" />
</g>
</svg>`;
}

export default generateSvg;
