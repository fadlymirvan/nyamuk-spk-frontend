import axios from "axios";
export default axios.create({
    // baseURL: "http://localhost:8080/api/v1",
    baseURL: "https://nyamuk-backend.herokuapp.com/api/v1",
    headers: {
        "Content-type": "application/json"
    }
});
