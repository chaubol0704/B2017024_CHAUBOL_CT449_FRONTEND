import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Contact from "@/views/Contact.vue";
import Signup from '@/views/Signup.vue'
import Signin from '@/views/Signin.vue'
import ShowDetails from '@/views/ShowDetail.vue'
import Cart from '@/views/Cart/Cart.vue'
import Order from '@/views/Order/Order.vue'
import Checkout from '../views/Checkout/Checkout.vue'
import User from '@/views/User/User.vue'
import EditUser from '@/views/User/EditUser.vue'
import Admin from '@/views/Admin/Admin.vue'
import EditProduct from '@/views/Admin/Product/EditProduct.vue'
import AdminUser from '@/views/Admin/User/AdminUser.vue'
import AdminProduct from '@/views/Admin/Product/AdminProduct.vue'
import AddProduct from '@/views/Admin/Product/AddProduct.vue'
import AdminOrder from '@/views/Admin/Order/AdminOrder.vue'
import AdminOrderCheck from '@/views/Admin/Order/AdminOrderCheck.vue'
import EditOrder from '@/views/Admin/Order/EditOrder.vue'
import DetailOrder from '@/views/Admin/Order/DetailOrder.vue'
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "/contact",
        name: "Contact",
        component: Contact,
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/signin',
        name: 'Signin',
        component: Signin
    },
    {
        path: '/product/show/:id',
        name: 'ShowDetails',
        component: ShowDetails
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/order',
        name: 'Order',
        component: Order
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout
    },
    {
        path: '/user',
        name: 'User',
        component: User
    },
    {
        path: '/user/:id',
        name: 'EditUser',
        component: EditUser,
        props: true
    },
    // ADmin
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        //  redirect:{name:'Category'},
        children: [
            {
                path: 'user',
                name: 'AdminUser',
                component: AdminUser
            },
            {
                path: 'product',
                name: 'AdminProduct',
                component: AdminProduct
            },
            {
                path: 'product/:id',
                name: 'EditProduct',
                component: EditProduct,
                props: true
            },
            {
                path: 'product/add',
                name: 'AddProduct',
                component: AddProduct,
            },
            // order

            {
                path: 'order',
                name: 'AdminOrder',
                component: AdminOrder
            },
            {
                path: 'ordercheck',
                name: 'AdminOrderCheck',
                component: AdminOrderCheck
            },
            // {
            //     path: 'order/:id',
            //     name: 'EditOrder',
            //     component: EditOrder,
            //     props: true
            // },

            {
                path: 'order/detail/:id',
                name: 'DetailOrder',
                component: DetailOrder,
                props: true
            },
        ]

    },


];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

//scroll to top after every route change
router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
    next();
});
export default router;