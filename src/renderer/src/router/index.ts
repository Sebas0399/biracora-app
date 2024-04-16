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
      component: () => import("../modules/bitacora/pages/FormBitacora.vue"),
      meta: {
        title: "BitacoraNuevo",
      },
    },
  ],
});

export default router;