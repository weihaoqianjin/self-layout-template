<template>
  <div class="tags-view-container">
    <div class="tags-view-wrapper">
      <div class="fixed">
        <router-link class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in $state.visitedViews" :to="tag.fullPath" :key="tag.path" @click.native="moveToCurrentPage(tag)">
          <span>{{tag.title}}</span>
          <span class='el-icon-close' @click.stop.prevent='closeSelectedTag(tag)' v-show="($state.visitedViews.length !== 1) && (tag.fullPath !== '/homepage/index')"></span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    $route () {
      this.addViewTags()
    }
  },
  methods: {
    tagsOpe () {
      this.$dispatch('setIsAllow', true)
    },
    isActive (route) {
      return route.path === this.$route.path
    },
    addViewTags () {
      let isVisited = this.$state.visitedFullPaths.includes(this.$route.fullPath)
      for (let item of this.$state.visitedViews) {
        if (item.path === this.$route.path) return
      }
      !isVisited && this.$dispatch('addVisitedViews', this.$route)
      this.Bus.$emit('switchFirstMenu', this.$state.sesMenuGroupIndexMap()[this.$route.meta.groupName])
    },
    closeSelectedTag (view) {
      this.tagsOpe()
      this.$dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0]
          this.Bus.$emit('switchFirstMenu', this.$state.sesMenuGroupIndexMap()[latestView.groupName])
          if (latestView) {
            this.$router.push(latestView.fullPath)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    moveToCurrentPage (view) {
      this.tagsOpe()
      this.Bus.$emit('changeMenu', this.$state.sesMenuGroupIndexMap()[view.groupName])
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tags-view-container{
    .tags-view-wrapper {
      background: #fff;
      border-bottom: 1px solid #d8dce5;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
      width: 100%;
      .tags-view-item {
        text-decoration: none;
        display: inline-block;
        position: relative;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;
        margin-bottom: 4px;
        &.active {
          background-color: #409eff;
          color: #fff;
          border-color: #409eff;
          &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
      }
    }
  }
  .fixed {padding-right: 100px}
  .download-area {
    position: absolute;
    right: 20px;
    top: 7px
  }
</style>
<style rel="stylesheet/scss" lang="scss">
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
