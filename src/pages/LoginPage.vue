<template>
  <v-container class="pa-0 h-100" fluid>
    <v-row no-gutters class="h-100">
      <v-col class="d-flex align-center justify-center bg-grey-lighten-4" cols="12" md="6">Foto
      </v-col>
      <v-col class="d-flex align-center justify-center" cols="12" md="6">
        <div class="w-100" style="max-width: 400px;">
          <v-form>
            <div class="text-center mb-6">
              <h1>Login</h1>
              <p>Preencha seus dados para logar</p>
            </div>

            <v-text-field l label="Email" required variant="outlined" type="email"></v-text-field>

            <v-text-field label="Senhas" required variant="outlined" type="password"></v-text-field>

            <v-btn block class="mb-3" color="secondary" size="large" type="submit">
              Entrar
            </v-btn>

            <div class="text-center mb-3">
              ou
            </div>

            <v-btn block variant="outlined" class="mb-3" color="primary" size="large" type="submit">
              Cadastre-se
            </v-btn>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
