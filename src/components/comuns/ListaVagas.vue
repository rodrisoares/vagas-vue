<template>
  <slot :vagas="filteredVagas">
    <div class="h-100 p-5 bg-light border rounded-3">
        <h2>Pesquisar Vagas</h2>
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label>Título da vaga</label>
              <input type="text" class="form-control" placeholder="Pesquise por palavras chaves, por exemplo 'PHP', 'Pleno', 'Analista'" v-model="filtro">
              <small class="form-text text-muted">Informe palavras que estejam relacionadas com o título da vaga que você procura</small>
            </div>
          </div>
        </div>
        <div class="row">
            <div class="col">
                <button class="btn btn-outline-dark mt-2" type="button" @click="filtro = ''">Limpar busca</button>
            </div>
        </div>
        <div class="row mt-3" v-if="!filteredVagas.length">
            <div class="col">
              <p>Nenhuma vaga encontrada com o título: '{{ filtro }}'.</p>
            </div>
        </div>
    </div>
    <div class="row mt-5" v-for="vaga of filteredVagas" :key="vaga.id">
      <div class="col">
        <vaga v-bind="vaga" />
      </div>
    </div>
  </slot>
</template>

<script>
import Vaga from '@/components/comuns/Vaga.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'ListaVagas',
  data: () => ({
    filtro: '',
  }),
  components: {
      Vaga
  },
  created() {
    this.$store.dispatch('retornarVagas');
  },
  computed: {
    ...mapGetters({
      vagas: 'getVagas',
      totalVagas: 'getTotalVagas',
    }),
    filteredVagas() {
      if (!this.filtro) {
        return this.vagas;
      }
      return this.vagas.filter(vaga => vaga.titulo.toLowerCase().includes(this.filtro.toLowerCase()));
    },
    
  },
}
</script>