<template>
    <ContainerDefault>
    <div class="d-flex justify-space-between">
      <h2>Cadastro de Categoria</h2>
    </div>

      <v-form class="mt-3" v-model="valid" @submit.prevent="handleSubmit()">
        <v-text-field
          v-model="formCategory.name"
          label="Nome"
          required
          variant="outlined"
          type="text"
          class="mb-1"
          :rules="[rules.required]"
        ></v-text-field>

        <v-select
          v-model="formCategory.status"
          label="Status"
          :items="status"
          item-title="title"
          item-value="value"
          persistent-hint
          single-line
          variant="outlined"
          :rules="[rules.required]"
        ></v-select>

        <div class="d-flex justify-end ga-2">
          <v-btn :to="{name: 'category'}">
            Voltar
          </v-btn>

          <v-btn
            color="secondary"
            type="submit"
            :disabled="!valid"
          >
            {{idCategory ? 'Atualizar' : 'Cadastrar'}}
          </v-btn>
        </div>
      </v-form>
  </ContainerDefault>
</template>

<script setup>
import { useApi } from '@/composables/useApi'
import { useNotification } from '@/composables/useNotification'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const notification = useNotification()
const api = useApi()
const router = useRouter()
const route = useRoute()
const idCategory = ref('')

const valid = ref(false)

const formCategory = ref({
  name: '',
  status: 'active'
})

const status = [
  { title: 'Ativo', value: 'active'},
  { title: 'Inativo', value: 'inactive'}
]

const rules = {
  required: value => !!value || 'Campo obrigatório'
}

onMounted(() => {
  if (route.params?.id) {
    idCategory.value = route.params?.id
    getCategory(idCategory.value)
  }
})

function handleSubmit() {
  if(!valid.value) {
    notification.error('Formulário incompleto')
  }
  idCategory.value ? updateCategory(idCategory.value) : createCategory()
}

async function createCategory(){
  try {
    await api.post('/category',{
      ...formCategory.value
    })
    notification.success('Categoria cadastrada com sucesso')
    router.push({ name: 'category' })
  } catch (error) {
    console.error(error)
    notification.error('Erro ao salvar categoria')
  }
}

async function getCategory(id) {
  try {
    const response = await api.get(`/category/${id}`)
    formCategory.value = {
      name: response.data.name,
      status: response.data.status
    }
  } catch (error) {
    console.error(error)
    notification.error('Erro ao buscar categoria')
  }
}

async function updateCategory(id){
  try {
    await api.put(`/category/${id}`,{
      ...formCategory.value
    })
    notification.success('Categoria atualizada com sucesso')
    router.push({ name: 'category' })
  } catch (error) {
    console.error(error)
    notification.error('Erro ao salvar categoria')
  }
}
</script>
