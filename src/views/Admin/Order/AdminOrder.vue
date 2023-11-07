<template>
    <div class="container-fluid m-3 align-self-center">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Quản lý đơn hàng</h6>
                <!-- <a type="button" class="addproduct" @click="addProduct">AddOrder</a> -->
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Số điện thoại đặt hàng</th>
                                <th>Người đặt</th>
                                <th>Địa chỉ giao hàng</th>
                                <th>Ngày đặt hàng</th>
                                <th>Tổng chi phí</th>
                                <th>Danh sách mặt hàng</th>
                                <!-- <th>Tùy chọn</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="order in orderList" :key="order">
                                
                                <td>{{ order.user_id.phone }}</td>
                                <td>{{ order.user_id.name }}</td>
                                <td>{{ order.address }}</td>
                                <td>{{  moment(order.createdAt) }}</td>
                                <td>{{ order.totalcost }}</td>
                                <td type="button" class="detail bg-gradient-primary collapsed" @click="detailOrder(order._id)">Danh sách mặt hàng</td>
                                <!-- <td>
                                    <ul class="d-flex  gap-3 collapsed text-primary">
                                        <li type="button" @click="updateProduct(order._id)">Sửa</li>
                                        <li @click="deleteProduct(order._id)">Xóa</li>
                                    </ul>
                                </td> -->
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
import ProductService from "@/services/product.service";
import jwt_decode from "jwt-decode";
import moment from "moment";
export default {
    data() {
        return {
            token: null,
            orderList: [],
        }
    },
    methods: {
        // list of order histories
        async getProduct() {
            // const user_id = jwt_decode(this.token);
            try {
                const response = await OrderService.getAll();
                this.orderList = response.data
                console.log(response)
            } catch (error) {
                console.log(error);

            }

        },
        // async deleteProduct(id) {
        //     console.log(id)
        //     const response = await OrderService.delete(id);
        //     // if (response.status == 'OK') {
        //     //   this.$forceUpdate();
        //     // }
        // },
        detailOrder(id) {
             this.$router.push({
                name: "DetailOrder",
                params: {
                    id
                },
            });
        },
        moment(value) {
            return moment(value).format("DD/MM/YYYY");
        },
        // async updateProduct(id) {
        //     console.log(id)
        //     this.$router.push({
        //         name: "EditOrder",
        //         params: {
        //             id
        //         },
        //     });
        // },
        // async addProduct() {
        //     this.$router.push({
        //         name: "AddProduct",
        //     });
        // },

    },
    mounted() {
        this.token = localStorage.getItem("token");
        this.getProduct();
    },
    filters: {
        moment(value) {
            return moment(value).format("DD/MM/YYYY");
        },
    },
}
</script>

<style scoped>
.avatar {
    width: 30px;
    height: 30px;
}

.text-primary:hover {
    transition: color 0.2s ease-in-out;
    color: #ff0000;
}

.addproduct {
    float: right;
}

.detail{
    border: none;
}
.detail :hover{
    text-decoration-color: #ff0000;
}
</style>