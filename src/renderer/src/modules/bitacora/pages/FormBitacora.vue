<template lang="">
    <div class="card">
    <form @submit="onSubmit">

<span class="p-float-label mt-2">
    <Dropdown aria-describedby="text-error-cliente" v-model="cliente" :options="clientes"  placeholder="Seleccione un cliente" class="w-full md:w-14rem" :class="{ 'p-invalid': errorMessageCliente }"/>

  <!-- <InputText id="cliente" v-model="cliente" type="text" :class="{ 'p-invalid': errorMessageCliente }"
    aria-describedby="text-error-cliente" /> -->
  <label for="cliente">Cliente</label>
</span>
<small class="p-error" id="text-error-cliente">{{
errorMessageCliente || "&nbsp;"
}}</small>


<span class="p-float-label mt-2">
    <Dropdown aria-describedby="text-error-operacion" v-model="operacion" :options="operaciones" optionLabel="nombre" placeholder="Seleccione una operacion" class="w-full md:w-14rem" :class="{ 'p-invalid': errorMessageOperacion }"/>

  <!-- <InputText id="cliente" v-model="cliente" type="text" :class="{ 'p-invalid': errorMessageCliente }"
    aria-describedby="text-error-cliente" /> -->
  <label for="operacion">Operacion</label>
</span>
<small class="p-error" id="text-error-operacion">{{
errorMessageOperacion || "&nbsp;"
}}</small>
<!-- <span class="p-float-label mt-2">
  <InputText id="apellidos" v-model="apellidos" type="text" :class="{ 'p-invalid': errorMessageApellidos }"
    aria-describedby="text-error-apellidos" />
  <label for="apellidos">Apellidos</label>
</span>
<small class="p-error" id="text-error-apellidos">{{
errorMessageApellidos || "&nbsp;"
}}</small>

<span class="p-float-label mt-2">
  <InputText id="correo" v-model="correo" type="email" :class="{ 'p-invalid': errorMessageCorreo }"
    aria-describedby="text-error-correo" />
  <label for="correo">Correo</label>
</span>
<small class="p-error" id="text-error-correo">{{
errorMessageCorreo || "&nbsp;"
}}</small>

<span class="p-float-label mt-2">
  <InputText id="cedula" v-model="cedula" type="text" :class="{ 'p-invalid': errorMessageCedula }"
    aria-describedby="text-error" />
  <label for="cedula">Cédula o Ruc</label>
</span>
<small class="p-error" id="text-error-cedula">{{
errorMessageCedula || "&nbsp;"
}}</small>

<span class="p-float-label mt-2">
  <InputText id="password" v-model="password" type="password" :class="{ 'p-invalid': errorMessagePassword }"
    aria-describedby="text-error" />
  <label for="password">Contraseña</label>
</span>
<small class="p-error" id="text-error-pass">{{
errorMessagePassword || "&nbsp;"
}}</small> -->
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
import { createBitacoraFachada } from "../helpers/nuevaBitacora";
export default {
  emits: ["bitacoraInsertada"],
  data() {
    return {
      clientes: ["MEGASTOCKEC", "ECUALIMFOOD", "NOVA", "JOSE ESPINOSA"],
      operaciones: [{
        nombre: "NACIONALIZACION PAPEL MONDI BAYWHITE",
        codigo: "0001"
      }, {
        nombre: "NACIONALIZACION CALEFONES",
        codigo: "0002"
      }]
    }
  },
  methods: {},
  setup(_, { emit }) {
    const loading = ref(false);
    const { handleSubmit, resetForm } = useForm();
    const validationSchema = yup.object({
      cliente: yup.string().required('Campo Requerido'),
      operacion:yup.object().required('Campo Requerido')
    });
    const { value: cliente, errorMessage: errorMessageCliente } = useField(
      "cliente",
      validationSchema.fields.cliente
    );

    const { value: operacion, errorMessage: errorMessageOperacion } = useField(
      "operacion",
      validationSchema.fields.operacion
    );
    const toast = useToast();


    const onSubmit = handleSubmit(async (values) => {
      loading.value = true;

      try {
        // Validate all fields using Yup's validate method
        await validationSchema.validate(values, { abortEarly: false });

        const bitacora = {
          cliente: values.cliente,
          operacion:values.operacion

        };

        createBitacoraFachada(bitacora)
          .then((x) => {
            toast.add({
              severity: "info",
              summary: "Registro completado exitosamente",
              life: 3000,
            });
            loading.value = false;
            emit("bitacoraInsertada")
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
        errorMessageOperacion.value=errors.operacion|| ''

        loading.value = false;
      }
    });

    return {
      loading,
      cliente,
      operacion,
      handleSubmit,
      onSubmit,
      errorMessageOperacion,
      errorMessageCliente,
    };
  },
};
</script>
<style lang="css">
.card {
  margin: 50px
}
</style>