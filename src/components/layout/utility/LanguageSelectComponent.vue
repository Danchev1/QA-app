<template>
  <div class="field">
    <div class="control">
      <div class="select">
        <select name="language" v-model="$language.current">
          <option v-for="(language, key) in $language.available" :value="key">{{ language }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'language-select-component'
  }
</script>
