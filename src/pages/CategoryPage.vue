<template>
  <ContainerDefault>
    <div class="d-flex justify-space-between">
      <h2>Categorias</h2>
      <v-btn
        color="secondary"
        prepend-icon="$plus"
        :to="{name: 'form-category'}"
      >
        Nova Categoria
      </v-btn>
    </div>
    <v-data-table :headers="headers" :items="categories"></v-data-table>
  </ContainerDefault>
</template>

<script setup>
import { useApi } from '@/composables/useApi';
import { useNotification } from '@/composables/useNotification';
import { onMounted } from 'vue';

const notification = useNotification()
const api = useApi()

const headers = [
    { title: 'Name', value: 'name', sortable: true },
    { title: 'Status', value: 'status', sortable: true },
  ]

const categories = ref([])

async function getCategories(){
  try {
    const response = await api.get('/category')
    categories.value = response.data
    console.log("response")
    console.log(response)
  } catch (error) {
    console.error(error)
    notification.error('Erro ao listar categorias')
  }
}

onMounted(() => {
  getCategories()
})
</script>
