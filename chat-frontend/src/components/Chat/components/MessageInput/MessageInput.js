import React, {useState, useRef} from "react"
import "./MessageInput.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"
import ChatService from "../../../../services/chatService"
import {Picker} from "emoji-mart"
import "emoji-mart/css/emoji-mart.css"

const MessageInput = ({chat}) => {
    
    const [message, setMessage] = useState("")
    const [image, setImage] = useState("")
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)


    const user = useSelector(state => state.authReducer.user)
    const socket = useSelector(state => state.chatReducer.socket)
    
    const fileUpload = useRef() 
    const msgInput = useRef()   

    const handleMessage = (e) => {
        const value = e.target.value
        setMessage(value)

        // notif that user is typing
    }

    const handleKeyDown = (e, imageUpload) => {
        if (e.key === "Enter") sendMessage(imageUpload)
    }

    const sendMessage = (imageUpload) => {
        if (message.length < 1 && !imageUpload) return 

        const msg = {
            type: imageUpload ? "image" : "text",
            fromUser: user,
            toUserId: chat.Users.map(user => user.id),
            chatId: chat.id,
            message: imageUpload ? imageUpload : message
        }

        setMessage("")
        setImage("")
        setShowEmojiPicker(false)

        // send message now
        socket.emit("message", msg)
    }

    const handleImageUpload = () => {
        const formData = new FormData()

        formData.append("id", chat.id)
        formData.append("image", image)

        ChatService.uploadImage(formData)
        .then(image => {
            sendMessage(image)
        })
        .catch(err => console.log(err.message))
    }

    const selectEmoji = (emoji) => {
        const startPosition = msgInput.current.selectionStart
        const endPosition = msgInput.current.selectionEnd
        const emojiLength = emoji.native.length
        const value = msgInput.current.value

        setMessage(value.substring(0, startPosition) + emoji.native + value.substring(endPosition, value.length))

        msgInput.current.focus()

        msgInput.current.selectionEnd = endPosition + emojiLength
        
    }

    return (
        <div id="input-container">
            <div id="image-upload-container">
                <div>
                </div>

                <div id="image-upload">
                    {
                        image.name ?
                        <div id="image-details">
                            <p className="m-0">{image.name}</p>
                            <FontAwesomeIcon
                                onClick={handleImageUpload}
                                icon="upload"
                                className="fa-icon"
                            />
                            <FontAwesomeIcon
                                onClick={() => setImage("")}
                                icon="times"
                                className="fa-icon"
                            />
                        </div>
                        : null
                    }
                    <FontAwesomeIcon
                        onClick={() => fileUpload.current.click()}
                        icon={["far", "image"]}
                        className="fa-icon"
                    />
                </div>

            </div>
            <div id="message-input">
                <input 
                ref={msgInput}
                value={message}
                type="text"
                placeholder="Enter Message..."
                onChange={e => handleMessage(e)}
                onKeyDown={e => handleKeyDown(e, false)}
                
                />
                <FontAwesomeIcon
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                icon={["far", "smile"]}
                className="fa-icon"
                />

            </div>

            <input id="chat-image" ref={fileUpload} type="file" onChange={e => setImage(e.target.files[0])}/>
                    {
                        showEmojiPicker ?
                        <Picker
                            titel="Pick Emoji"
                            emoji="point-up"
                            style={{position: "absolute", bottom: "20px", right: "20px"}}
                            onSelect={selectEmoji}
                        />
                        : null
                    }
        </div>
    )
}

export default MessageInput