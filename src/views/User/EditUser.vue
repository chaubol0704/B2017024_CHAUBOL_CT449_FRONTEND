<script>
import FormUser from "@/components/FormUser.vue";
import CartService from "@/services/cart.service";
import OrderService from "@/services/order.service";
import UserService from "@/services/user.service";
import jwt_decode from "jwt-decode";
export default {
    components: {
        FormUser,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            infor: null,
            message: "",
        };
    },
    methods: {
        async getUser(id) {
            try {
                console.log(id)
                this.infor = await UserService.get(id);
                console.log(this.infor)
            } catch (error) {
                console.log(error);
                // this.$router.push({
                //     name: "notfound",
                //     params: {
                //         pathMatch: this.$route.path.split("/").slice(1)
                //     },
                //     query: this.$route.query,
                //     hash: this.$route.hash,
                // });
            }
        },
       async updateUser(data) {
            try {
                console.log(this.infor)
                const re = await UserService.update(this.infor.data._id, data);
                if (re.status == 'OK') {
                    // this.token = localStorage.getItem("token");
                    this.$router.push({ name: "User" });
                }

            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getUser(this.id);
        // this.message = "";
    },
};
</script>

<template>
    <div v-if="infor" class="page">
        <h4>Chỉnh sửa thông tin</h4>
        <FormUser :infor="infor" @submit:infor="updateUser" />
    </div>
</template>
