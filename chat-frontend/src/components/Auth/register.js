import React, {useState} from "react"
import regImage from "../../assets/images/register.svg"
import "./Auth.scss"
import "../../App.scss"
import {Link} from "react-router-dom"
import { useDispatch } from "react-redux"
import { register } from "../../store/actions/auth"

const Register = ({history}) => {

    
    const dispath = useDispatch()

    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("Male")
    
    const submitForm = (e) => {
        e.preventDefault();

        dispath(register({firstName, lastName, email, password, gender}, history))
    }

    return (
        <div id="auth-container">
            <div id="auth-card">
                <div className="card-shadow">
                <div id="image-section">
                    <img src={regImage} alt="login"/>
                </div>
                <div id="form-section">
                    <h2>Create an Account</h2>
                    <form onSubmit={submitForm}>
                    <div className="input-field mb-1">
                        <input 
                        onChange={e => setfirstName(e.target.value)}
                        value={firstName}
                        type="text"
                        required="required"
                        placeholder="First Name" />
                    </div>
                    <div className="input-field mb-1">
                        <input
                        onChange={e => setlastName(e.target.value)}
                        value={lastName}
                        type="text"
                        required="required"
                        placeholder="Last Name" />
                    </div>
                    <div className="input-field mb-1">
                        <input 
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        required="required"
                        placeholder="Email" />
                    </div>
                    <div className="input-field mb-1">
                        <input onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        required="required"
                        placeholder="Password" />
                    </div>
                    <div className="input-field mb-2">
                        <select
                        onChange={e => setGender(e.target.value)}
                        value={gender}
                        required="required">
                            <option value="male">Male</option>
                            <option value="female">female</option>
                        </select>
                    </div>
                    <button>Register</button>
                    </form>
                    <p>Already Have an Account? <Link to="/login">Login</Link></p>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Register