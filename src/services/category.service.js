import createApiClient from "./api.service";
class CategoryService {
    constructor(baseUrl = "/api/category") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/get-all")).data;
    }
    async create(data) {
        return (await this.api.post("/create", data)).data;
    }

    async get(id) {
        return (await this.api.get(`/get-details/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/update/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/delete/${id}`)).data;
    }
}
export default new CategoryService();