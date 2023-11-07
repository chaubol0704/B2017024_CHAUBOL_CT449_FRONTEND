<template>
    <div class="mt-n1">
        <div class="p-10"></div>
        <div class="container-sm text-center" >
            <div class="row justify-content-md-center">
                <div class="col-sm-2 border border-dark ">
                    <div class="mt-5">
                            <a class="sidebar-brand d-flex align-items-center justify-content-center">
                                <div class="sidebar-brand-icon rotate-n-15">
                                    <i class="fas fa-laugh-wink"></i>
                                </div>
                                <div class="sidebar-brand-text mx-3">QUẢN LÝ</div>
                            </a>
                            <ul class=" navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                                    <!-- Nav Item - Pages Collapse Menu -->
                                    <li class="nav-item">
                                        <router-link  :to="{ name: 'AdminUser' }">
                                            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                                                aria-expanded="true" aria-controls="collapsePages">
                                                <!-- <i class="fas fa-fw fa-folder"></i> -->
                                                <span>User</span>
                                            </a>
                                        </router-link>
                                    
                                    </li>

                                    <!-- Nav Item - Charts -->
                                    <li class="nav-item">
                                        <router-link  :to="{ name: 'AdminProduct' }">
                                            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                                                aria-expanded="true" aria-controls="collapsePages">
                                                <!-- <i class="fas fa-fw fa-folder"></i> -->
                                                <span>Product</span>
                                            </a>
                                        </router-link>
                                    </li>

                                    <!-- Nav Item - Tables -->
                                    <li class="nav-item">
                                        <router-link  :to="{ name: 'AdminOrder' }">
                                            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                                                aria-expanded="true" aria-controls="collapsePages">
                                                <!-- <i class="fas fa-fw fa-folder"></i> -->
                                                <span>Order</span>
                                            </a>
                                        </router-link>
                                    </li>

                                    <!-- Divider -->
                                    <!-- <hr class="sidebar-divider d-none d-md-block"> -->

                                    <!-- Sidebar Toggler (Sidebar) -->
                                    <div class="text-center d-none d-md-inline">
                                        <button class="rounded-circle border-0" id="sidebarToggle"></button>
                                    </div>

                                </ul>
                        </div>
                </div>

                <div  class="col-sm-10">
                    <router-view></router-view>
                </div>
            </div>
        
        
        </div>
    </div>
    
</template>

<script>
import Table from '../../components/Table/Table.vue'
export default {
    name: 'Admin',
    components:{
        Table
    },
    data() {
        return {
        }
    },
    mounted() {
        var token = localStorage.getItem("token")
        // if (!token) {
        //     this.$router.push({ name: "Login" })
        // }
    },
    methods: {
        logout() {
            localStorage.setItem("token", "")
            this.$router.push({ name: "Login" })
        }
    }
}
</script>

<style scoped>
.mt-n1 {
  margin-top: 50px !important;
}
</style>