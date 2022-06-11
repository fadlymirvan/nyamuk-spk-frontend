import http from "../http-common";

class AuthService {
    login(username, password) {
        return http.post("/auth/signin", {
            username,
            password
        })
            .then(resp => {
                if (resp.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(resp.data));
                }
                return resp.data
            });
    }

    logout(key) {
        localStorage.removeItem(key);
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
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();
