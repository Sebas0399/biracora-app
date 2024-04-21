<template>
    <Dialog v-model:visible="visibleNuevaOperacion" modal header="Nueva Operacion" :style="{ width: '25rem' }">
        <InsertarOperacion @operacion-insertada="operacionInsert()" />
    </Dialog>
    <div class="card">

        <DataTable :value="operaciones" tableStyle="min-width: 50rem" paginator :rows="10">
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">Operaciones</span>
                    <Button icon="pi pi-plus" rounded raised @click="visibleNuevaOperacion = true" />
                </div>
            </template>
            <Column field="nombre" sortable header="Nombre"></Column>
            <Column field="codigo" sortable header="Codigo"></Column>



        </DataTable>
    </div>

</template>
<script>
import TablaBitacora from '@renderer/modules/bitacora/pages/TablaBitacora.vue'
import { getOperacionesFachada } from '../helpers/getOperacion'
import InsertarOperacion from './InsertarOperacion.vue'

export default {
    components: {
        InsertarOperacion,
        TablaBitacora

    },
    data() {
        return {
            operaciones: null,
            actualOperacion:null,
            visibleNuevaOperacion: false,
            visibeBitacorasOperacion:false
        }
    },
    methods: {
   
        async getOperaciones() {
            await getOperacionesFachada().then((res) => {
                this.operaciones=res
            })
        },
        async operacionInsert() {
            await this.getOperaciones()
            this.visibleNuevaOperacion = false
        },
        getTramitesOperaciones(id){
            this.actualOperacion=id
            this.visibeBitacorasOperacion=true
        }
        
    },
    mounted() {
        this.getOperaciones()
    },
}
</script>
<style></style>