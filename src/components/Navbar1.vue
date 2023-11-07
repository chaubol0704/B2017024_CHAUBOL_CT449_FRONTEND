<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-center">
        <router-link class="navbar-brand" :to="{ name: 'Home' }">
            <img id="logo" src="../assets/icon.png" />
        </router-link>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">

            <form class="form-inline ml-auto mr-auto gap-10">
                <div class="input-group gap-2">
                    <input size="100" type="text" class="form-control" placeholder="Search Items" aria-label="Username"
                        aria-describedby="basic-addon1" />
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="search-button-navbar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </span>
                    </div>
                </div>
            </form>
           
            
                <!-- <ul class="navbar-nav  ml-auto" >
                    <li v-if="!token" class="nav-item" id="button">
                        <button type="button" class="btn btn-outline-primary ">
                            <router-link class="text-black"  :to="{ name: 'Signin' }">Đăng Nhập</router-link>
                        </button>
                    </li> -->
<!-- id="dropdownMenuButton1"  aria-labelledby="dropdownMenuButton1"-->

                   <!-- <li class=" dropdown nav-item" v-if="token" id="button" >
                        <button class="btn btn-secondary dropdown-toggle" type="button" 
                          data-bs-toggle="dropdown" aria-expanded="false">
                            Accounts
                        </button>
                        <ul class="dropdown-menu" > -->
                            <!-- <router-link
                            class="dropdown-item"
                            v-if="!token"
                            :to="{ name: 'Signin' }"
                            >Log In
                        </router-link> -->
                            <!-- <li><a class="dropdown-item" v-if="token" href="#" @click="signout">Sign Out</a></li>
                        </ul>
                    </li> -->

        <div id="top-header">
            <div class="container">
                <ul class="header-links pull-right">
                   
                    <div class="dropdown ">
                        <div class="dropdown-toggle text-danger"  data-toggle="dropdown">
                            <li><a href="#"><i class="fa fa-user-o"></i></a></li>
                        </div>
                        <div class="dropdown-menu" >                                               
                            <a class="dropdown-item" href="/cart/list">Giỏ hàng của tôi</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="/cart/orders">Đơn hàng của tôi</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="/cart/checkout">Đặt hàng</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="/users/info">Chi tiết tài khoản</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="/users/logout">Đăng xuất</a>                    
                        </div>
                    </div>
            
                    <div class="dropdown ">
                        <div class="dropdown-toggle text-danger"  data-toggle="dropdown">
                            <li><a href="#"><i class="fa fa-user-o"></i>Tài khoản của tôi</a></li>
                        </div>
                        <div class="dropdown-menu" >                         
                            <a class="dropdown-item" href="/users/login">Đăng nhập</a>                                            
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="/users/signUp">Đăng ký tài khoản</a>                     
                        </div>
                    </div>
         
                </ul>
            </div>
        </div>

                    <!-- <li class="nav-item">
                        <router-link class="nav-link text-light" :to="{ name: 'Order' }">Orders</router-link>
                        
                    </li> -->
                    <!-- <li class="nav-item">
                        <div id="cart">
                            <span id="nav-cart-count">{{ cartCount }}</span>
                             <router-link class="text-light " :to="{ name: 'Cart' }">
                                        <i class="bi-cart text-danger" 
                                            style="font-size:36px"></i>
                                </router-link>
                        </div>
                    </li>  -->
                <!-- </ul> -->
                
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
    props: ["cartCount"],
    data() {
        return {
            token: null,
        };
    },
    methods: {
        signout() {
            localStorage.removeItem("token");
            this.token = null;
            this.$emit("resetCartCount");
            this.$router.push({ name: "Home" });
            swal({
                text: "Logged you out. Visit Again",
                icon: "success",
                closeOnClickOutside: false,
            });
        },
        showtoken(){
            console.log(this.token)
        }
    },
    mounted() {
        this.token = localStorage.getItem("token");
        this.showtoken()
        console.log(this.token)
    },
};
</script>

<style scoped>
#logo {
    width: 150px;
    margin-left: 20px;
    margin-right: 20px;
}

.nav-link {
    color: rgba(255, 255, 255);
}

#search-button-navbar {
    background-color: #febd69;
    border-color: #febd69;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
}

#nav-cart-count {
    background-color: red;
    color: white;
    border-radius: 50%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    font-size: 10px;
    margin-left: 10px;
}

#cart {
    position: relative;
    font-size: 3px;
}
#button {
    position: relative;
    font-size: 1px;
}
</style>