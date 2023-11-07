<template>
    <div v-if="product">
        <div class="card-header">Chỉnh sửa thông tin sản phẩm</div>
        <FormProduct :product="product" @submit:product="updateProduct" />  
    </div>
        
</template>

<script>
import FormProduct from "@/components/Product/FormProduct.vue";
import CartService from "@/services/cart.service";
import OrderService from "@/services/order.service";
import ProductService from "@/services/product.service";
import jwt_decode from "jwt-decode";
export default {
     components: {
        FormProduct
    },
    data() {
        return {
            token: null,
            product: null,
        }
    },
    props: {
        id: { type: String, required: true },

    },
   
    methods: {
        // list of order histories
        async getProduct(id) {
            // const user_id = jwt_decode(this.token);
            try {
                const response = await ProductService.get(id);
                this.product = response.data
                console.log(this.product)
            } catch (error) {
                console.log(error);

            }

        },
        async updateProduct(data) {
            // console.log(data)
            console.log(data)
            try {
                const response = await ProductService.update(this.id, data);
                if(response){
                    this.$router.push({
                        name: "AdminProduct",
                       
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },


    },
    created() {
        // this.token = localStorage.getItem("token");
        this.getProduct(this.id);
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