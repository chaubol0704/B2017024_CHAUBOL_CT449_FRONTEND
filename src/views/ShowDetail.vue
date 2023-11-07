<template>
    <div class="container">
        <div class="row pt-5 " v-if="product.data">
            <div class="col-md-1"></div>
            <div class="col-md-4 col-12">
                <img v-if="product.data" :src="product.data.image" :alt="product.data.name" class="img-fluid" />
            </div>
            <div class="col-md-6 col-12 pt-3 pt-md-0">
                <h4>{{ product.data.name }}</h4>
                <!-- <h6 class="category font-italic">{{ category.categoryName }}</h6> -->
                <h6 class="font-weight-bold"> {{ product.data.price }} đ</h6>
                <p>
                    {{ product.data.description }}
                </p>

                <div class="d-flex flex-row justify-content-between">
                    <div class="input-group col-md-2 col-2 p-0">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Quantity</span>
                        </div>
                        <input class="form-control" type="number" v-model="quantity" />
                        <!-- <p>Quantity: {{ quantity }}</p> -->
                        <div></div>
                    </div>

                    <div class="input-group col-md-3 col-4 p-0">
                        <button type="button" id="add-to-cart-button" class="btn" @click="addToCart(this.id)">
                            Add to Cart
                            <ion-icon name="cart-outline" v-pre></ion-icon>
                        </button>
                    </div>
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

                <button id="wishlist-button" class="btn mr-3 p-1 py-0"
                    :class="{ product_added_wishlist: isAddedToWishlist }" @click="addToWishList(this.id)">
                    {{ wishlistString }}
                </button>
                <button id="show-cart-button" type="button" class="btn mr-3 p-1 py-0" @click="listCartItems()">
                    Show Cart

                    <ion-icon name="cart-outline" v-pre></ion-icon>
                </button>
            </div>
            <div class="col-md-1"></div>
        </div>
    </div>
</template>

<script>
import CartService from "@/services/cart.service";
import ProductService from "@/services/product.service";
import jwt_decode from "jwt-decode";
export default {
    data() {
        return {
            product: {},
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
        addToWishList(productId) {
            axios
                .post(`${this.baseURL}wishlist/add?token=${this.token}`, {
                    id: productId,
                })
                .then(
                    (response) => {
                        if (response.status == 201) {
                            this.isAddedToWishlist = true;
                            this.wishlistString = "Added to WishList";
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        },
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
                    total_price: this.product.data.price*this.quantity
                };
                await CartService.create(cart)
                // console.log(this.quantity)
                // console.log(this.product.data.price)
                this.quantity = 1
                this.$emit("fetchData");
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
            // axios.get(`${this.baseURL}cart/?token=${this.token}`).then(
            //     (response) => {
            //         if (response.status === 200) {
            //             this.$router.push("/cart");
            //         }
            //     },
            //     (error) => {
            //         console.log(error);
            //     }
            // );
        },
        async getProduct(){
            this.id = this.$route.params.id;
            // this.product = await ProductService.get(this.id);
            console.log(this.id)
            try {
                this.product = await ProductService.get(this.id);
                console.log(this.product.data)
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
    },
};
</script>

<style>
.category {
    font-weight: 400;
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