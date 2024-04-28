<template>
  <div>
    <ClientsList />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ClientsList from './components/views/dashboard/clients/ClientsList.vue'

export default {
    name: 'App',
    computed: {
        ...mapState({
            showLoading: (state) => state.showLoading
        })
    },
    components: {
        ClientsList
    },
    mounted () {}
}
</script>
