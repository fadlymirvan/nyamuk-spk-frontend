import http from "../http-common";
import authHeader from "./auth-header";

class AuthService {
    login(username, password) {
        return http.post("/auth/signin", {
            username,
            password
        })
            .then(resp => {
                if (resp.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(resp.data.accessToken));
                    localStorage.setItem("roles", JSON.stringify(resp.data.roles));
                }
                return resp.data
            });
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("roles");
    }

    register(username, email, password) {
        console.log(username, email, password)
        return http.post("/auth/signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return http.get("/auth/user", {
            headers: authHeader()
        });
    }

    getCurrentUserRoles() {
        return localStorage.getItem("roles");
    }
}

export default new AuthService();
