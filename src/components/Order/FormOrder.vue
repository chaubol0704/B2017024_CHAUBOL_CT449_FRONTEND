<template>
    <div class="container">
        <Form @submit="submitOrder" :validation-schema="OrderFormSchema">

            <div class="mb-3 row">
                <label for="name" class="col-sm-2 col-form-label">Tên sản phẩm</label>
                <div class="col-sm-10">
                    <Field type="text" class="form-control" name="name" v-model="productLocal.name" />
                    <ErrorMessage name="name" class="error-feedback" />
                </div>
            </div>
            <div class="mb-3 row">
                <label for="category" class="col-sm-2 col-form-label">Loại sản phẩm</label>
                <div class="col-sm-10">
                    <Field type="text" class="form-control" name="category" v-model="productLocal.category" />
                </div>
            </div>
            <div class="mb-3 row">
                <label for="price" class="col-sm-2 col-form-label">Giá</label>
                <div class="col-sm-10">
                    <Field type="number" class="form-control" name="price" v-model="productLocal.price" />
                </div>
            </div>
            <div class="mb-3 row">
                <label for="image" class="col-sm-2 col-form-label">URL ảnh</label>
                <div class="col-sm-10">
                    <Field type="text" class="form-control" name="image" v-model="productLocal.image" />
                </div>
            </div>
            <div class="mb-3 row">
                <label for="description" class="col-sm-2 col-form-label">Mô tả sản phẩm</label>
                <div class="col-sm-10">
                    <Field class="form-control" name="description" type="textarea" v-model="productLocal.description" />
                </div>
            </div>

            <button type="submit" class="btn btn-primary mt-2 py-0">
                Lưu thay đổi

            </button>
        </form>
    </div>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:order"],
    props: {
        order: { type: Object, required: true }
    },
    data() {
        const OrderFormSchema = yup.object().shape({
            address: yup
                .string()
                .required("Tên phải có giá trị.")
                .max(100, "Tên có nhiều nhất 50 ký tự."),
            category: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            price: yup
                .number(),
            image: yup
                .string(),
            description: yup
                .string(),

        });
        return {
            orderLocal: this.order,
            OrderFormSchema,
        };

    },
    methods: {
        submitOrder() {
            this.$emit("submit:order", this.orderLocal);
        },
        show() {
            console.log(this.order)
        }
    },
    mounted() {
        this.show();
    }
};
</script>