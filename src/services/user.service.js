import http from "../http-common";
import authHeader from "./auth-header";

class UserService {
    getPublicContent() {
        return http.get("/test/all");
    }

    getUserBoard() {
        return http.get("/test/user", {
            headers: authHeader()
        });
    }

    getAdminBoard() {
        return http.get("/test/admin", {
            headers: authHeader()
        });
    }
}

export default new UserService();
