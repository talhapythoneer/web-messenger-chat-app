import React, {useState, Fragment} from "react"
import "./Navbar.scss"
import { useSelector, useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { logout } from "../../../../store/actions/auth";
import Modal from "../../../Modal/Modal";
import { updateProfile } from "../../../../store/actions/auth";


const Navbar = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.authReducer.user)

    const [showProfileOptions, setShowProfileOptions] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)

    
    const [firstName, setfirstName] = useState(user.firstName)
    const [lastName, setlastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState(user.gender)
    const [avatar, setAvatar] = useState("")

    
    const submitForm = (e) => {
        e.preventDefault();

        const form = {firstName, lastName, email, gender, avatar}

        if (password.length > 0) form.password = password

        const formData = new FormData()
        for(const key in form){
            formData.append(key, form[key])
        }

        dispatch(updateProfile(formData)).then(() => setShowProfileModal(false))

    }
    

    return(
        <div id="navbar" className="card-shadow">
            <h2>Ti Pango Chat</h2>
            <div onClick={() => setShowProfileOptions(!showProfileOptions)} id="profile-menu">
                <img width="40px" height="40px" src={user.avatar} alt="avatar"/>
                <p>{user.firstName} {user.lastName}</p>
                <FontAwesomeIcon icon="caret-down" className="fa-icon"/>
                {
                    showProfileOptions &&
                    <div id="profile-options">
                        <p onClick={()=>setShowProfileModal(true)}>Update Profile</p>
                        <p onClick={()=>dispatch(logout())}>Logout</p>
                    </div>
                }

                {
                    showProfileModal &&
                    <Modal click={() => setShowProfileModal(false)}>
                        <Fragment key="header">
                            <h3 className="m-0">Update Profile</h3>
                        </Fragment>

                        <Fragment key="body">
                            <form>
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

                                <div className="input-field mb-1">
                                    <input onChange={e => setAvatar(e.target.files[0])}
                                    type="file"/>
                                </div>
                            </form>
                        </Fragment>

                        <Fragment key="footer">
                            <button className="btn-success" onClick={submitForm}>UPDATE</button>
                        </Fragment>
                    </Modal>
                }
            </div>
        </div>
    );
}

export default Navbar