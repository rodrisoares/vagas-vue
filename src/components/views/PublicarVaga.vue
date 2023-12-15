<template>
  <div class="container py-4">
    <div class="row">
      <div class="col">
        <h4>Apresente a sua vaga para milhares de profissionais de TI! </h4>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col">
        <label class="form-label">Título da Vaga</label>
        <input type="text" class="form-control" v-model="titulo">
        <div class="form-text">Por exemplo: Programador JavaScript e VueJS.</div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col">
        <label class="form-label">Descrição</label>
        <textarea type="text" class="form-control" v-model="descricao"></textarea>
        <div class="form-text">Informe os detalhes da vaga.</div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col">
        <label class="form-label">Salário</label>
        <input type="number" class="form-control" v-model="salario">
        <div class="form-text">Informe o salário.</div>
      </div>

      <div class="col">
        <label class="form-label">Modalidade</label>
        <select class="form-select" v-model="modalidade">
          <option value="" disabled>--Selecione</option>
          <option value="1">Home Office</option>
          <option value="2">Presencial</option>
        </select>
        <div class="form-text">Informe onde as atividades serão realizadas.</div>
      </div>  
    </div>
    
    <div class="row mt-3">
      <div class="col">
        <label class="form-label">Tipo</label>
        <select class="form-select" v-model="tipo">
          <option value="" disabled>--Selecione</option>
          <option value="1">CLT</option>
          <option value="2">PJ</option>
        </select>
      <div class="form-text">Informe o tipo de contratação.</div>
      </div>
      
        <div class="col">
          <label class="form-label">Nível</label>
          <select class="form-select" v-model="nivel">
            <option value="" disabled>--Selecione</option>
            <option value="1">Estagiário</option>
            <option value="2">Júnior</option>
            <option value="3">Pleno</option>
            <option value="4">Sênior</option>
          </select>
          <div class="form-text">Informe o nível da vaga.</div>
        </div> 
        
        <div class="col">
          <label class="form-label">Quantidade de Vaga(s)</label>
          <input type="number" class="form-control" v-model="quantidade">
          <div class="form-text">Informe a quantidade de vagas disponíveis.</div>
        </div>
    
    </div>
    <div class="row mt-3">
      <div class="col">
        <button type="submit" class="btn btn-primary" @click="salvarVaga()">Publicar</button>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PublicarVaga',
  data: () => ({
    titulo: '',
    descricao: '',
    salario: '',
    modalidade: '',
    tipo: '',
    nivel: '',
    quantidade: ''
  }),
  methods: {
    salvarVaga() {
      let tempoDecorrido = Date.now()
      let dataAtual = new Date(tempoDecorrido)

      let vaga = {
        titulo: this.titulo,
        descricao: this.descricao,
        salario: this.salario,
        modalidade: this.modalidade,
        tipo: this.tipo,
        nivel: this.nivel,
        quantidade: this.quantidade,
        publicacao: dataAtual.toISOString() 
      }

      if(this.validaFormulario()) {
        axios.post('http://localhost:3000/vagas', vaga)
          .then(response => {
            console.log(response)
            this.emitter.emit('alerta', {
              tipo: 'sucesso',
              titulo: `A vaga ${this.titulo} foi cadastrada com sucesso!`,
            })
            this.$store.commit('adicionarVaga', vaga)
            this.$router.push({ name: 'Home' })
            this.resetaFormularioCadastroVaga()
          })
          .catch(error => {
            console.error(error);
            this.emitter.emit('alerta', {
              tipo: 'erro',
              titulo: 'Opsss... Não foi possível realizar o cadastro da vaga!',
              descricao: 'Parece que você esqueceu de preencher alguma informação. Tente novamente!'
            })
          });
      } else {
        this.emitter.emit('alerta', {
          tipo: 'erro',
          titulo: 'Opsss... Não foi possível realizar o cadastro da vaga!',
          descricao: 'Parece que você esqueceu de preencher alguma informação. Tente novamente!'
        })
      }
    }, 
    resetaFormularioCadastroVaga() {
      this.titulo = ''
      this.descricao = ''
      this.salario = ''
      this.modalidade = ''
      this.tipo = ''
    },
    validaFormulario() {
      let valido = true
      
      if(this.titulo === '') valido = false
      if(this.descricao === '') valido = false
      if(this.salario === '') valido = false
      if(this.modalidade === '') valido = false
      if(this.tipo === '') valido = false

      return valido
    }
  }
}
</script>

<style></style>
