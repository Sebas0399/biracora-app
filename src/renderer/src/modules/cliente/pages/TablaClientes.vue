<template>
    <Dialog v-model:visible="visibleNuevoCliente" modal header="Nuevo Cliente" :style="{ width: '25rem' }">
        <InsertarCliente @cliente-insertado="clienteInsert()" />
    </Dialog>

    <Dialog v-model:visible="visibeBitacorasCliente" modal header="Bitacora" :style="{ width: '75rem' }">
        <TablaBitacora  :idCliente="actualCliente"/>
    </Dialog>

    <div class="card">

        <DataTable :value="clientes" tableStyle="min-width: 50rem" paginator :rows="10">
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">Clientes</span>
                    <Button icon="pi pi-plus" rounded raised @click="visibleNuevoCliente = true" />
                </div>
            </template>
            <Column field="nombre" sortable header="Nombre"></Column>
            <Column sortable header="Tramites">
                <template #body="slotProps">
                    <span class="p-buttonset">
                        <Button label="Ver" 
                            @click="getTramitesCliente(slotProps.data._id)" />

                    </span>
                </template>
            </Column>


        </DataTable>
    </div>

</template>
<script>
import TablaBitacora from '@renderer/modules/bitacora/pages/TablaBitacora.vue'
import { getClientesFachada } from '../helpers/getCliente'
import InsertarCliente from './InsertarCliente.vue'
export default {
    components: {
        InsertarCliente,
        TablaBitacora

    },
    data() {
        return {
            clientes: null,
            actualCliente:null,
            visibleNuevoCliente: false,
            visibeBitacorasCliente:false
        }
    },
    methods: {
   
        async getClientes() {
            await getClientesFachada().then((res) => {
                this.clientes=res
            })
        },
        async clienteInsert() {
            await this.getClientes()
            this.visibleNuevoCliente = false
        },
        getTramitesCliente(id){
            this.actualCliente=id
            this.visibeBitacorasCliente=true
        }
        
    },
    mounted() {
        this.getClientes()
    },
}
</script>
<style></style>