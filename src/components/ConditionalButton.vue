<template>
  <div>
    <button v-if="enabled" @click="click" class="mt-2 block w-full btn btn-blue"><slot></slot></button>
    <button v-else class="mt-2 block w-full btn btn-blue hover:bg-blue-500 opacity-50 cursor-not-allowed" disabled><slot></slot></button>
  </div>
</template>

<script>
export default {
  props: ['enabled'],
  methods: {
    click: function () {
      this.$emit('click')
    }
  }
}
</script>
