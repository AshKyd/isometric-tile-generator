<template>
  <div class="card">
    <div class="card-image">
      <div
        ref="dropTarget"
        class="image"
        @dragover.prevent="dragOver"
        @dragenter="dragEnter"
        @dragleave="dragLeave"
        @drop.prevent="drop"
        :class="{
          dragging
        }"
        :style="{
          'background-color': color,
          'background-image': `url(${image})`,
        }">
      </div>
      <span class="card-title">{{name}}</span>
    </div>
    <div class="card-content card-content-no-padding">

    <ul class="collection collection-no-padding">
      <li class="collection-item switch">
        <label class="justify-between">
          Color
          <input type="checkbox" v-model="isImage" @input="toggleImage">
          <span class="lever"></span>
          Image
        </label>
      </li>
      <li v-if="isImage" class="collection-item justify-between">
        <label :for="label('file-picker')">File:</label>
        <button class="waves-effect waves-light btn-small" @click="$refs.filepicker.click()">Load</button>
        <input hidden :id="label('file-picker')" type="file" @input="onFilePick" ref="filepicker" />
      </li>
      <li v-if="isImage" class="collection-item">
        <label :for="label('brightness')">Brightness:</label>
        <input
          :id="label('brightness')"
          type="range"
          min="-255"
          max="255"
          v-model="brightness"
          @input="applyFilters"
          />
      </li>
      <li v-if="!isImage" class="collection-item justify-between">
        <label :for="label('color-picker')">Color picker:</label>
        <input :id="label('color-picker')" type="color" v-model="color" @input="onChange" />
      </li>
      <li v-if="!isImage" class="collection-item">
        <label :for="label('color-hex')">Hex code:</label>
        <input :id="label('color-hex')" type="text" v-model="color" @input="onChange" />
      </li>
    </ul>
  </div>
</template>

<script>
import { getImageData, runFilters } from "../lib/image.js";
const materialError = error => {
  console.log("oh no an error");
  console.error(error);
  M.toast({ html: error.message });
};
export default {
  props: {
    name: String,
    initialValues: Object
  },
  data() {
    return {
      id: Math.round(Math.random() * 1e10),
      brightness: this.initialValues.brightness || 1,
      image: this.initialValues.image,
      originalImage: this.initialValues.image,
      isImage: !!this.initialValues.image,
      color: this.initialValues.color,
      dragging: false
    };
  },
  methods: {
    label(name) {
      return `image-asset-picker-${name}`;
    },
    onChange() {
      this.$emit("input", {
        brightness: this.brightness,
        color: this.color,
        image: this.image
      });
    },
    dragOver(event) {},
    dragEnter() {
      this.dragging = true;
    },
    dragLeave() {
      this.dragging = false;
    },
    drop(event) {
      this.dragging = false;
      if (event.dataTransfer.files)
        return this.loadFile(event.dataTransfer.files[0]);
    },
    onFilePick(event) {
      this.loadFile(this.$refs.filepicker.files[0]);
    },
    loadFile(file) {
      const reader = new FileReader();
      reader.onload = event => {
        getImageData(event.target.result)
          .then(imageData => {
            this.originalImage = imageData;
            this.brightness = 0;
            this.isImage = true;
            this.applyFilters();
          })
          .catch(materialError);
      };
      reader.onerror = materialError;
      reader.readAsDataURL(file);
    },
    applyFilters() {
      if (!this.originalImage)
        return M.toast({ html: "Click Load or drag a file onto the preview." });
      runFilters(this.originalImage, {
        brightness: this.brightness
      })
        .then(base64Url => {
          this.image = base64Url;
          this.onChange();
        })
        .catch(materialError);
    },
    toggleImage() {
      this.isImage = !this.isImage;
      if (this.isImage) {
        this.applyFilters();
      } else {
        this.image = undefined;
        this.onChange();
      }
    }
  }
};
</script>

<style scoped>
.card-image {
  position: relative;
}
.card-content-no-padding {
  padding: 0;
}
.collection-no-padding {
  margin: 0;
  border: 0;
}
.image {
  position: relative;
  padding-bottom: 100%;
  background-size: contain;
  transition: all 0.1s;
  background-repeat: no-repeat;
  background-position: center;
}
.dragging {
  transform: scale(1.05);
  transform-origin: center;
  z-index: 2;
}
.justify-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
