<template>
  <div class="comment">
    <div class="comment-title">
      <div>
        <em class="owner">{{ comment.createdBy.name }}</em>
        <span class="profile">({{ comment.createdBy.profileTypeDisplay }})</span>
      </div>
      <div class="date">{{ comment.created }}</div>
    </div>
    <p>
      {{comment.text}}
    </p>
  </div>
</template>
<script>
  export default {
    name: 'comment-component',
    props: {
      comment: {
        type: Object,
        required: true
      }
    }
  }
</script>
<style lang="sass" scoped>
</style>
