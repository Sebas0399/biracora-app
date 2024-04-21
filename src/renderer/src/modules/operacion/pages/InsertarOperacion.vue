<template lang="">
    <div class="card">
    <form @submit="onSubmit">

<span class="p-float-label mt-2">

  <InputText id="nombre" v-model="nombre" type="text" :class="{ 'p-invalid': errorMessageCliente }"
    aria-describedby="text-error-nombre" />
  <label for="nombre">Nombre</label>
</span>
<small class="p-error" id="text-error-nombre">{{
errorMessageCliente || "&nbsp;"
}}</small>
<span class="p-float-label mt-2">

<InputText id="codigo" v-model="codigo" type="text" :class="{ 'p-invalid': errorMessageCodigo }"
  aria-describedby="text-error-codigo" />
<label for="codigo">Codigo</label>
</span>
<small class="p-error" id="text-error-codigo">{{
errorMessageCodigo || "&nbsp;"
}}</small>



<div>
  <Button type="submit" label="Registro" :loading="loading" />
</div>
</form>
</div>
<Toast />

</template>
<script>
import { ref } from "vue";

import { useToast } from "primevue/usetoast";
import { useField, useForm } from "vee-validate";
import * as yup from 'yup';
import { Bitacora } from "@renderer/domain/bitacora";
import { createOperacionFachada } from "../helpers/nuevaOperacion";
export default {
    emits: ["operacionInsertada"],
    data() {
        return {

        }
    },
    methods: {},
    setup(_, { emit }) {
        const loading = ref(false);
        const { handleSubmit, resetForm } = useForm();
        const validationSchema = yup.object({
            nombre: yup.string().required('Campo Requerido'),
            codigo: yup.string().required('Campo Requerido')
        });
        const { value: nombre, errorMessage: errorMessageCliente } = useField(
            "nombre",
            validationSchema.fields.nombre
        );

        const { value: codigo, errorMessage: errorMessageCodigo } = useField(
            "codigo",
            validationSchema.fields.codigo
        );
        const toast = useToast();


        const onSubmit = handleSubmit(async (values) => {
            loading.value = true;

            try {
                // Validate all fields using Yup's validate method
                await validationSchema.validate(values, { abortEarly: false });

                const operacion = {
                    nombre: values.nombre,
                    codigo: values.codigo,

                };

                createOperacionFachada(operacion)
                    .then((x) => {
                        toast.add({
                            severity: "info",
                            summary: "Registro completado exitosamente",
                            life: 3000,
                        });
                        loading.value = false;
                        emit("operacionInsertada")
                        resetForm();
                    })
                    .catch((error) => {
                        toast.add({
                            severity: "error",
                            summary: "No se pudo completar el registro",
                            life: 3000,
                        });
                        loading.value = false;
                    });
            } catch (error) {
                const errors = {};
                if (error.inner) {
                    error.inner.forEach((err) => {
                        errors[err.path] = err.message;
                    });
                }

                errorMessageCliente.value = errors.cliente || '';
                errorMessageCodigo.value = errors.cliente || '';

                loading.value = false;
            }
        });

        return {
            loading,
            nombre,
            codigo,
            handleSubmit,
            onSubmit,
            errorMessageCliente,
            errorMessageCodigo
        };
    },
};
</script>
<style lang="css">
.card {
    margin: 50px
}
</style>