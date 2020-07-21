<template>
  <el-upload
    :ref="refName"
    class="upload"
    :accept="accept"
    :action="uploadUrl"
    :on-success="handleUploadSuccess"
    :before-upload="beforeUpload"
    :on-remove="removeFile"
    :list-type="listType"
    :class="{'single': single}"
    :file-list="fileList"
    :on-preview="onPreview"
    >
    <i class="el-icon-plus"></i>
  </el-upload>
</template>

<script>
export default {
  name: 'hb-upload',
  props: {
    refName: {
      type: String,
      default: 'uploadFile'
    },
    listType: {
      type: String,
      default: 'picture-card'
    },
    single: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: '.png, .jpeg, .jpg'
    },
    fileUnit: {
      type: String,
      default: 'M'
    },
    fileSize: {
      type: Number,
      default: 1
    },
    fileFormat: {
      type: Array,
      default () {
        return ['image/jpeg', 'image/jpg', 'image/png']
      }
    },
    fileList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      uploadUrl: window.location.origin + '/backendapi/upload/upload.cfi'
    }
  },
  methods: {
    handleUploadSuccess (res, file, fileList) {
      if (res.code === 0) {
        this.$emit('onSuccess', res, file, fileList)
      }
    },
    beforeUpload (file) {
      const isJPG = this.fileFormat.indexOf(file.type) > -1
      let isLt2M
      this.fileUnit === 'k' ? isLt2M = file.size / 1024 < this.fileSize : isLt2M = file.size / 1024 / 1024 < this.fileSize
      if (!isJPG) this.$message.error('图片只能是 JPG或png 格式!')
      if (!isLt2M) this.$message.error(`图片大小需小于${this.fileSize}${this.fileUnit}`)
      return isJPG && isLt2M
    },
    removeFile (file, fileList) {
      this.$emit('onRemove', file, fileList)
    },
    onPreview (file) {
      this.$dialog.ImgBox({imgPic: file.url, title: ''})
    }
  }
}
</script>

<style scoped>
.single {
  width: 150px;
  height: 150px;
  overflow: hidden;
}
</style>
