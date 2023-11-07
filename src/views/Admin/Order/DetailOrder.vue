<template>
    <div class="container-fluid m-3 align-self-center">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Chi tiết đơn hàng</h6>
                <!-- <a type="button" class="addproduct" @click="addProduct">AddOrder</a> -->
            </div>
            <div class="card-body">
                <div class="table-responsive" >
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Hình ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Giảm giá</th>
                                <th>Tổng chi phí</th>
                                <!-- <th>Tùy chọn</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="order in orderList" :key="order">
                                <td v-if="order && order.product_id">
                                        <div>
                                            <img class="avatar"  :src="order.product_id.image" alt="">
                                        </div>
                                    </td>
                                <td v-if="order && order.product_id">{{ order.product_id.name }}</td>
                                <td v-if="order && order.product_id"> {{ order.product_id.price }}</td>
                                <td>{{ order.quantity }}</td>
                                <td>{{ order.discount }}</td>
                                <td>{{ order.price }}</td>
                                
                                <!-- <td>
                                    <ul class="d-flex  gap-3 collapsed text-primary">
                                        <li type="button" @click="updateDetail(order._id)">Sửa</li>
                                        <li type="button" @click="deleteDetail(order._id)">Xóa</li>
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
export default {
    data() {
        return {
            token: null,
            orderList: [],
        }
    },
    props: {
        id: { type: String, required: true },

    },
    methods: {
        // list of order histories
        async getDetail(id) {
            // const user_id = jwt_decode(this.token);
            try {
                const response = await OrderService.get(id);
                let index =0
                this.orderList = response.dataDetail
                this.orderList = this.orderList[0]
                
            } catch (error) {
                console.log(error);

            }

        },
        async deleteDetail(id) {
            console.log(id)
            const response = await OrderService.delete(id);
            // if (response.status == 'OK') {
            //   this.$forceUpdate();
            // }
        },
        async updateDetail(id) {
            console.log(id)
            this.$router.push({
                name: "EditOrder",
                params: {
                    id
                },
            });
        },

    },
    mounted() {
        this.token = localStorage.getItem("token");
        this.getDetail(this.id);
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
</style>