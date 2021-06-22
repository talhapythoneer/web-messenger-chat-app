import React, {useState} from "react"
import loginImage from "../../assets/images/login.svg"
import "./Auth.scss"
import "../../App.scss"
import {Link} from "react-router-dom"
// import axios from "axios"
// import AuthService from "../../services/authService"

import {useDispatch} from "react-redux"
import {login} from "../../store/actions/auth"

const Login = ({history}) => {

    const dispath = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitForm = (e) => {
        e.preventDefault();

        dispath(login({email, password}, history))
        
        // AuthService.login({email, password}).then(res => (console.log(res)))
        // axios.post("http://127.0.0.1:3000/login", {email, password})
        // .then(res => {
        //     console.log("res", res)
        // }).catch(err => {
        //     console.log("err", err.response)
        // })

        // console.log({email, password});
    }

    return (
        <div id="auth-container">
            <div id="auth-card">
                <div className="card-shadow">
                <div id="image-section">
                    <img src={loginImage} alt="login"/>
                </div>
                <div id="form-section">
                    <h2>Welcome Back</h2>
                    <form onSubmit={submitForm}>
                    <div className="input-field mb-1">
                        <input
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            type="text"
                            required="required"
                            placeholder="Email" />
                    </div>
                    <div className="input-field mb-2">
                        <input
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            required="required"
                            placeholder="Password" />
                    </div>
                    <button>LOGIN</button>
                    </form>
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Login