<template>
    <div class="container-fluid m-3 align-self-center">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Quản lý sản phẩm</h6>
                <a type="button" class="addproduct" @click="addProduct">AddProduct</a>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Loại sản phẩm</th>
                                <th>Mô tả</th>
                                <th>Tùy chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in productList" :key="product">
                                <td>
                                    <div>
                                        <img class="avatar" :src="product.image" alt="">
                                    </div>
                                </td>
                                <td>{{ product.name }}</td>
                                <td>{{ product.price }}</td>
                                <td>{{ product.category }}</td>
                                <td>{{ product.description }}</td>
                                <td>
                                    <ul class="d-flex  gap-3 collapsed text-primary">
                                        <!-- @click="updateProduct(product._id)"  data-bs-toggle="modal" data-bs-target="#exampleModal"-->
                                        <li   type="button" @click="updateProduct(product._id) ">Sửa</li>
                                        <li @click="deleteProduct(product._id) " >Xóa</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>

                    </table>

                </div>
            </div>
            <!-- Modal -->
                        <!-- <div class="modal-lg fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Xác nhận đặt hàng</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="container">
                        <div class="card card-register mx-auto mt-5">
                            <div class="card-header">Chỉnh sửa thông tin sản phẩm</div>
                            <div class="card-body">
                            <form >
                                
                                <div class="form-group">
                                    <div class="form-row">
                                        <div class="col-md-6">
                                            <div class="form-label-group">
                                                <input type="text" name="ma" id="ma"  class="form-control" placeholder="Mã sản phẩm" >
                                                <label for="ma">Mã sản phẩm</label>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-label-group">
                                                <input type="number" name="soLuong" id="soLuong"  class="form-control" placeholder="Số lượng" >
                                                <label for="soLuong">Số lượng</label>
                                            </div>
                                        </div>
                                    </div>               
                                </div>
                                <div class="form-group">
                                    <div class="form-row">
                                        <div class="col-md-12">
                                            <div class="form-label-group">
                                            <input type="number" name="gia" id="gia"  class="form-control" placeholder="Giá" >
                                            <label for="gia">Giá</label>
                                            </div>
                                        </div>                   
                                    </div>
                                </div>
                    
                                <div class="form-group">
                                    <div class="form-row">
                                        <div class="col-md-12">
                                            <div class="form-label-group">
                                            <input type="text" name="hinhAnh" id="hinhAnh"  class="form-control" placeholder="URL hình ảnh" >
                                            <label for="hinhAnh">URL hình ảnh</label>
                                            </div>
                                        </div>                   
                                    </div>
                                </div>
                                
                            </form>
                        </div>
                        </div>
                        </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
                                    <button type="button" class="btn btn-primary"   data-bs-dismiss="modal">Chỉnh sửa sản phẩm</button>
                                </div>
                                </div>
                            </div>
                        </div> -->
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
            productList: [],
        }
    },
    name: 'AdminProduct',
    methods: {
        // list of order histories
        async getProduct() {
            // const user_id = jwt_decode(this.token);
            try {
                const response = await ProductService.getAll();
                this.productList = response.data
                console.log(this.productList)
            } catch (error) {
                console.log(error);

            }

        },
        async deleteProduct(id) {
            console.log(id)
            const response = await ProductService.delete(id);
            // if (response.status == 'OK') {
            //   this.$forceUpdate();
            // }
        },
        async updateProduct(id) {
            console.log(id)
            this.$router.push({
                name: "EditProduct",
                params: {
                    id
                },
            });
        },
        async addProduct() {
            this.$router.push({
                name: "AddProduct",
            });
        },

    },
    mounted() {
        this.token = localStorage.getItem("token");
        this.getProduct();
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

.addproduct{
    float: right;
}
</style>