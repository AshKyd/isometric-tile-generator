<template>
  <div>
  <svg
    ref="svg"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="width / 2 + height / 2"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink">

  <defs>
      <g
        id="flat"
        :transform="`matrix(1,-.5,1,.5,0,${width / 4})`"
        >
          <use xlink:href="#assetTop" />
      </g>
      <g
        id="side-left"
        :transform="`matrix(1,0.5,0,${edgeHeight},0,${width / 4})`"
        >
          <use xlink:href="#assetLeft" />
      </g>
      <g
        id="side-right"
        :transform="`matrix(1,-0.5,0,${edgeHeight},${width / 2},${width / 2})`"
        >
          <use xlink:href="#assetRight" />
      </g>

      <!-- Top -->
      <image
        v-if="assetTop.image"
        :key="assetTop.image + 1"
        id="assetTop"
        :href="assetTop.image"
        x="0"
        y="0"
        :height="width/2"
        :width="width/2"
        />
      <rect
        v-else
        :key="assetTop.color + 2"
        id="assetTop"
        x="0"
        y="0"
        :fill="assetTop.color"
        :height="width/2"
        :width="width/2"
        />

      <!-- Left -->
      <image
        v-if="assetLeft.image && height"
        :key="assetLeft.image + 3"
        id="assetLeft"
        :href="assetLeft.image"
        x="0"
        y="0"
        :height="width/2"
        :width="width/2"
        />
      <rect
        v-if="!assetLeft.image && height"
        :key="assetLeft.color + 4"
        id="assetLeft"
        x="0"
        y="0"
        :fill="assetLeft.color"
        :height="width/2"
        :width="width/2"
        />

      <!-- Right -->
      <image
        v-if="assetRight.image && height"
        :key="assetRight.image + 5"
        id="assetRight"
        :href="assetRight.image"
        x="0"
        y="0"
        :height="width/2"
        :width="width/2"
        />
      <rect
        v-if="!assetRight.image && height"
        :key="assetRight.color + 6"
        id="assetRight"
        x="0"
        y="0"
        :fill="assetRight.color"
        :height="width/2"
        :width="width/2"
        />

  </defs>
  <g>
      <use x="0" y="0" xlink:href="#flat" />
      <use x="0" y="0" xlink:href="#side-left" />
      <use x="0" y="0" xlink:href="#side-right" />
  </g>
  </svg>
</div>
</template>

<script>
export default {
  props: {
    width: Number,
    height: Number,
    image: String,
    assetTop: Object,
    assetLeft: Object,
    assetRight: Object
  },
  mounted() {
    this.$emit("input", this.$refs.svg);
  },
  updated() {
    this.$emit("input", this.$refs.svg);
  },
  computed: {
    edgeHeight() {
      return (this.height || this.width) / this.width;
    }
  }
};
</script>
