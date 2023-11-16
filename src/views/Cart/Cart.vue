<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h3 class="pt-3">Shopping cart</h3>
            </div>
        </div>
        <!--    loop over all the cart items and display one by one-->
        <div v-for="cartItem in cartItems" :key="cartItem._id" class="row mt-2 pt-3 justify-content-around">
            <div class="col-2"></div>
            <!-- display image -->
            <div class="col-md-3 embed-responsive embed-responsive-16by9">
                <router-link :to="{ name: 'ShowDetails', params: { id: cartItem.product_id._id } }">
                    <img v-bind:src="cartItem.product_id.image" class="w-100 card-img-top embed-responsive-item" />
                </router-link>
            </div>
            <!-- display product_id name, quantity and price -->
            <div class="col-md-5 px-3">
                <div class="card-block px-3">
                    <h6 class="card-title">
                        <router-link :to="{ name: 'ShowDetails', params: { id: cartItem.product_id._id } }">{{
                            cartItem.product_id.name }}
                        </router-link>
                    </h6>
                    <p id="item-price" class="mb-0 font-weight-bold">
                        $ {{ cartItem.product_id.price }}
                    </p>
                    <p id="item-quantity" class="mb-0">
                        Quantity :
                        <input size="1" class="p-0 h-25 border-bottom border-top-0 border-left-0 border-right-0"
                            v-model="cartItem.quantity " @change="updateTotalCost()" />
                    </p>
                    <p id="item-total-price" class="mb-0">
                        Total Price:
                        <span class="font-weight-bold">
                            $ {{ cartItem.product_id.price * cartItem.quantity }}</span>
                    </p>
                    <br />
                    <a href="#" class="text-right text-danger" @click="deleteItem(cartItem._id)">Xóa</a>
                    <!-- <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        
                    </div> -->
                </div>
            </div>
            <div class="col-2"></div>
            <div class="col-12">
                <hr />
            </div>
        </div>

        <!-- display total price -->
        <div class="total-cost pt-2 text-right mr-10px " style="margin-right: 1rem;">
            <h5>Total : $ {{ totalcost.toFixed(2) }}</h5>
            <button :disabled="isDisabled()" type="button" @click="checkout" class="btn btn-primary confirm" >
                Đặt hàng ngay
            </button>

            // <!-- Modal -->
            //     <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            //         <div class="modal-dialog">
            //             <div class="modal-content">
            //             <div class="modal-header">
            //                 <h5 class="modal-title" id="exampleModalLabel">Xác nhận đặt hàng</h5>
            //                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            //             </div>
            //             <!-- <div class="modal-body">
            //                 Bạn chắc chắn 
            //             </div> -->
            //             <div class="modal-footer">
            //                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
            //                 <button type="button" class="btn btn-primary" @click="order">Đặt hàng ngay</button>
            //             </div>
            //             </div>
            //         </div>
            //     </div>
        </div>

            
    </div>
</template>

<script>
// const axios = require('axios');
import CartService from "@/services/cart.service";
import OrderService from "@/services/order.service";
import jwt_decode from "jwt-decode";
export default {
    data() {
        return {
            cartItems: [],
            token: null,
            totalcost: 0,
        };
    },
    name: 'Cart',
    props: ['baseURL'],
    methods: {
        isDisabled() {
            if (this.cartItems.length === 0) {
                return true;
            }
            return false;
        },
        // fetch all the items in cart
        async listCartItems() {
            const user_id = jwt_decode(this.token);
            // console.log(user_id)
            try {
                const response = await CartService.getCartUser(user_id.id);
                this.cartItems = response.data
                for (const item of this.cartItems) {
                    this.totalcost += item.total_price
                }
                console.log(this.cartItems)
            } catch (error) {
                console.log(error);

            }
        
        },
        // go to checkout page
        checkout() {
            this.$router.push({ name: 'Checkout' });
            // console.log(1)
        },
        async deleteItem(itemId) {
            const response = await CartService.delete(itemId);
            if (response.status == 'OK') {
                this.listCartItems()
                }
          
        },
        async order() {
            const user_id = jwt_decode(this.token);
            const products = []
          
            for(const cartItem of this.cartItems){
                const product =  {
                    id : cartItem.product_id._id,
                    price : cartItem.total_price,
                    discount : 0,
                    quantity : cartItem.quantity
                }
                products.push(product)
                await CartService.delete(cartItem._id)
            }
            const id = user_id.id
            const response = await OrderService.create({id, products});
            if (response.status == 'OK') {
                console.log(response)
                // this.$router.go(0);
            }
    
        },
        showDetails(productId) {
            this.$router.push({
                name: 'ShowDetails',
                params: { id: productId },
            });
        },
        updateTotalCost() {
            this.totalCost = 0;
            for (const cartItem of this.cartItems) {
                this.totalCost += cartItem.total_price
            }
        }
    },
    mounted() {
        this.token = localStorage.getItem('token');
        this.listCartItems();
        this.updateTotalCost()
    },
};
</script>

<style scoped>
h4,
h5 {
    font-family: 'Roboto', sans-serif;
    color: #484848;
    font-weight: 700;
}

.embed-responsive .card-img-top {
    object-fit: cover;
}

#item-price {
    color: #232f3e;
}

#item-quantity {
    float: left;
}

#item-total-price {
    float: right;
}

.confirm {
    font-weight: bold;
    font-size: larger;
}
</style>