<template>
    <Dialog v-model:visible="visibleNuevaBitacora" modal header="Nueva Bitacora" :style="{ width: '25rem' }">
        <InsertarBitacora @bitacora-insertada="bitacoraInsert()" />
    </Dialog>
    <div class="card">

        <DataTable v-model:filters="filtros" filterDisplay="row" :value="bitacoras" tableStyle="min-width: 50rem"
            paginator :rows="10">
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">Bitacoras</span>
                    <Button icon="pi pi-plus" rounded raised @click="visibleNuevaBitacora = true" />
                </div>
            </template>
            <Column field="nroBitacora" sortable header="Tramite"></Column>
            <Column field="fechaTramite" sortable header="Fecha Arribo"></Column>
            <Column v-if="idCliente==null" field="cliente.nombre" header="Cliente" :showFilterMenu="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.cliente.nombre }}</span>
                    </div>
                </template>
                <template #filter="{ filterModel, filterCallback }" >

                    <!-- <MultiSelect v-model="filterModel.value" @change="filterCallback()" :options="clientes" optionLabel="nombre" placeholder="Any" class="p-column-filter" style="min-width: 14rem" :maxSelectedLabels="1">
                        <template #option="slotProps">
                            <div class="flex align-items-center gap-2">
                                <span>{{ slotProps.option.nombre }}</span>
                            </div>
                        </template>
                    </MultiSelect> -->

                    <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="clientes" placeholder="Select One" class="p-column-filter" style="min-width: 12rem" :showClear="true">
                        <template #option="slotProps">
                            <span>{{ slotProps.option }}</span>
                        </template>
                    </Dropdown>
                </template>
            </Column>
            <Column v-else field="cliente.nombre" sortable header="Cliente"></Column>

            <Column field="operacion.nombre" sortable header="Operacion"></Column>
            <Column field="" sortable header="Fecha ETA"></Column>
            <Column field="" sortable header="# Entrega"></Column>
            <Column field="" sortable header="DAI/DAE"></Column>
            <Column field="" sortable header="Liquidación"></Column>
            <Column field="" sortable header="Naviera"></Column>
            <Column field="" sortable header="Almacenera"></Column>
            <Column field="" sortable header="Observaciones"></Column>

            <Column sortable header="Status">
                <template #body="slotProps">
                    <span class="p-buttonset">
                        <Button :label="slotProps.data.status" :severity="getSeverity(slotProps.data.status)" />
                    </span>
                </template>
            </Column>

        </DataTable>
    </div>

</template>
<script>
import { getClientesFachada } from '@renderer/modules/cliente/helpers/getCliente';
import { getBitacorasFachada, getBitacorasIdFachada } from '../helpers/getBitacora'
import InsertarBitacora from './InsertarBitacora.vue'
import { FilterMatchMode } from 'primevue/api';

export default {
    props: {
        idCliente: String
    },
    components: {
        InsertarBitacora
    },
    data() {
        return {
            clientes:null,
            bitacoras: null,
            visibleNuevaBitacora: false,
            filtros: {
                'cliente.nombre': { value: null, matchMode: FilterMatchMode.CONTAINS },
                name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                representative: { value: null, matchMode: FilterMatchMode.IN },
                status: { value: null, matchMode: FilterMatchMode.EQUALS },
                verified: { value: null, matchMode: FilterMatchMode.EQUALS }
            },
        }
    },

    methods: {
        getSeverity(status) {
            if (status === "PENDIENTE") {
                return "warning"

            }
            else {
                return "success"
            }
        },
        async getClientes(){
            await getClientesFachada().then((res)=>{
                var a=[]
                res.forEach((d)=>{
                    a.push(d.nombre)
                })
                this.clientes=a
                console.log(this.clientes)
            })
        },
        async getBitacoras() {
            if (this.idCliente != null) {
                await getBitacorasIdFachada(this.idCliente).then((res) => {
                    this.bitacoras = this.convertirFechas(res)
                })
            }
            else {
                await getBitacorasFachada().then((res) => {
                    this.bitacoras = this.convertirFechas(res)
                })
            }

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
            return bitacoras
        }
    },
    mounted() {
        console.log(this.idCliente)
        this.getClientes()
        this.getBitacoras()
    },
}
</script>
<style></style>