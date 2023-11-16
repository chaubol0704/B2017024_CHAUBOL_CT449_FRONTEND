<template>
    <div id="home">
        <!-- Page Wrapper -->
        <div id="background-div" class="page-holder bg-cover">
        </div>

        <!-- <div id="start-shopping" class="container">
            <div class="row">
                <div class="col-12 text-left">
                    <h2 class="pt-3">Top Categories</h2>
                </div>
            </div>
            <div class="row">
                <div v-for="index in this.category_size" :key="index"
                    class="col-md-6 col-xl-4 col-12 pt-3  justify-content-around d-flex">
                    <CategoryBox :category="categories[index - 1]">
                    </CategoryBox>
                </div>
            </div>
        </div> -->

        <!-- <hr> -->
        <div class="container">
            <div class="row">
                <div class="col-12 text-left d-flex">
                    <h2 class="pt-3 col-4">Top Products</h2>
                    <!-- <div class="d-flex col-6 p-2">
                            <InputSearch :product="product" @submit:product="updateProduct" v-model="searchText" />
                    </div> -->
                    <div class="p-3 d-flex gap-3">
                        <label for="category" class="p-1">Giá</label>
                        <select class="form-select" aria-label="Default select example" id="category" v-model="category" @click="handleChange">
                            <!-- <option selected>Giá</option> -->
                            <option  value="all" >Tất cả</option>
                            <option  value="Tạ" >Tạ</option>
                            <option  value="Ghế massage">Ghế massage</option>
                            <option  value="Máy chạy bộ">Máy chạy bộ</option>
                            <option  value="Phụ kiện">Phụ kiện</option>
                        </select>
                    </div>
                    
                                
                    <form class="d-flex col-6 p-2" role="search" @submit="submitProduct">
                        
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="searchText">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
            <div class="row">
                <div v-for="index in this.product_size" :key="index"
                    class="col-md-6 col-xl-4 col-12 pt-3  justify-content-around d-flex">
                    <ProductBox :product="productList.data[index - 1]">
                        {{ productList.data[index - 1] }}
                    </ProductBox>
                </div>
            </div>
            <!-- <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end">
                <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li class="page-item" :page="1" @click="handleChange()"><a class="page-link" href="#" aria-current="page">1</a></li>
                <li class="page-item" :page="2" @click="handleChange()"><a class="page-link" href="#">2</a></li>
                <li class="page-item" :page="3" @click="handleChange()"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
            </nav> -->
        </div>
    </div>
</template>


<script>
import ProductBox from "../components/Product/ProductBox.vue";
import InputSearch from "../components/Product/InputSearch.vue";
import ProductService from "@/services/product.service";
// import CategoryBox from "../components/Category/CategoryBox.vue";
export default {
    name: 'Home',
    components: {
        ProductBox, 
        InputSearch 
    },
    props: [ "products"],
    data() {
        return {
            activeIndex: -1,
            searchText: "",
            product_size: 0,
            productList: null,
            category: 'all',
            current_page: 1
        }
    },


    methods:{
        getAll() {
            this.productList = this.products
        },
        onPageClick(event) {
            const page = event.target.getAttribute('page');

            // Chuyển sang trang được chọn
            this.current_page = page;
            this.getAll()
        },
        async submitProduct(e){
            e.preventDefault();
            const filter = this.searchText
            const response = await  ProductService.getAll(filter);
            
            if(response){
                
                this.productList = response
                this.product_size = this.productList.data.length;
            }
            
            this.searchText = ""
        },
        async handleChange(){
            const filter = null
            const response = await ProductService.getAll(filter,this.category);
            console.log(response)
            if (response) {
                this.productList = response
                this.product_size = this.productList.data.length;
            }

            // this.searchText = ""
            console.log(this.category);
        },

    },
    mounted() {
        this.token = localStorage.getItem("token");
        this.getAll()
        
        this.product_size = this.products.total;
        // console.log(this.product_size)
        console.log(this.products.data)
        console.log(this.searchText)
        console.log(this.category)
        
        // this.product_size = Math.min(8, this.product_size);
    },
    created(){
        this.token = localStorage.getItem("token");
    }

}
</script>

<style>
.page-holder {
    min-height: 100vh;
}

.bg-cover {
    background-size: cover !important;
}

#background-div {
    background: url(../assets/anh.jpg)
}

#heading {
    text-decoration: none;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    opacity: 0.8;
    font-family: 'Josefin Sans', sans-serif;
}

#content {
    opacity: 0.8;
}

h2 {
    font-family: 'Josefin Sans', sans-serif;
}</style>