<template>
  <v-container class="pa-sm-4 pa-md-0 h-100" fluid>
    <v-row no-gutters class="h-100">
      <v-col class="d-flex align-center justify-center bg-grey-lighten-4" cols="12" md="6">
        <div class="text-center">
          <v-img src="/undraw/register-icon.svg" class="mx-auto mb-4" max-width="300"></v-img>
          <h1 class="text-secondary mb-2">Vuecommerce</h1>
          <p class="text-grey-darken-1">Sua plataforma de gerenciamento de estoque</p>
        </div>
      </v-col>
      <v-col class="d-flex align-center justify-center" cols="12" md="6">
        <div class="w-100" style="max-width: 400px;">
          <v-form v-model="valid" @submit.prevent="handleSubmit()">
            <div class="text-center mb-6">
              <h1 class="text-secondary">Faça seu cadastro</h1>
              <p class="text-grey-darken-1">Fácil, rápido e gratuito!</p>
            </div>

            <v-text-field
              v-model="formData.name"
              label="Nome"
              required
              variant="outlined"
              type="text"
              class="mb-3"
              :rules="[rules.required]"
            ></v-text-field>

            <v-text-field
              v-model="formData.email"
              label="Email"
              required
              variant="outlined"
              type="email"
              class="mb-3"
              :rules="[rules.required, rules.email]"
            ></v-text-field>

            <v-text-field
              v-model="formData.password"
              :append-inner-icon="passwordIsVisible ? 'mdi-eye' : 'mdi-eye-off'"
              label="Senhas"
              required
              variant="outlined"
              :type="passwordIsVisible ? text : 'password'"
              class="mb-3"
              :rules="[rules.required, rules.maxLength, rules.minLength, rules.password]"
              @click:append-inner="showPassword"
            >
            </v-text-field>

            <v-btn
              block
              class="mb-3"
              color="secondary"
              size="large"
              type="submit"
              :disabled="!valid"
            >
              Cadastrar
            </v-btn>

            <div class="text-center mb-3">
              ou
            </div>

            <v-btn :to="{name: 'login'}" block variant="outlined" color="primary" size="large">
              Tenho uma conta
            </v-btn>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useNotification } from '@/composables/useNotification';
import { useApi } from '@/composables/useApi';

const api = useApi()
const router = useRouter()
const notification = useNotification()

const formData = ref({
  name: '',
  email: '',
  password: ''
})

const passwordIsVisible = ref(false)
const valid = ref(false)

const rules = {
  required: value => !!value || 'Campo obrigatório',

  email: value => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'E-mail inválido'
  },

  minLength: value => value?.length >= 8 || 'Mínimo de 8 caracteres',
  maxLength: value => value?.length <= 20 || 'Máximo de 20 caracteres',

  password: value => {
    if (!value) return true

    if (value.length < 8)
      return 'A senha deve ter no mínimo 8 caracteres'

    if (!/[a-z]/.test(value))
      return 'A senha deve conter ao menos 1 letra minúscula'

    if (!/[A-Z]/.test(value))
      return 'A senha deve conter ao menos 1 letra maiúscula'

    if (!/\d/.test(value))
      return 'A senha deve conter ao menos 1 número'

    return true
  }
}

function showPassword() {
  passwordIsVisible.value = !passwordIsVisible.value
}

function handleSubmit () {
  if(!valid.value) {
    notification.error('Formulário incompleto')
  }

  createUser()
}

async function createUser(){
  try {
    await api.post('/user', {
      ...formData.value
    })
    notification.success('Usuário cadastrado com sucesso!')
    router.push({name: 'login'})
  } catch (error) {
    notification.error('Não foi possível realizar o cadastro.', 9000)
    console.error(error)
  }
}
</script>
