<template>
  <div class="card collapse-item" :class="{ 'is-fullwidth': $parent.isFullwidth, 'is-active': isActived }">
    <header class="card-header touchable" role="tab" :aria-expanded="selected ? 'true' : 'false'" @click="toggle">
      <h3 class="card-header-title">{{ title }}</h3>
      <span class="card-header-icon">
        <i class="mdi mdi-chevron-right"></i>
      </span>
    </header>
    <transition
      name="collapsed-fade"
      :css="false"
      appear
      @before-appear="before"
      @appear="enter"
      @appear-cancel="cancel"
      @before-enter="before"
      @enter="enter"
      @enter-cancel="cancel"
      @leave="leave"
      @leave-cancel="cancel"
    >
    <div class="card-content" v-show="isActived">
      <div class="card-content-box">
        <slot></slot>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
import anime from 'animejs'

export default {
  props: {
    selected: Boolean,
    title: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      isActived: this.selected
    }
  },

  created () {
    this._isCollapseItem = true
  },

  mounted () {
    this.$on('open', this.$parent.openByIndex)
    if (this.isActived) {
      this.$emit('open', this.index)
    }
  },

  beforeDestroy () {
    if (this.anime && this.targets) {
      anime.remove(this.targets)
    }
    this.$off('open', this.$parent.openByIndex)
  },

  computed: {
    index () {
      return this.$parent.$collapseItems.indexOf(this)
    }
  },

  methods: {
    toggle () {
      if ((this.isActived = !this.isActived)) {
        this.$emit('open', this.index)
      }
    },

    getAnime (targets) {
      if (this.anime) return this.anime
      this.anime = anime({ targets })
      return this.anime
    },

    cancel () {
      this.anime.pause()
    },

    before (targets) {
      if (!this.targets) this.targets = targets
      targets.removeAttribute('style')
    },

    enter (targets, done) {
      const height = targets.scrollHeight
      targets.style.height = 0
      targets.style.opacity = 0
      this.getAnime(targets).play({
        targets,
        duration: 377,
        easing: 'easeOutExpo',
        opacity: [0, 1],
        height,
        complete () {
          targets.removeAttribute('style')
          done()
        }
      })
    },

    leave (targets, complete) {
      this.getAnime(targets).play({
        targets,
        duration: 377,
        easing: 'easeOutExpo',
        opacity: [1, 0],
        height: 0,
        complete
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.collapse-item
  .card-header
    cursor: pointer

  .card-header-icon
    text-align: center
    i
     width: 21px
     transition: transform .377s ease
     transform-origin: 50% 50%

  .card-content
    padding-top: 0
    padding-bottom: 0
    overflow: hidden

  .card-content-box
    padding-top: 20px
    padding-bottom: 20px


  &.is-active
    > .card-header
      > .card-header-icon
        i
         transform: rotate(90deg)



</style>
