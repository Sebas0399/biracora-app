<template>
    <div class="flex justify-content-center flex-wrap">
        <DataTable :value="bitacoras" tableStyle="min-width: 50rem" paginator  :rows="10" >
            <Column field="nroBitacora" header="Tramite"></Column>
            <Column field="cliente" header="Cliente"></Column>
        </DataTable>

    </div>
</template>
<script>
import { getBitacorasFachada } from '../helpers/getBitacora'

export default {
    data() {
        return {
            bitacoras: null
        }
    },
    methods: {
        async getBitacoras() {
            await getBitacorasFachada().then((res) => {
                this.bitacoras = res
            })
        }
    },
    mounted() {
        this.getBitacoras()
    },
}
</script>
<style></style>