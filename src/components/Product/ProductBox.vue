<template>
    <div class="card h-100 w-100">
        <div class="embed-responsive embed-responsive-16by9">
            <img class="card-img-top embed-responsive-item" :src="product.image" alt="Product Image" />
        </div>
        <div class="card-body d-flex gap-5">
            <router-link :to="{ name: 'ShowDetails', params: { id: product._id } }">
                <h5 class="card-title">{{ product.name }}</h5>
            </router-link>
            <p class="card-text">{{ product.price }}<sup>đ</sup></p>
            <!-- <p class="card-text font-italic" v-if="product">
                {{ product.description}}...
            </p> -->

            
            <!-- <router-link id="edit-product" :to="{ name: 'EditProduct', params: { id: product.id } }"
                v-show="$route.name == 'AdminProduct'">
                Edit
            </router-link> -->
        </div>
    </div>
</template>

<script>
export default {
    name: "ProductBox",
    props: ["product"],
    methods: {
        showDetails() {

            this.$router.push({
                name: "ShowDetails",
                params: { id: this.product._id },
            });
        },
       
    },
    mounted(){
        // console.log(this.product)
    }
};
</script>

<style scoped>
.embed-responsive .card-img-top {
    object-fit: cover;
}

a {
    text-decoration: none;
}

.card-title {
    color: #484848;
    font-size: 1.1rem;
    font-weight: 400;
}

.card-title:hover {
    font-weight: bold;
}

.card-text {
    font-size: 0.9rem;
}

#edit-product {
    float: right;
}
</style>