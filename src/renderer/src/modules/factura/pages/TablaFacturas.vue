<template>
    <Dialog v-model:visible="visibleNuevaFactura" modal header="Nueva Factura" :style="{ width: '25rem' }">
        <InsertarFactura @factura-insertada="operacionInsert()" />
    </Dialog>
    <div class="card">

        <DataTable :value="operaciones" tableStyle="min-width: 50rem" paginator :rows="10">
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">Facturas</span>
                    <Button icon="pi pi-plus" rounded raised @click="visibleNuevaOperacion = true" />
                </div>
            </template>
            <Column field="nombre" sortable header="Nombre"></Column>
            <Column field="codigo" sortable header="Codigo"></Column>



        </DataTable>
    </div>

</template>
<script>
import { getFacturasFachada } from '../helpers/getFactura'
import InsertarFactura from './InsertarFactura.vue'

export default {
    components: {
        InsertarFactura,
    },
    data() {
        return {
            facturas: null,
            actualFactura:null,
            visibleNuevaFactura: false,
        }
    },
    methods: {
   
        async getFacturas() {
            await getFacturasFachada().then((res) => {
                this.operaciones=res
            })
        },
        async facturaInsert() {
            await this.getFacturas()
            this.visibleNuevaFactura = false
        },
        
    },
    mounted() {
        this.getFacturas()
    },
}
</script>
<style></style>