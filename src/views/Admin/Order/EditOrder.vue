<template>
    <div v-if="order">
        <div class="card-header">Chỉnh sửa thông tin sản phẩm</div>
        <FormProduct :order="order" @submit:order="updateOrder" />
    </div>
</template>

<script>
import FormOrder from "@/components/Order/FormOrder.vue";
import CartService from "@/services/cart.service";
import OrderService from "@/services/order.service";
import ProductService from "@/services/product.service";
import jwt_decode from "jwt-decode";
export default {
    components: {
        FormOrder
    },
    data() {
        return {
            token: null,
            order: null,
        }
    },
    props: {
        id: { type: String, required: true },

    },

    methods: {
        // list of order histories
        async getOrder(id) {
            // const user_id = jwt_decode(this.token);
            try {
                console.log(id)
                const response = await OrderService.get(id);
                this.order = response.data
                console.log(response)
            } catch (error) {
                console.log(error);

            }

        },
        async updateOrder(data) {
            // console.log(data)
            console.log(data)
            try {
                const response = await OrderService.update(this.id, data);
                if (response) {
                    this.$router.push({
                        name: "AdminOrder",

                    });
                }
            } catch (error) {
                console.log(error);
            }
        },


    },
    created() {
        // this.token = localStorage.getItem("token");
        this.getOrder(this.id);
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
</style>