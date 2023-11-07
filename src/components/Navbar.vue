<template>
    <nav class="navbar gap-5 ">

        <router-link class="navbar-brand" :to="{ name: 'Home' }">
            <img id="logo" class="my-image" src="../assets/logo_gym.png" />
        </router-link>

        <div class="">
          <ul class="nav-menu">
              <li v-if="!token" class="nav-item" id="button">
                 <a type="button" >
                      <router-link class="text-black"  :to="{ name: 'Signin' }">Đăng Nhập</router-link>
                  </a>
              </li> 
              <li v-if="isAdmin" class="nav-item" id="button">
                   <a type="button" >
                        <router-link class="text-black"  :to="{ name: 'Admin' }">Quản Lý</router-link>
                    </a>
                </li> 
       
            <li class="nav-item" v-if="token">
              <a class="nav-link" href="#">Tài khoản</a>
              <ul class="nav-dropdown">
                <li class="nav-item">
                          <router-link class="text-light " :to="{ name: 'User' }">
                              <a class="nav-link" >Thông tin</a>
                          </router-link>
                        </li>
                <li class="nav-item">
                      <router-link class="text-light " :to="{ name: 'Order' }">
                          <a class="nav-link" >Đơn hàng</a>
                      </router-link>
                    </li>
                <li class="nav-item">
                  <a class="nav-link" v-if="token" href="#" @click="signout">Đăng xuất</a>
                </li>
              </ul>
            </li>
            <div class="navbar-cart">
              <router-link class="text-light " :to="{ name: 'Cart' }">
                  <i class="fa fa-shopping-cart"></i>
              </router-link>
              <span class="cart-count">{{ cartCount }}</span>
          </div> 
          </ul>
        </div>
        
      </nav>
</template>

<script>
import UserService from "@/services/user.service";
import jwt_decode from "jwt-decode";
export default {
    name: "Navbar",
    props: ["cartCount"],
    data() {
        return {
            token: null,
            isAdmin: false,
        };
    },
    methods: {
         async getUser() {
          const user_id = jwt_decode(this.token);
          try {
            const response = await UserService.get(user_id.id);
            this.isAdmin = response.data.isAdmin
            console.log(this.isAdmin)
          } catch (error) {
            console.log(error);
          }
        },
        signout() {
            localStorage.removeItem("token");
            this.token = null;
            this.$emit("resetCartCount");
            this.$router.push({ name: "Home" });
        
        },
    },
    mounted() {
        this.token = localStorage.getItem("token");
        this.getUser();
    },
};
</script>

<style scoped>
.navbar {
    /* background-color: #fff; */
    font-size: 1.2rem;
    padding: 10px;
    background-color: rgb(185, 192, 161);
    color: white;
    
    text-align: center;
    display: flex;
    justify-items: center;
}
.my-image {
  border: 0px;
  background-color: transparent;
  width: 70px;
}
.nav{
  padding-right: 90px ;
}
.nav-menu {
    list-style-type: none;
    margin: 0;
    padding: 10px;
    right: 50px;
    
}

.nav-menu li {
    color: rgba(255, 255, 255);
    float: center;
    
}
.nav-item {
    display: inline-block;
    margin-right: 10px;
    /* width: 1rem; */
}

.nav-link {
    color: #000;
    font-size: 18px;
    text-decoration: none;
}

.nav-dropdown {
    display: none;
    position: absolute;
    background-color: #fff;
    padding: 10px;
    z-index: 1000;
}

.nav-item:hover .nav-dropdown {
    display: block;
}

.nav-item:hover .nav-dropdown {
  display: block;
}

.navbar-brand {
  float: left;
  margin-right: 20px;
}

.navbar-search {
  float: right;
  width: 30px;
}

.navbar-cart {
  float: right;
  margin-right: 10px;
  position: relative;
  font-size: 5px;
}

.fa-shopping-cart {
  color: #000;
  font-size: 20px;
}

.cart-count {
  color: red;
  font-size: 16px;
}
</style>