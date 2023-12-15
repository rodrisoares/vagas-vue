<template>
  <div class="container py-4">

    <ListaVagas></ListaVagas>

    <div class="row mt-5">
      <div class="col-4">
        <indicador titulo="Vagas abertas" :indicador="totalVagas" bg="bg-dark" color="text-white"></indicador>
      </div>
      <div class="col-4">
        <indicador titulo="Profissionais cadastrados" indicador="225" bg="bg-dark" color="text-white"></indicador>
      </div>
      <div class="col-4">
        <indicador titulo="Visitantes online" :indicador="usuariosOnline" bg="bg-ligth" color="text-dark"></indicador>
      </div>
    </div>
  </div>
</template>

<script>
import Indicador from '@/components/comuns/Indicador.vue'
import ListaVagas from '@/components/comuns/ListaVagas.vue'

export default {
  name: 'Home',
  components: {
    Indicador,
    ListaVagas
  },
  data: () => ({
    usuariosOnline: 0
  }),
  methods: {
    getUsuariosOnline() {
      this.usuariosOnline = Math.floor(Math.random() * 101) 
    }
  },
  created() {
    setInterval(this.getUsuariosOnline, 5000)
  },
  computed: {
    totalVagas() {
      return this.$store.getters.getTotalVagas 
    },
  }
}
</script>

<style scoped></style>
