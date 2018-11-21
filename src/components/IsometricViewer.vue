<template>
  <div class="isometric-viewer iso-col"  :style="backgroundColor">
    <div class="left-item preview" ref="preview">
      <IsometricTile
        :width="this.limit(this.sidebar.width)"
        :height="this.limit(sidebar.lockToCube ? this.sidebar.width : this.sidebar.height)"
        :asset-top="assetTop"
        :asset-left="assetLeft"
        :asset-right="sidebar.linkEdges ? assetLeft : assetRight"
        v-model="svgRef"
        />
    </div>
    <div class="iso-row z-depth-5">
      <div class="asset"><ImageAsset name="Top" :initial-values="assetTop" v-model="assetTop" /></div>
      <div class="asset">
        <ImageAsset name="Left" :initial-values="assetLeft" v-model="assetLeft" />
      </div>
      <div class="asset"><ImageAsset v-if="!sidebar.linkEdges" name="Right" :initial-values="assetRight" v-model="assetRight" /></div>
      <IsometricViewerSidebar v-model="sidebar" @save="save" />
    </div>
  </div>

</template>
<script>
import IsometricTile from "./IsometricTile.vue";
import ImageAsset from "./ImageAsset.vue";
import IsometricViewerSidebar from "./IsometricViewerSidebar.vue";
import { color, lightness, saturation } from "kewler";
import { svgToDownload } from "../lib/image";
export default {
  components: { IsometricTile, ImageAsset, IsometricViewerSidebar },
  data() {
    return {
      assetTop: { color: "#6536e9", brightness: 0 },
      assetLeft: { color: "#3e357e", brightness: 0 },
      assetRight: { color: "#4c418b", brightness: 0 },
      svgRef: false,
      sidebar: { linkEdges: false, width: 256, height: 256, lockToCube: true },
      lastBackgroundColor: "",
      lastForegroundColor: ""
    };
  },
  methods: {
    save() {
      svgToDownload(this.svgRef.outerHTML).catch(e =>
        M.toast({ html: e.message })
      );
    },
    limit(value) {
      // FIXME: slowww
      if (!this.$refs.preview) return value;
      const style = window.getComputedStyle(this.$refs.preview);
      const size = parseInt(style.height) - 50;
      return Math.min(value, size);
    }
  },
  computed: {
    backgroundColor() {
      let baseColor;
      if (!this.assetTop.isImage) {
        baseColor = this.assetTop.color;
      } else {
        baseColor = "#000000";
      }
      try {
        const color1 = color(baseColor)(lightness(-45))(saturation(-20))();
        this.lastBackgroundColor = color1;
        const style = {
          "background-color": color1
        };
        return style;
      } catch (e) {
        return this.lastBackgroundColor;
      }
    }
  }
};
</script>

<style scoped>
.assets {
  display: flex;
}
.asset {
  flex: 1;
  display: flex;
}
.isometric-viewer {
  height: 100vh;
}
.iso-row {
  display: flex;
  justify-content: center;
  background: linear-gradient(rgba(255, 255, 255, 0.6), rgb(255, 255, 255));
}
.iso-row > * {
  width: 25%;
  max-width: 250px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
}
.iso-col {
  display: flex;
  flex-direction: column;
}
.preview {
  flex: 1;
  align-items: center;
  display: flex;
  justify-content: center;
  background-image: radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
}
</style>
