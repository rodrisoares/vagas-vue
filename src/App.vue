<template>
  <div>
    <vagas-favoritas></vagas-favoritas>
    <topo-padrao />
    <alerta v-if="exibirAlerta" :tipo="alerta.tipo">
      <template v-slot:titulo>
        <h5>{{ alerta.titulo }}</h5>
      </template>
      <p>{{ alerta.descricao }}</p>
    </alerta>
    <router-view></router-view>
  </div>
</template>

<script>
import Alerta from '@/components/comuns/Alerta.vue'
import VagasFavoritas from '@/components/comuns/VagasFavoritas.vue'
import TopoPadrao from '@/components/layouts/TopoPadrao.vue'

export default {
  name: 'App',
  data: () => ({
    exibirAlerta: false,
    alerta: { titulo: '', descricao: '', tipo: '' }
  }),
  components: {
    Alerta,
    TopoPadrao,
    VagasFavoritas
  },
  mounted() {
    this.emitter.on('alerta', (a) => {
      this.alerta = a
      this.exibirAlerta = true
      setTimeout(() => this.exibirAlerta = false, 4000)
    })
  }
}
</script>

<style scoped></style>
