<template>
  <div class="sidebar">
    <div class="link form-item">
      <label>
        <input type="checkbox" v-model="linkEdges" class="filled-in" @change="save" />
        <span class="sr-only">Link edges</span>
      </label>

      <label>
        <input type="checkbox" v-model="lockToCube" class="filled-in" @change="save" />
        <span class="sr-only">Lock to cube</span>
      </label>
    </div>
    <div class="dimensions-width form-item">
      <label for="width">Size</label>
      <div class="inline">
        <input type="range" min="8" max="1024" step="8" v-model="width" />
          <input type="text" id="width" name="width" v-model="width" />
      </div>
    </div>

    <div class="dimensions-height form-item" v-if="!lockToCube">
      <label for="height">Height</label>
      <div class="inline">
        <input type="range" min="0" max="1024" step="8" v-model="height" />
          <input type="text" id="height" name="height" v-model="height" />
      </div>
    </div>

    <div class="save">
      <button class="btn" @click="$emit('save')">Export PNG</button>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: { value: Object },
  data() {
    return Object.assign(
      this.value || {
        width: 256,
        height: 256,
        linkEdges: false,
        lockToCube: false
      }
    );
  },
  methods: {
    save() {
      this.$emit("input", this);
    }
  }
};
</script>

<style scoped>
.sidebar {
  padding: 0.5rem 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.inline {
  display: flex;
}
.inline input[type="text"] {
  width: 33%;
  margin-left: 10px;
}
.btn {
  min-width: 75%;
  margin: 0 0 0 auto;
  display: block;
}
.form-item {
  margin-bottom: 1rem;
}
.link label {
  margin-right: 1rem;
}
input[type="range"] {
  border: none;
}
label {
  color: #4f4f4f;
}
</style>
