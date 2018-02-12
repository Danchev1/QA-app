<template>
  <transition
    :name="transition"
    mode="in-out"
    appear
    :appear-active-class="enterClass"
    :enter-active-class="enterClass"
    :leave-active-class="leaveClass"
    v-on:after-leave="$emit('left')">
    <div :class="classes" v-if="show">
    <div class="modal-background" @click="deactivate"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" @click="deactivate"></button>
      </header>
      <section class="modal-card-body">
        <slot name="card-content"></slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="card-footer">
        </slot>
      </footer>
    </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'card-modal-component',
    props: {
      transition: {
        type: String,
        default: 'fade'
      },
      title: {
        type: String
      },
      show: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      enterClass () {
        return `${this.transition}In`
      },
      visible () {
        return getComputedStyle(this.$el).getPropertyValue('display') === 'none'
      },
      leaveClass () {
        return `${this.transition}Out`
      },
      classes () {
        return ['modal', 'animated', 'is-active']
      }
    },
    methods: {
      deactivate () {
        this.$emit('deactivate', false)
      },
      closeModal () {
        return new Promise(resolve => this.$el.style === undefined ? resolve() : this.$once('left', () => resolve()))
      }
    },
    mounted () {
      document.body.appendChild(this.$el)
    }
  }
</script>
