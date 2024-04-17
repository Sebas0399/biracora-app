<template>
    <Dialog v-model:visible="visibleNuevaBitacora" modal header="Nueva Bitacora" :style="{ width: '25rem' }">
        <FormBitacora @bitacora-insertada="bitacoraInsert()" />
    </Dialog>
    <div class="card">

        <DataTable :value="bitacoras" tableStyle="min-width: 50rem" paginator :rows="10">
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">Bitacoras</span>
                    <Button icon="pi pi-plus" rounded raised @click="visibleNuevaBitacora = true" />
                </div>
            </template>
            <Column field="nroBitacora" sortable header="Tramite"></Column>
            <Column field="fechaTramite" sortable header="Fecha Arribo"></Column>
            <Column field="cliente" sortable header="Cliente"></Column>
            <Column field="operacion.nombre" sortable header="Operacion"></Column>
            <Column field="" sortable header="Fecha ETA"></Column>
            <Column field="" sortable header="# Entrega"></Column>
            <Column field="" sortable header="DAI/DAE"></Column>
            <Column field="" sortable header="Liquidación"></Column>
            <Column sortable header="Status">
                <template #body="slotProps">
                    <span class="p-buttonset">
                        <Button :label="slotProps.data.status" 
                            :severity="getSeverity(slotProps.data.status)" />

                    </span>
                </template>
            </Column>

        </DataTable>
    </div>

</template>
<script>
import { getBitacorasFachada } from '../helpers/getBitacora'
import FormBitacora from './FormBitacora.vue'
export default {
    components: {
        FormBitacora
    },
    data() {
        return {
            bitacoras: null,
            visibleNuevaBitacora: false
        }
    },
    methods: {
        getSeverity(status) {
            if (status === "PENDIENTE") {
                return "warning"

            }
            else{
                return "success"
            }
        },
        async getBitacoras() {
            await getBitacorasFachada().then((res) => {
                this.bitacoras = this.convertirFechas(res)
            })
        },
        async bitacoraInsert() {
            await this.getBitacoras()
            this.visibleNuevaBitacora = false
        },
        convertirFechas(bitacoras) {
            const formatDate = (dateString) => {
                const date = new Date(dateString);
                const day = date.getUTCDate();
                const month = date.getUTCMonth() + 1;
                const year = date.getUTCFullYear();
                return `${day}/${month}/${year}`;
            };
            bitacoras.forEach(element => {
                element.fechaTramite = formatDate(element.fechaTramite)
            });
            console.log(bitacoras)
            return bitacoras
        }
    },
    mounted() {
        this.getBitacoras()
    },
}
</script>
<style></style>