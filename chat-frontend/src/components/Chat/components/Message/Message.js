import React from "react"
import "./Message.scss"

const Message = ({user, chat, index, message}) => {
    return (
        <div className={"message mb-5 " + (message.fromUserId === user.id ? "creator" : "")}>
             <div className={message.fromUserId === user.id ? "owner" : "other-person"}>
                 {
                     message.fromUserId !== user.id
                     ? <h6 className="m-0">{message.User.firstName} {message.User.lastName}</h6>
                     : null 
                 }
                 {
                     message.type === "text"
                     ? <p className="m-0">{message.message}</p>
                     : <img src={message.message} alt="uploaded img"/>
                 }
             </div>
        </div>
    )
}

export default Message