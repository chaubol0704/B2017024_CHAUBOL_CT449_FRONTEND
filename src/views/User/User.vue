<template>
    <div class="section">
        <!-- container -->
        <div class="container">
            <!-- row -->
            <div class="row" v-if="infor">
                <div class="col-md-2">
                    <div id="product-main-img">
                        <div class="product-preview avatar">
                            <img :src="infor.avatar" alt="">
                        </div>
                    </div>
                </div>

                <div class="col-md-10">
                    <div class="product-details">
                        <h2>Tên: {{ infor.name }}</h2>
                        <h2>Địa chỉ: {{ infor.address }}</h2>
                        <h2>Số điện thoại: {{ infor.phone }}</h2>
                        <br><br><br>
                        <div class="add-to-cart">
                            <router-link :to="{
                                name: 'EditUser',
                                params: { id: infor._id },
                            }">
                            <a ><button class="add-to-cart-btn"><i></i>Chỉnh sửa thông tin</button></a>
                            </router-link>
                        </div>

                        <!-- <FormUser :infor="infor" @submit:infor="updateUser" /> -->
                    </div>
                </div>
            </div>
            <!-- /row -->
        </div>
        <!-- /container -->
    </div>
</template>

<script>
import FormUser from "@/components/FormUser.vue";
import CartService from "@/services/cart.service";
import OrderService from "@/services/order.service";
import UserService from "@/services/user.service";
import jwt_decode from "jwt-decode";
export default {
    components: {
        FormUser,
    },
    data() {
        return {
            token: null,
            orderList: [],
            infor: null,

        }
    },
    props: ["baseURL"],
    name: 'User',
    methods: {
        // list of order histories
        async getUser() {
            const user_id = jwt_decode(this.token);
            try {
                const response = await UserService.get(user_id.id);
                
                this.infor = response.data
                console.log(this.infor)
            } catch (error) {
                console.log(error);

            }

        },
        async deleteOrder(id) {
            console.log(id.id)
            const response = await OrderService.delete(id.id);
            // if (response.status == 'OK') {
            //   this.$forceUpdate();
            // }
        },
        async updateAddress(id) {
            const data = { address: this.address }
            console.log(id)
            const response = await OrderService.update(id, data);
            if (response.status == 'OK') {
                this.$router.go(0);
                // console.log(response)
            }
        },
         
      
    },
    mounted() {
        this.token = localStorage.getItem("token");
        this.getUser();
    },
};

</script>

<style scoped>
.avatar {
    width: 80px;
    height: 80px;

}
</style>
