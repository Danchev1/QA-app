<template>
  <div class="progress" ref="progress">
    <div class="progress-bar"
         :style="{ width: progress + '%' }">
    </div>
    <div class="progress-bar-text" ref="bartext">{{ progress + '%' }}</div>
  </div>
</template>

<script>
  export default {
    name: 'progress-bar-component',
    props: {
      progress: {
        type: Number,
        required: true
      }
    }

    /*  methods: {
        barWidth (event) {
          let progress = this.$refs.progress.offsetWidth
          let progressBar = this.$refs.bartext
          progressBar.style.width = progress + 'px'
        }
      },
      mounted () {
        this.$nextTick(function () {
          window.addEventListener('resize', this.barWidth)
          this.barWidth()
        })
      },
      beforeDestroy () {
        window.addEventListener('resize', this.barWidth())
      }
      */
  }

</script>
<style lang="sass">

</style>
