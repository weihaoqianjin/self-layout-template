<script>
  export default {
    name: 'hb-menu-collapse-transition',
    functional: true,
    render(createElement, context) {
      const data = {
        props: {
          mode: 'out-in',
          duration: '300',
        },
        on: {
          beforeEnter(el) {
            el.classList.add('hb-menu-collapse')
            if (!el.dataset) el.dataset = {}
            el.dataset.oldPaddingTop = el.style.paddingTop
            el.dataset.oldPaddingBottom = el.style.paddingBottom

            el.style.height = '0'
            el.style.paddingTop = 0
            el.style.paddingBottom = 0
          },

          enter(el) {
            el.dataset.oldOverflow = el.style.overflow
            if (el.scrollHeight !== 0) {
              el.style.height = el.scrollHeight + 'px'
              el.style.paddingTop = el.dataset.oldPaddingTop
              el.style.paddingBottom = el.dataset.oldPaddingBottom
            } else {
              el.style.height = ''
              el.style.paddingTop = el.dataset.oldPaddingTop
              el.style.paddingBottom = el.dataset.oldPaddingBottom
            }

            el.style.overflow = 'hidden'
          },

          afterEnter(el) {
            el.classList.remove('hb-collapse')
            el.style.height = '';
            el.style.overflow = el.dataset.oldOverflow;
          },

          beforeLeave(el) {
            if (!el.dataset) el.dataset = {}
            el.dataset.oldPaddingTop = el.style.paddingTop
            el.dataset.oldPaddingBottom = el.style.paddingBottom
            el.dataset.oldOverflow = el.style.overflow

            el.style.height = el.scrollHeight + 'px'
            el.style.overflow = 'hidden'
          },

          leave(el) {
            if (el.scrollHeight !== 0) {
              el.classList.add('hb-menu-collapse')
              el.style.height = 0
              el.style.paddingTop = 0
              el.style.paddingBottom = 0
            }
          },

          afterLeave(el) {
            el.classList.remove('hb-menu-collapse')
            el.style.height = ''
            el.style.overflow = el.dataset.oldOverflow
            el.style.paddingTop = el.dataset.oldPaddingTop
            el.style.paddingBottom = el.dataset.oldPaddingBottom
          }
        }
      }
      return createElement('transition', data, context.children)
    }
  }
</script>
<style scoped>
  .hb-menu-collapse {
    transition:.3s height ease-in-out,.3s padding-top ease-in-out,.3s padding-bottom ease-in-out;
  }
</style>