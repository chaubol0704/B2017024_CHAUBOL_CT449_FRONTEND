<template>
    <div class="container">
        <div class="row pt-5 " v-if="product">
            <div class="col-md-1"></div>
            <div class="col-md-4 col-12">
                <img v-if="product" :src="product.image" :alt="product.name" class="img-fluid" />
            </div>
            <div class="col-md-6 col-12 pt-3 pt-md-0">
                <h4>{{ product.name }}</h4>
                <!-- <h6 class="category font-italic">{{ category.categoryName }}</h6> -->
                <h6 class="font-weight-bold"> {{ product.price }} đ</h6>
                <p>
                    {{ product.description }}
                </p>

                <div class="d-flex flex-row ">
                    <div class="input-group col-md-2 col-2 p-0 gap-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Quantity</span>
                        </div>
                        <input class=" quantity" type="number" v-model="quantity" />
                        <!-- <p>Quantity: {{ quantity }}</p> -->
                        <div></div>
                    </div>

                    <div class="input-group col-md-4 col-2 p-0">
                        <button type="button" id="add-to-cart-button" class="btn" @click="addToCart(this.id)" >
                            Add to Cart
                            <ion-icon name="cart-outline" v-pre></ion-icon>
                        </button>
                    </div>

                    <div id="liveAlertPlaceholder"></div>
                    
                </div>

                <div class="features pt-3">
                    <h5><strong>Features</strong></h5>
                    <ul>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                        <li>Officia quas, officiis eius magni error magnam voluptatem</li>
                        <li>nesciunt quod! Earum voluptatibus quaerat dolorem doloribus</li>
                        <li>molestias ipsum ab, ipsa consectetur laboriosam soluta et</li>
                        <li>ut doloremque dolore corrupti, architecto iusto beatae.</li>
                    </ul>
                </div>

                <!-- <button id="wishlist-button" class="btn mr-3 p-1 py-0"
                    :class="{ product_added_wishlist: isAddedToWishlist }" @click="addToWishList(this.id)">
                    {{ wishlistString }}
                </button> -->
                <button id="show-cart-button" type="button" class="btn mr-3 p-1 py-0" @click="listCartItems()">
                    Show Cart

                    <ion-icon name="cart-outline" v-pre></ion-icon>
                </button>
            </div>
            <div class="col-md-1"></div>
            <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <symbol id="check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </symbol>
                <symbol id="info-fill" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </symbol>
                <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </symbol>
            </svg>
                <!-- <div class="alert alert-success d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                <div>
                    An example success alert with an icon
                </div>
                </div> -->
            
        </div>
        <div v-if="product">
            <Comment  :product="product"/>
        </div>
    </div>
</template>

<script>
import CartService from "@/services/cart.service";
import ProductService from "@/services/product.service";
import Comment from "@/components/Comment.vue"
import jwt_decode from "jwt-decode";
export default {
    components: {
        Comment
    },
    data() {
        return {
            product: null,
            category: {},
            id: null,
            token: null,
            isAddedToWishlist: false,
            wishlistString: "Add to wishlist",
            quantity: 1,
        };
    },
    props: ["baseURL", "products", "categories"],
    methods: {

        async addToCart(productId) {
            if (!this.token) {
                swal({
                    text: "Please log in first!",
                    icon: "error",
                });
                return;
            }
            const user_id = jwt_decode(this.token);
            // var decoded = jwt_decode(token);    
            const cart = {
                    user_id: user_id.id,
                    product_id: productId,
                    quantity: this.quantity,
                    total_price: this.product.price*this.quantity
                };
                await CartService.create(cart)
                this.quantity = 1
                this.$emit("fetchData");
                this.$router.push("/cart");
        },

        listCartItems() {
            if (!this.token) {
                swal({
                    text: "Please log in first!",
                    icon: "error",
                });
                return;
            }
             this.$router.push("/cart");
            
        },
        async getProduct(){
            this.id = this.$route.params.id;
            // this.product = await ProductService.get(this.id);
            console.log(this.id)
            try {
                const response = await ProductService.get(this.id);
                this.product = response.data
                console.log(this.product)
            } catch (error) {
                console.log(error);
                
            }
        }
    },
    created (){
        this.getProduct()
    },
    mounted() {
        // this.id = this.$route.params.id;
        // this.getProduct()
        // console.log(this.product.data)
        // this.product = this.products.data.find((product) => product.id == this.id);
        // this.category = this.categories.find(
        //     (category) => category.id == this.product.categoryId
        // );
        this.token = localStorage.getItem("token");
        this.getProduct()
    },
};
</script>

<style scoped>
.category {
    font-weight: 400;
}
.quantity{
    width: 40px;
    text-align: center;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}

#add-to-cart-button {
    background-color: #febd69;
}

#wishlist-button {
    background-color: #b9b9b9;
    border-radius: 0;
}

#show-cart-button {
    background-color: #131921;
    color: white;
    border-radius: 0;
}
</style>