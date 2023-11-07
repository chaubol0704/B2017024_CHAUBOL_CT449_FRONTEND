<script>

import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import ProductService from "@/services/product.service";
import CartService from "@/services/cart.service";
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {
      // baseURL: 'https://limitless-lake-55070.herokuapp.com/',
      //baseURL: "http://localhost:8080/",
      products: null,
      categories: null,
      // key: 0,
      token: null,
      cartCount: 0,
    };

  },
  components: { Footer, Navbar },
  methods:{
    
    async getAll() {
      try {
        this.products = await ProductService.getAll();
        // this.products = this.products.data
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        // this.$router.push({
        //   name: "notfound",
        //   params: {
        //     pathMatch: this.$route.path.split("/").slice(1)
        //   },
        //   query: this.$route.query,
        //   hash: this.$route.hash,
        // });
      }
    },
    async getCategory() {
      try {
        this.products = await ProductService.getAll();
        console.log(this.products.data)
      } catch (error) {
        console.log(error);
        
      }
    },
    resetCartCount() {
      this.cartCount = 0;
    },
    async fetchData(){
        if (!this.token) {
          return;
        }
        const user_id = jwt_decode(this.token);
        try {
          const response = await CartService.getCartUser(user_id.id);
          this.cartCount = response.data.length
          console.log(this.cartCount)
        } catch (error) {
          console.log(error);

        }
    }
  },
  created(){
    this.getAll()
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.fetchData();
  },
}
</script>


<template>
  <div id="app">
      <Navbar
        :cartCount="cartCount"
        @resetCartCount="resetCartCount"
        
      />
      <!-- v-if="!['Signup', 'Signin'].includes($route.name)" -->
      <div>
          <router-view v-if="products" :products="products"/>
      </div>
      
      <Footer></Footer>
  </div>
  
</template>


<style>
html {
  overflow-y: scroll;
}
</style>