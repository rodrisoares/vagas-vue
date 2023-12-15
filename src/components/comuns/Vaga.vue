<template>
    <div class="card">
      <div class="card-header bg-dark text-white">
        <div class="row">
          <div class="col-6">
            {{ titulo }}
          </div>
          <div class="col-3 d-flex justify-content-end ">
            <button class="btn btn-info btn-sm " @click="candidatarVaga" v-if="!candidaturaEnviada">Candidatar</button> 
            <span v-else>Candidatado</span>
          </div>
          <div class="col-3 d-flex justify-content-end">
            <div class="form-check form-switch  ">
              <label class="form-check-label" > Adicionar aos favoritos </label>
              <input
                class="form-check-input"
                type="checkbox"
                v-model="favorita"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <p>
          {{ descricao }}
        </p>
      </div>
      <div class="card-footer">
        <small class="text-muted">Salário: R$ {{ salario }} | Modalidade: {{ getModalidade }} | Tipo: {{ getTipo }} | Nível: {{ getNivel }} | Número de Vaga(s): {{ quantidade }} | Publicação: {{ getPublicacao }}</small>
      </div>
    </div>
  </template>
   
  <script>
  export default {
    name: "Vaga",
    data: () => ({
      favorita: false,
      candidaturaEnviada: false,
    }),
    props: {
      titulo: {
        type: String,
        required: true,
        validator(p) {
          if (p.length < 5) return false;
          return true;
        },
      },
      descricao: {
        type: String,
        default: "O contratante não forneceu uma descrição",
      },
      salario: {
        type: [Number, String],
        default() {
          return "*".repeat(20);
        },
      },
      modalidade: {
        type: String,
        required: true,
      },
      tipo: {
        type: String,
        required: true,
      },
      nivel: {
        type: String,
        required: true,
      },
      quantidade: {
        type: Number,
        required: true,
      },
      publicacao: {
        type: String,
        required: true,
      },
    },
    mounted() {
      const vagasFavoritas = JSON.parse(localStorage.getItem("vagasFavoritas"));
      if (vagasFavoritas) {
        const a = vagasFavoritas.filter((indice) =>
          indice.titulo.toLowerCase().includes(this.titulo.toLowerCase())
        );
        if (a.length > 0) {
          this.favorita = true;
        } else {
          this.favorita = false;
        }
      }
    },
    beforeUpdate() {
      const vagasFavoritas = JSON.parse(localStorage.getItem("vagasFavoritas"));
      if (vagasFavoritas) {
        const a = vagasFavoritas.filter((indice) =>
          indice.titulo.toLowerCase().includes(this.titulo.toLowerCase())
        );
        if (a.length > 0) {
          this.favorita = true;
        } else {
          this.favorita = false;
        }
      }
    },
    watch: {
      favorita(valorNovo) {
        if (valorNovo) {
          this.emitter.emit("favoritarVaga", this.titulo);
        } else {
          this.emitter.emit("desfavoritarVaga", this.titulo);
        }
      },
      quantidade() {
        this.atualizarQuantidade();
      }
    },
    methods: {
        candidatarVaga() {
            this.candidaturaEnviada = true;
            this.emitter.emit('alerta', {
              tipo: 'sucesso',
              titulo:  `Você se candidatou com sucesso para a vaga ${this.titulo}!`,
            })
        },
    },
    computed: {
      getModalidade() {
        switch (this.modalidade) {
          case "1":
            return "Home office";
          case "2":
            return "Presencial";
        }
        return "";
      },
      getTipo() {
        switch (this.tipo) {
          case "1":
            return "CLT";
          case "2":
            return "PJ";
        }
        return "";
      },
      getNivel() {
        switch (this.nivel) {
          case "1":
            return "Estagiário";
          case "2":
            return "Júnior";
          case "3":
            return "Pleno";
          case "4":
            return "Sênior";
        }
        return "";
      },
      getPublicacao() {
        let dataPublicacao = new Date(this.publicacao);
        return dataPublicacao.toLocaleString("pt-PT");
      },
    },
  };
  </script>
   
   <style scoped>
   span {
     color: #FFFF;
     font-weight: bold;
   }
 </style>