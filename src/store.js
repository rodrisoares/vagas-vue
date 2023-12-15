import Vuex from 'vuex'
import axios from 'axios';

export default new Vuex.Store({

  state: {
      vagas: [],
      totalVagas: 0, 
  },
  
  getters: {
      getVagas: state => state.vagas,
      getTotalVagas: state => state.totalVagas,
  },

  mutations: {
      adicionarVaga(state, vaga) {
        state.vagas.push(vaga)
        state.totalVagas += vaga.quantidade
      },
      atualizarVagas(state, vagas) {
        state.vagas = vagas
        state.totalVagas = vagas.reduce((acc, vaga) => acc + vaga.quantidade, 0)
      },
      filtrarVagas(state, filtro) {
        if (filtro) {
          const vagas = state.vagas.filter(vaga => vaga.titulo.toLowerCase().includes(filtro.toLowerCase()));
          state.vagas = vagas;
        }
      },
  },

  actions: {
      retornarVagas({ commit }) {
        axios.get('http://localhost:3000/vagas')
          .then(response => {
            commit('atualizarVagas', response.data);
          })
          .catch(error => {
            console.error(error);
          });
      },
  }
})