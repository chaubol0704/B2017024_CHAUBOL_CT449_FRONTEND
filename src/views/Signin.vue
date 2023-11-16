<template>
    <div class="container">
        <div class="row">
            <div class="col-12 justify-content-center d-flex flex-row pt-5">
                <div id="signin-div" class="flex-item border">
                    <h2 class="pt-4 pl-4">Sign-In</h2>
                    <form @submit="signin" class="pt-4 pl-4 pr-4">
                        <div class="form-group">
                            <label>Số điện thoại</label>
                            <input type="phone" class="form-control" v-model="phone" required />
                        </div>
                        <div class="form-group">
                            <label>Mật khẩu</label>
                            <input type="password" class="form-control" v-model="password" required />
                        </div>
                        <!-- <small class="form-text text-muted">By continuing, you agree to Simplecoding's Conditions of Use and
                            Privacy Notice.</small> -->
                        <button type="submit" class="btn btn-primary mt-2 py-0">
                            Đăng nhập
                            <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </button>
                    </form>
                    <hr />
                    <small class="form-text text-muted pt-2 pl-4 text-center">Bạn chưa có tài khoản?</small>
                    <p class="text-center">
                        <router-link :to="{ name: 'Signup' }" class="btn btn-dark text-center mx-auto px-5 py-1 mb-2">
                            Đăng ký     
                        </router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from "@/services/user.service";
export default {
    name: "Signin",
    props: ["baseURL"],
    data() {
        return {
            email: null,
            password: null,
            loading: null,
            token: null
        };
    },
    methods: {
        async signin(e) {
            e.preventDefault();
            this.loading = true;

            const user = {
                phone: this.phone,
                password: this.password,
            };
            const login = await UserService.login(user)
            console.log(login)
            localStorage.setItem("token", login.refresh_token);
            this.$emit("fetchData");
            if(login.message == 'SUCCESS'){
                this.token = localStorage.getItem("token");
                this.$router.push({ name: "Home" });
            }
    
        },
    },
    mounted() {
        this.loading = false;
    },
};
</script>

<style scoped>
.btn-dark {
    background-color: #e7e9ec;
    color: #000;
    font-size: smaller;
    border-radius: 0;
    border-color: #adb1b8 #a2a6ac #a2a6ac;
}

.btn-primary {
    background-color: #190eec;
    color: black;
    border-color: #3449a8 #9c7e31 #846a29;
    border-radius: 0;
}

#logo {
    width: 150px;
}

@media only screen and (min-width: 992px) {
    #signin-div {
        width: 40%;
    }
}
</style>