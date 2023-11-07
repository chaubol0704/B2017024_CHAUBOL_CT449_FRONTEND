<template>
    <div class="container-fluid m-3 align-self-center">
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Quản lý người dùng</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Avatar</th>
                                            <th>Họ và tên</th>
                                            <th>Số điện thoại</th>
                                            <th>Địa chỉ</th>
                                            <th>Tùy chọn</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="user in userList" :key="user">
                                            <td>
                                                <div >
                                                    <img class="avatar" :src="user.avatar" alt="">
                                                </div>
                                            </td>
                                            <td>{{ user.name }}</td>
                                            <td>{{ user.phone }}</td>
                                            <td>{{ user.address }}</td>    
                                            <td>
                                                <ul class="d-flex   gap-2">
                                                    <li @click="updateUser(user._id)">Sửa</li>
                                                    <li @click="deleteUser(user._id)">Xóa</li>
                                                </ul>
                                            </td>                                      
                                        </tr>
                                    </tbody>                              
                                                                   
                                </table>
                                                
                            </div>
                        </div>
                    </div>
                </div>
</template>
<script>
import FormUser from "@/components/FormUser.vue";
import CartService from "@/services/cart.service";
import OrderService from "@/services/order.service";
import UserService from "@/services/user.service";
import jwt_decode from "jwt-decode";
export default {
    data() {
        return {
            token: null,
            userList: [],
        }
    },
    name: 'AdminUser',
    methods: {
        // list of order histories
        async getUser() {
            // const user_id = jwt_decode(this.token);
            try {
                const response = await UserService.getAll();
                this.userList = response.data
                console.log(this.userList)
            } catch (error) {
                console.log(error);

            }

        },
        async deleteUser(id) {
            console.log(id)
            const response = await UserService.delete(id);
            // if (response.status == 'OK') {
            //   this.$forceUpdate();
            // }
        },
        async updateUser(id) {
            this.$router.push({
                name: "EditUser",
                params: {
                    id
                },
            });
        },


    },
    mounted() {
        this.token = localStorage.getItem("token");
        this.getUser();
    },
}
</script>

<style scoped>
.avatar{
    width: 30px;
    height: 30px;
}
</style>