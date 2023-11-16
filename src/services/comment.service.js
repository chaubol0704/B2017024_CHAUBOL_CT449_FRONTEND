import createApiClient from "./api.service";
class CommentService {
    constructor(baseUrl = "/api/comment") {
        this.api = createApiClient(baseUrl);
    }
    // async getAll() {
    //     return (await this.api.get("/get-all")).data;
    // }
    async create(data) {
        return (await this.api.post("/create", data)).data;
    }

    async get(id) {
        return (await this.api.get(`/get-comment/${id}`)).data;
    }
    // async getOrder(id) {
    //     return (await this.api.get(`/get-order/${id}`)).data;
    // }
    // async update(id, data) {
    //     return (await this.api.put(`/update/${id}`, data)).data;
    // }
    // async delete(id) {
    //     return (await this.api.delete(`/delete/${id}`)).data;
    // }
}
export default new CommentService();