<template>
  <v-chip :color="color">
    {{ statusTranslate }}
  </v-chip>
</template>

<script setup>
const props = defineProps ({
  status: {
    type: String,
    required: true
  }
})

const color = computed(() => {
  if (props.status === 'active') {
    return 'primary'
  } else if (props.status === 'inactive') {
    return 'red'
  } else {
    return ''
  }
})

const statusTranslate = computed(() => {
  if (props.status === 'active') {
    return 'Ativo'
  } else if (props.status === 'inactive') {
    return 'Inativo'
  } else {
    return props.status
  }
})
</script>
