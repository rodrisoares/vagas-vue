<template>
    <div :class="estiloAlerta" role="alert">
        <slot name="titulo">
            <h3>Título da mensagem de feedback</h3>
        </slot>
        <slot>
            <p>Mensagem de feedback</p>
        </slot>
    </div>
</template>

<script>
export default {
    name: 'Alerta',
    props: { tipo: String },
    computed: {
        estiloAlerta() {
            switch(this.tipo) {
                case 'erro': return 'alert alert-danger'
                case 'sucesso': return 'alert alert-success'
                default: return 'alert alert-success'
            }
        }
    }
}
</script>
<style scoped>
.alert {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
}
</style>