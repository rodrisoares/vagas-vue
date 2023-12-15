import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from '@/store'

//importar o pacote mitt
import mitt from 'mitt'

//criar a instância do pacote mitt
const emitter = mitt()

//iniciar a instância do vue com base no componente
//createApp(App).mount('#app')
const app = createApp(App)

//configurar a instância do pacote mitt como sendo uma propriedade global
//essa propriedade estará disponível para todas as instâncias de componentes dentro do app
app.config.globalProperties.emitter = emitter

//adicionando as configurações de rotas a instância do Vue
app.use(router)

//adicionando as configurações de store a instância do Vue
app.use(store)

//associar a instância do vue com o elemento html de id app
app.mount('#app')
