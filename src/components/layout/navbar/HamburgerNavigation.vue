<template>
    <nav class="slideout-navigation" :class="{ isOpen: isOpen }">
      <ul class="menu slideout-menu">
        <li class="menu-list slideout-menu-item " v-for="item in items">
          <router-link :to="item.destination" :exact="item.exact" v-translate>{{ item.text }}</router-link>
        </li>
      </ul>
      <div class="veridens-logo">
        <img src="../../../assets/images/veridens_logo_white.png" alt="Veridens">
      </div>
    </nav>
</template>
<script>
  export default {
    name: 'hamburger-navigation',
    props: {
      items: {
        type: Array,
        default: () => []
      },
      isOpen: {
        default: false
      }
    }
  }
</script>
<style lang="sass" scoped>
  .menu-list
    border-bottom: 1px solid #000
    &:hover
      background: none
    a
     padding: 1.31rem 0.75rem
     color: #fff
     &:hover
       background: none
       color: #3ce683
    a.is-active
     background: none
     color: #3ce683
     &:active
       color: #3ce683


  .slideout-navigation
    position: absolute
    left: -23.2rem
    z-index: 99
    width: 23.1rem
    height: 100%
    margin-top: 0
    background: #242829
    -webkit-overflow-scrolling: touch
    transition: all 0.4s cubic-bezier(0.16, 0.68, 0.43, 0.99)
    &.isOpen
      left: 0
      @media screen and (max-width: 450px)
        width: 100%

    @media screen and (min-width: 1126px)
      position: relative
      display: -ms-flexbox
      display: flex
      -webkit-box-orient: vertical
      -webkit-box-direction: normal
      -ms-flex-direction: column
      flex-direction: column
      margin-left: -23.1rem
      margin-top: -1px
      height: auto
      left: 0
      z-index: 8
      &.isOpen
        margin-left: 0

    .menu
      padding: 1.31em 2.31em 2.31em

  .slideout-menu-item button.button.navbar-burger
    position: absolute
    right: -51px
    margin-right: 0
    border: none
    transition: all 0.4s ease-in
    @media screen and (min-width: 1008px)
      display: block

  .isOpen button.button.navbar-burger
    position: relative
    right: 0

  .slideout-menu-item
    cursor: pointer

  .veridens-logo
    position: absolute
    width: 100%
    max-width: 106px
    left: 0
    right: 0
    bottom: 0
    margin: 1rem auto
</style>
