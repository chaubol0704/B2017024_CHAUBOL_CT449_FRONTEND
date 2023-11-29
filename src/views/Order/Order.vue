<template>
  <div class="section">
    <div
      class="container-sm"
      v-for="orders in orderList"
      :key="orders.order._id"
    >
      <!-- row -->
      <div class="row">
        <h3>Đơn hàng số: {{ orders.order._id }}</h3>
        <!-- <p>Ngày đặt hàng: {{ this.time }}</p> -->
        <!-- <p>Người nhận: {{ this.nguoiNhan }}</p> -->
        <!-- <p>Số điện thoại người nhận: {{ this.sdtNguoiNhan }}</p> -->
        <p>Địa chỉ nhận: {{ orders.order.address }}</p>
        <p>Tổng tiền: {{ orders.order.totalcost }} đồng</p>
        <br />
        <!-- STORE -->
        <div id="store" class="col-md-12">
          <!-- store products -->
          <div class="row" v-for="item in orders.detail" :key="item">
            <!-- product -->
            <!-- <div class="col-md-5"></div> -->

            <div class="col-md-3 col-xs-6">
              <div class="product">
                <div class="product-img">
                  <img :src="item.product_id.image" alt="" />
                </div>
                <div class="product-body">
                  <!-- <p class="product-category">{{ this.loai }}</p> -->
                  <h3 class="product-name">
                    <a>{{ item.product_id.name }}</a>
                  </h3>
                  <h4 class="product-price">{{ item.product_id.price }} VNĐ</h4>
                </div>
              </div>
            </div>
            <!-- /product -->
            <div class="clearfix visible-md visible-sm visible-xs"></div>
          </div>
          <!-- /store products -->
        </div>
        <div class="add-to-cart">
          <a
            data-bs-toggle="modal"
            :data-bs-target="'#exampleModaldelete' + orders.order._id"
            class="primary-btn order-submit"
            >Hủy bỏ đơn hàng</a
          >
          <!-- <router-link :to="{ name: 'EditAddress', params: { id: product.id }}" ><a  class="primary-btn order-submit">Thay đổi địa chỉ nhận hàng</a></router-link> -->
          <a
            data-bs-toggle="modal"
            :data-bs-target="'#exampleModal' + orders.order._id"
            class="primary-btn order-submit"
            >Thay đổi địa chỉ nhận hàng</a
          >
        </div>
        <br />

        <div
          class="modal fade"
          :id="'exampleModal' + orders.order._id"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Địa chỉ thanh toán và nhận hàng
                </h5>
                <!-- <h3 class="title">Địa chỉ thanh toán và nhận hàng</h3> -->
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <input
                    class="input"
                    v-model="address"
                    type="text"
                    name="diaChiNhan"
                    placeholder="Địa chỉ"
                  />
                </div>

                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Thoát
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="updateAddress(orders.order._id)"
                    data-bs-dismiss="modal"
                  >
                    Thay đổi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          :id="'exampleModaldelete' + orders.order._id"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Xác nhận hủy đặt hàng
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <!-- <div class="modal-body">
                            Bạn chắc chắn 
                        </div> -->
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Thoát
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="deleteOrder({ id: orders.order._id })"
                  data-bs-dismiss="modal"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>

      <!-- Modal -->
    </div>
    <!-- /container -->
  </div>
</template>

<script>
import CartService from "@/services/cart.service";
import OrderService from "@/services/order.service";
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {
      token: null,
      orderList: [],
      address: "",
      id: null,
    };
  },
  props: ["baseURL"],
  name: "Order",
  methods: {
    // list of order histories
    async listOrders() {
      const user_id = jwt_decode(this.token);
      try {
        const response = await OrderService.getOrder(user_id.id);
        console.log(response);

        this.orderList = response.data;
        // for (const item of this.cartItems) {
        //   this.totalcost += item.total_price
        // }
        console.log(this.orderList);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteOrder(id) {
      console.log(id.id);
      const response = await OrderService.delete(id.id);
      if (response.status == "OK") {
        this.listOrders();
      }
    },
    async updateAddress(id) {
      const data = { address: this.address };
      console.log(id);
      const response = await OrderService.update(id, data);
      if (response.status == "OK") {
        this.listOrders();
        // console.log(response)
      }
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.listOrders();
  },
};
</script>

<style scoped>
/* h4, h5 {
    font-family: 'Roboto', sans-serif;
    color: #484848;
    font-weight: 700;
  } */

.embed-responsive .card-img-top {
  object-fit: cover;
}
.center {
  justify-content: center;
}
</style>
