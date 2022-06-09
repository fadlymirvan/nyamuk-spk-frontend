import http from "../http-common";

class SymptomsDataService {
    getAll() {
        return http.get("/gejala");
    }
    get(id) {
        return http.get(`/gejala/${id}`);
    }
    create(data) {
        return http.post("/gejala", data);
    }
    update(id, data) {
        return http.put(`/gejala/${id}`, data);
    }
    delete(id) {
        return http.delete(`/gejala/${id}`);
    }
}
export default new SymptomsDataService();
