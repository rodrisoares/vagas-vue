<template>
    <div>
      <div class="vagas-favoritas">
        <button
          class="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          Vagas Favoritas <span class="badge bg-secondary">{{vagasFavoritas.length}}</span>
        </button>
      </div>
   
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header">
          <h5 id="offcanvasRightLabel">Vagas Favoritas</h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="(vaga, index) in vagasFavoritas"
              :key="index"
            >
              {{ vaga.titulo }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
   
  <script>
  export default {
    name: "VagasFavoritas",
    data: () => ({
      vagasFavoritas: [],
    }),
    mounted() {
      const vagaFavorita = JSON.parse(localStorage.getItem("vagasFavoritas"));
      // verificar se vagasFavoritas já existe em localStorage, se existir atribuir vagaFavorita a vagasFavoritas, se não existir começar com um array vazio
      if (vagaFavorita) {
        this.vagasFavoritas = vagaFavorita;
      } else {
        this.vagasFavoritas = [];
      }
      this.emitter.on("favoritarVaga", (titulo) => {
        if (vagaFavorita) { // verifica se vagaFavorita existe e se contém a vaga
          const a = vagaFavorita.filter((indice) =>
            indice.titulo.toLowerCase().includes(titulo.toLowerCase())
          );
   
          if (a.length < 1) { // se não existir a vaga, colocamos no array vagasFavoritas, se já existir não fazemos nada
            this.vagasFavoritas.push({ titulo: titulo });
            localStorage.setItem(
              "vagasFavoritas",
              JSON.stringify(this.vagasFavoritas)
            );
          }
        } else { // se vagaFavorita não existir colocamos a vaga em vagasFavoritas
          this.vagasFavoritas.push({ titulo: titulo });
          localStorage.setItem(
            "vagasFavoritas",
            JSON.stringify(this.vagasFavoritas)
          );
        }
      });
      this.emitter.on("desfavoritarVaga", (titulo) => {
        this.vagasFavoritas = JSON.parse(localStorage.getItem("vagasFavoritas"));
        let indiceArray = this.vagasFavoritas.findIndex(
          (item) => item.titulo === titulo
        );
        if (indiceArray !== -1) this.vagasFavoritas.splice(indiceArray, 1);
        localStorage.setItem(
          "vagasFavoritas",
          JSON.stringify(this.vagasFavoritas)
        );
      });
    },
  };
  </script>
   
  <style scoped>
  .vagas-favoritas {
    position: absolute;
    z-index: 1;
    top: 7px;
    right: 75px;
  }
   
  @media (min-width: 992px) {
    .vagas-favoritas {
      position: absolute;
      z-index: 1;
      top: 7px;
      right: 7px;
    }
  }
  </style>