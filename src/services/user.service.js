import createApiClient from "./api.service";
class UserService {
    constructor(baseUrl = "/api/user") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/getAll")).data;
    }
    async create(data) {
        return (await this.api.post("/sign-up", data)).data;
    }
    async login(data) {
        return (await this.api.post("/sign-in", data)).data;
    }

    async get(id) {
        return (await this.api.get(`/get-details/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/update-user/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/delete-user/${id}`)).data;
    }
}
export default new UserService();