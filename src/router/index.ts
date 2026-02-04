import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Gallery from "../views/Gallery.vue";
import ProductDetails from "../views/ProductDetails.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/gallery",
      name: "gallery",
      component: Gallery,
    },
    {
      path: "/gallery/product/:id",
      name: "product-details",
      component: ProductDetails,
    },
  ],
});

export default router;
