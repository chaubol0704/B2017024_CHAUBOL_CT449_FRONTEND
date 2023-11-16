<template>
    <!-- SECTION -->
    <div class="section">
        <!-- container -->
        <div class="container">
            <!-- row -->
            <div >
                <form class="row " @submit="summit">
                    <div class="col-md-7">
                        <!-- Billing Details -->
                        <div class="billing-details ">
                            <div class="section-title">
                                <h3 class="title">Địa chỉ thanh toán và nhận hàng</h3>
                            </div>
                            <!-- <div class="form-group mb-3">
                                <input class="input"  type="text" name="ten" placeholder="Tên" >
                            </div>
                            <div class="form-group mb-3">
                                <input class="input"  type="tel" name="sdt" placeholder="Số điện thoại">
                            </div> -->
                            <div class="form-group">
                                <input class="input"  type="text" name="diaChi" placeholder="Địa chỉ giao hàng" v-model="address" required>
                            </div>
                        </div>
                        <!-- /Billing Details -->
                    </div>

                    <!-- Order Details -->
                    <div class="col-md-5 order-details">
                        <div class="section-title text-center">
                            <h3 class="title">Sản phẩm của tôi</h3>
                        </div>
                        <div class="order-summary">
                            <div class="order-col">
                                <div><strong>Sản phẩm</strong></div>
                                <div><strong>Toàn bộ</strong></div>
                            </div>
                            <div class="order-products" v-for="cartItem in cartItems" :key="cartItem._id">
                               
                                <div class="order-col">
                                    <div><a href="/product/info/{{this._id}}">{{ cartItem.product_id.name }}</a></div>
                                    <div>{{ cartItem.product_id.price * cartItem.quantity }}</div>
                                </div>
                             
                            </div>
                            <div class="order-col">
                                <div>Vận chuyển</div>
                                <div><strong>Miễn phí</strong></div>
                            </div>
                            <div class="order-col">
                                <div><strong>Tổng tiền</strong></div>
                                <div><strong class="order-total">{{ this.totalcost }} VNĐ</strong></div>
                            </div>
                        </div>
                        <div>
                            <input class="primary-btn order-submit"  value="Đặt hàng" data-bs-toggle="modal" data-bs-target="#exampleModal"/>
                        </div>
                    </div>
                    <!-- /Order Details -->
                </form>
                <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Xác nhận đặt hàng</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <!-- <div class="modal-body">
                            Bạn chắc chắn 
                        </div> -->
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
                                <button type="button" class="btn btn-primary"  @click="submit" data-bs-dismiss="modal">Đặt hàng ngay</button>
                            </div>
                            </div>
                        </div>
                    </div>
            </div>
            <!-- /row -->
        </div>
        <!-- /container -->
    </div>
    <!-- /SECTION -->
</template>
<script>

import ProductService from "@/services/product.service";
import CartService from "@/services/cart.service";
import OrderService from "@/services/order.service";
import jwt_decode from "jwt-decode";
export default {
    data() {
        return {
            // stripeAPIToken: process.env.VUE_APP_STRIPETOKEN,
            stripe: '',
            token: null,
            cartItems: [],
            totalcost: 0,
            address: '',
        };
    },

    name: 'Checkout',
    props: ['baseURL'],
    methods: {
        // configureStripe() { },
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
        async getAll() {
            try {
                const response = await CartService.getCartUser(user_id.id);
                // this.cartItems = response.data
                // console.log(this.cartItems)
                let products = response.data;
                let len = Object.keys(products).length;
                for (let i = 0; i < len; i++)
                    this.checkoutBodyArray.push({
                        // imageUrl: products[i].product.imageURL,
                        // productName: products[i].product.name,
                        quantity: products[i].quantity,
                        total_price: products[i].total_price,
                        productId: products[i].product.id,
                        userId: products[i].userId,
                    });
            } catch (error) {
                console.log(error);

            }
        },
        order (){
            this.$router.push({ name: "Order" });
        },
        async submit(e){
            e.preventDefault();
            // console.log(this.address)
            const user_id = jwt_decode(this.token);
            const products = []
            let totalcost = 0
            for (const cartItem of this.cartItems) {
                console.log(cartItem)
                totalcost += cartItem.total_price
                const product = {
                    id: cartItem.product_id._id,
                    price: cartItem.total_price,
                    discount: 0,
                    quantity: cartItem.quantity
                }
                products.push(product)
                await CartService.delete(cartItem._id)
            }
            const id = user_id.id
            const address = this.address
            console.log(totalcost)
            const response = await OrderService.create({ id,address, totalcost, products });
            if (response.status == 'OK') {
                console.log(response)
                this.$router.push({ name: "Order" });
            }
        },
    },
    mounted() {
        // get the token
        this.token = localStorage.getItem('token');
        // get all the cart items
        // this.stripe = Stripe(this.stripeAPIToken);
        this.listCartItems();
    },
};
</script>

<style scoped>

.section {
  padding-top: 30px;
  padding-bottom: 30px;
  margin: 10px;
}

.billing-details {
  margin: 10px;
}

.shiping-details {
  margin-bottom: 30px;
}

.section-title {
  position: relative;
  margin-bottom: 30px;
  margin-top: 15px;
}

.section-title .title {
  display: inline-block;
  text-transform: uppercase;
  margin: 0px;
}

.order-details {
  position: relative;
  padding: 0px 30px 30px;
  border-right: 1px solid #E4E7ED;
  border-left: 1px solid #E4E7ED;
  border-bottom: 1px solid #E4E7ED;
}

.order-details:before {
  content: "";
  position: absolute;
  left: -1px;
  right: -1px;
  top: -15px;
  height: 30px;
  border-top: 1px solid #E4E7ED;
  border-left: 1px solid #E4E7ED;
  border-right: 1px solid #E4E7ED;
}

.order-summary {
  margin: 15px 0px;
}


.order-summary .order-col {
  display: table;
  width: 100%;
}

.order-summary .order-col:after {
  content: "";
  display: block;
  clear: both;
}

.order-summary .order-col>div {
  display: table-cell;
  padding: 10px 0px;
}

.order-summary .order-col>div:first-child {
  width: calc(100% - 150px);
}

.order-summary .order-col>div:last-child {
  width: 150px;
  text-align: right;
}

.order-summary .order-col .order-total {
  font-size: 24px;
  color: #D10024;
}

.order-details .payment-method {
  margin: 30px 0px;
}

.order-details .order-submit {
  display: block;
  margin-top: 30px;
}

</style>