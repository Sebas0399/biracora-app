import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Bitacora",
      component: () => import("../modules/bitacora/pages/TablaBitacora.vue"),
      meta: {
        title: "Bitacora",
      },
    },
    {
      path: "/form",
      name: "NuevaBitacora",
      component: () => import("../modules/bitacora/pages/InsertarBitacora.vue"),
      meta: {
        title: "BitacoraNuevo",
      },
    },
    {
      path: "/clientes",
      name: "Cliente",
      component: () => import("../modules/cliente/pages/TablaClientes.vue"),
      meta: {
        title: "Cliente",
      },
    },

    {
      path: "/operaciones",
      name: "Operacion",
      component: () => import("../modules/operacion/pages/TablaOperaciones.vue"),
      meta: {
        title: "Operacion",
      },
    },

  ],
});

export default router;