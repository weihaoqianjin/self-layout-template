<template>
  <div class="hb-image">
    <div v-for="(item, index) in imgList" :key="index" class="imgDiv" :style="{'width':width + 'px'}">
      <el-image
        class="img"
        fit="cover"
        :src="item"
        :preview-src-list="getSrcList(index)">
      </el-image>
    </div>
  </div>
</template>
<script type="text/javascript">

export default {
  name: 'HbImage',
  props: {
    imgList: {
      type: Array,
      default: () => {
        return []
      }
    },
    width: {
      type: Number
    }
  },
  methods: {
    getSrcList (index) {
      return this.imgList.slice(index).concat(this.imgList.slice(0, index))
    }
  }
}
</script>
<style type="text/css" lang="scss">
  .hb-image {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    .imgDiv {
      width: 180px;
      height: 140px;
      margin-right: 20px;
      margin-bottom: 20px;
      .img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
