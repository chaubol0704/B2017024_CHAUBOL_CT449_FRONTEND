<template>
  <div>
    <h2>Bình luận sản phẩm</h2>
    
    <div class="d-flex gap-5 p-10" v-if="token">
        <div class="d-flex justify-items-center ">
                <img :src="author.avatar" class="avatar">
                <p>{{ author.name }}</p>
            </div>
        <div class="input-group  m-2">                       
            <input  type="text" v-model="status" /> 
            <button @click="onSubmit" class="bg-info">Gửi</button>                         
        </div>
    </div>

    <div class="border comment card w-75 ">
      <h3 class="text-center">Danh sách bình luận</h3>
      <ul class="card-body">
        <li v-for="comment in comments" :key="comment._id" class="d-flex gap-4 comment-item">
          <div class="d-flex justify-items-center ">
                  <div class="items-center">
                      <img :src="comment.user_id.avatar" class="avatar">
                  </div>
                  
                  <p class="text-center">{{ comment.user_id.name }}</p>
              </div>
          <p class="fs-6 fst-italic">{{ comment.status }}</p>
          <!-- <small>{{ comment.created_at }}</small> -->
        </li>
      </ul>
    </div>
    

  </div>
</template>

<script>
import ProductService from "@/services/product.service";
import CommentService from "@/services/comment.service";
import UserService from "@/services/user.service";
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      comments: [],
      token: null,
      author: null,
      status: '',
    };
  },
  props: {
    product: { type: Object, required: true }
  },
  methods: {
    async onSubmit() {
      
      const newcomment = 
      {
        user_id: this.author._id,
        product_id: this.product._id,
        status: this.status
      };
      const response = await CommentService.create(newcomment)
      if(response){
        this.status = '';
        this.getComment();
      }
      
    },
    async getComment() {
      try {
        if(this.product){
          const id = this.product._id
          const response = await CommentService.get(id)
          this.comments = response.data
          console.log(this.comments)
        }
        
      } catch (error) {
        console.log(error);

      }

    },
    async showUser(){
      const user_id = jwt_decode(this.token);
      console.log(this.product)
      try {
        const response = await UserService.get(user_id.id);
        this.author = response.data
        // console.log(this.author)
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.showUser();
    this.getComment()
  },
};
</script>

<style scoped>
.avatar {
    width: 40px;
    height: 40px;

}
.comment{
  margin: 10px;
  padding-block: 10px;
  left: 10px;
}
.comment-item{
  margin: 10px;
}
</style>
