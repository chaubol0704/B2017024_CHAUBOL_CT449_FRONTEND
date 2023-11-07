<script>
import FormProduct from "@/components/Product/FormProduct.vue";
import CartService from "@/services/cart.service";
import OrderService from "@/services/order.service";
import ProductService from "@/services/product.service";
export default {
    components: {
        FormProduct,
    },
    data() {
        return {
            product: null,
            message: "",
        };
    },
    methods: {
        async addProduct(data) {

            try {
                console.log(data)
                const response = await ProductService.create(data);
                if (response) {
                    this.$router.push({
                        name: "AdminProduct",

                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.product = {
            "name": "",
            "category": "",
            "image": "",
            "description": "",
            "price": 0
        }
        this.message = "";
    },
};
</script>

<template>
    <div class="page" >
        <div class="card-header">Thêm sản phẩm</div>
        <FormProduct :product="product" @submit:product="addProduct" />
    </div>
</template>
