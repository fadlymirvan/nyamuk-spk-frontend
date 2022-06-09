import http from "../http-common";

class WeightDataService {
    getAll() {
        return http.get("/bobot");
    }
    get(id) {
        return http.get(`/bobot/${id}`);
    }
    update(id, data) {
        return http.put(`/bobot/${id}`, data);
    }
}
export default new WeightDataService();
