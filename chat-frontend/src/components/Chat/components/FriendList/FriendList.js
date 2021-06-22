import React, {useState, Fragment} from "react"
import "./FriendList.scss"
import { useSelector, useDispatch } from "react-redux"
import Friend from "../Friend/Friend"
import { setCurrentChat } from "../../../../store/actions/chat"
import Modal from "../../../Modal/Modal"
import ChatService from "../../../../services/chatService"

const FriendList = () => {


    const dispath = useDispatch()
    const chats = useSelector(state => state.chatReducer.chats)
    const socket = useSelector(state => state.chatReducer.socket)
    

    const [showFriendModal, setShowFriendModal] = useState(false)
    const [suggestions, setSuggestions] = useState([])

    const searchFriends = (e) => {
        ChatService.searchUsers(e.target.value)
        .then(res => setSuggestions(res)).catch()
    }

    const addNewFriend = (id) => {
        ChatService.createChat(id)
        .then(chats => {
            socket.emit("add-friend", chats)
            setShowFriendModal(false) 
        })
        .catch(err => console.log(err))
    }

    const openChat = (chat) => {
        dispath(setCurrentChat(chat))
    }

    return (
        <div id="friends" className="shadow-light">
            <div id="title">
                <h3 className="m-0">Friends</h3>
                <button onClick={() => setShowFriendModal(true)}>ADD</button>
            </div>
            
            <hr />

            <div id="friends-box">
                {
                    chats.length > 0
                    ? chats.map(chat => {
                        return <Friend click={() => openChat(chat)} chat={chat} key={chat.id} />
                    }) 
                    : <p id="no-chat">No Friends Added.</p>
                }
            </div>
            {
                showFriendModal && 
                <Modal click={() => setShowFriendModal(false)}>
                    <Fragment key="header">
                        <h3 className="m-0">Create New Chat</h3> 
                    </Fragment>
                    <Fragment key="body">
                        <p>Find Friends by Name/Email</p>
                        <input 
                        onInput={e => searchFriends(e)}
                        type="text"
                        placeholder="Search..."
                        />
                        <div id="suggestions">
                            {
                                suggestions.map(user => {
                                     return <div key={user.id} className="suggestion">
                                         <p className="m-0">{user.firstName} {user.lastName}</p>
                                         <button onClick={() => addNewFriend(user.id)}>ADD</button>
                                     </div>
                                })
                            }
                        </div>
                    </Fragment>
                    
                </Modal>
            }
        </div>
    )
}

export default FriendList