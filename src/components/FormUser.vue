<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:infor"],
    props: {
        infor: { type: Object, required: true }
    },
    data() {
        const UesrFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            password: yup
                .string()
                .min(6, "Tối thiểu 6 ký tự."),
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
        });
        return {
            inforLocal: this.infor,
            UesrFormSchema,
        };
    },
    methods: {
        submitUser() {
            this.$emit("submit:infor", this.inforLocal);
        },
    },
};
</script>

<template>
    <div class="container">
        <Form @submit="submitUser" :validation-schema="UesrFormSchema" >
            <div class="form-group ">
                <label for="name">Tên</label>
                <Field name="name" type="text" class="form-control" v-model="inforLocal.name" />
                <ErrorMessage name="name" class="error-feedback" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <Field name="password" type="password" class="form-control" v-model="inforLocal.password" />
                <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="form-group">
                <label for="address">Địa chỉ</label>
                <Field name="address" type="text" class="form-control" v-model="inforLocal.address" />
                <ErrorMessage name="address" class="error-feedback" />
            </div>
            <div class="form-group">
                <label for="phone">Điện thoại</label>
                <Field name="phone" type="tel" class="form-control" v-model="inforLocal.phone" />
                <ErrorMessage name="phone" class="error-feedback" />
            </div>
            <div class="form-group">
                <button class="btn btn-primary">Lưu</button>
                <!-- <button v-if="contactLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteContact">
                Xóa
            </button> -->
            </div>
        </Form>
    </div>
    
</template>

<style scoped>
/* @import "@/assets/form.css"; */



  /* .container {
    text-align: center;
  } */
</style>