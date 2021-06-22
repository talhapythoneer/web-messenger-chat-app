// import { update } from "../../../chat-Backend/controllers/userController";
import API from "./api"

const AuthService = {
    login: (data) => {
        return API.post("/login", data)
            .then(({data})=> {
                setHeadersAndStorage(data)
                return data;
            })
            .catch((err)=>{
                console.log(err.response)
                throw err
            })
    },

    register: (data) => {
        return API.post("/register", data)
            .then(({data})=> {
                setHeadersAndStorage(data)
                return data;
            })
            .catch((err)=>{
                console.log(err.response)
                throw err
            })
    },

    logout: () => {
        API.defaults.headers['Authorization'] = ""
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    },

    updateProfile: (data) => {
        const headers = {
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        }
        return API.post("/users/update", data, headers)
            .then(({data})=> {
                localStorage.setItem("user", JSON.stringify(data))
                return data;
            })
            .catch((err)=>{
                console.log(err.response)
                throw err
            })
    },
}

const setHeadersAndStorage = ({user, token}) => {
    API.defaults.headers['Authorization'] = "Bearer" + token
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", token)
}

export default AuthService