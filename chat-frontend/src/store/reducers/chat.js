import { FETCH_CHATS, SET_CURRENT_CHAT, FRIENDS_ONLINE, FRIEND_ONLINE, FRIEND_OFFLINE, SET_SOCKET, RECEIVED_MESSAGE,
CREATE_CHAT, ADD_USER_TO_GROUP, LEAVE_CURRENT_CHAT, DELETE_CURRENT_CHAT } from "../actions/chat";

const initialState = {
    chats: [],
    currentChat: {},
    socket: {},
    newMessage: {chatId: null, seen:null},
    scrollButton: 0
}

const chatReducer = (state=initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case FETCH_CHATS:
            return{
                ...state,
                chats: payload, 
            }

        case SET_CURRENT_CHAT:
            return {
                ...state,
                currentChat: payload,
                scrollBottom: state.scrollBottom + 1,
                newMessage: {chatId: null, seen: null}
            }

        case SET_SOCKET:
            return {
                ...state,
                socket: payload,
            }

        case FRIENDS_ONLINE:
            const chatsCopy = state.chats.map(chat => {
                return {
                    ...chat, 
                    Users: chat.Users.map(user => {
                        if (payload.includes(user.id)) {
                            return {
                                ...user, 
                                status: "online",
                            }
                        }
                        return user
                    })
                }
            })
            return {
                ...state,
                chats: chatsCopy
            }

        case FRIEND_ONLINE:{
            let currentChatCopy = {...state.currentChat}

            const chatsCopy = state.chats.map(chat => {
                const Users = chat.Users.map(user => {
                    if (user.id === parseInt(payload.id)) {
                        return {
                            ...user, 
                            status: "online",
                        }
                    }
                    return user
                })

                if (chat.id === currentChatCopy.id){
                    currentChatCopy = {
                        ...currentChatCopy,
                        Users
                    }
                }

                return {
                    ...chat,
                    Users
                }
            })

            return {
                ...state,
                chats: chatsCopy,
                currentChat: currentChatCopy,
            }
        }

        case FRIEND_OFFLINE:{
            let currentChatCopy = {...state.currentChat}

            const chatsCopy = state.chats.map(chat => {
                const Users = chat.Users.map(user => {
                    if (user.id === parseInt(payload.id)) {
                        return {
                            ...user, 
                            status: "offline",
                        }
                    }
                    return user
                })

                if (chat.id === currentChatCopy.id){
                    currentChatCopy = {
                        ...currentChatCopy,
                        Users
                    }
                }

                return {
                    ...chat,
                    Users
                }
            })

            return {
                ...state,
                chats: chatsCopy,
                currentChat: currentChatCopy,
            }
        }

        case RECEIVED_MESSAGE:{
            const {userId, message} = payload
            let currentChatCopy = {...state.currentChat}
            let newMessage = {...state.newMessage}
            let scrollBottom = state.scrollBottom

            const chatsCopy = state.chats.map(chat => {
                if(message.chatId === chat.id) {
                    if (message.User.id === userId) {
                        scrollBottom++
                    } else {
                        newMessage = {
                            chatId: chat.id,
                            seen: false,

                        }
                    }

                    if(message.chatId === currentChatCopy.id) {
                        currentChatCopy = {
                            ...currentChatCopy,
                            Messages: [...currentChatCopy.Messages, ...[message]]
                        }
                    }
                    
                    return {
                        ...chat,
                        Messages: [...chat.Messages, ...[message]]
                    }


                }

                return chat
            })

            if (scrollBottom === state.scrollBottom) {
                return {
                    ...state,
                    chats: chatsCopy,
                    currentChat: currentChatCopy,
                    newMessage,
                }
            }

            return {
                ...state,
                chats: chatsCopy,
                currentChat: currentChatCopy,
                newMessage,
                scrollBottom, 
            }

        }

        case ADD_USER_TO_GROUP: {
            const {chat, chatters} = payload

            let exists = false

            const chatsCopy = state.chats.map(chatState => {
                if (chat.id === chatState.id) {
                    exists = true

                    return {
                        ...chatState,
                        Users: [...chatState.Users, ...chatters]
                    }
                }

                return chatState
            })

            if (!exists) chatsCopy.push(chat)

            let currentChatCopy = {...state.currentChat}

            if (Object.keys(currentChatCopy).length > 0) {
                if (chat.id === currentChatCopy.id) {
                    currentChatCopy = {
                        ...state.currentChat,
                        Users: [
                            ...state.currentChat.Users,
                            ...chatters
                        ]
                    }
                }
            }


            return {
                ...state, 
                chats: chatsCopy,
                currentChat: currentChatCopy
            }


        }
        
        case CREATE_CHAT:
            return {
                ...state,
                chats: [...state.chats, ...[payload]]
            }

        case LEAVE_CURRENT_CHAT: {
            const {chatId, userId, currentUserId} = payload

            if (userId === currentUserId){
                const chatsCopy = state.chats.filter(chat => chat.id !== chatId)

                return {
                    ...state,
                    chats: chatsCopy,
                    currentChat: state.currentChat.id === chatId ? {} : state.currentChat
                }
            } else {

                const chatsCopy = state.chats.map(chat => {
                    if (chatId === chat.id) {
                        return {
                            ...chat,
                            Users: chat.Users.filter(user => user.id !== userId)
                        }
                    }

                    return chat
                })

                let currentChatCopy = {...state.currentChat}
                if(currentChatCopy.id === chatId) {
                    currentChatCopy = {
                        ...currentChatCopy,
                        Users: currentChatCopy.Users.filter(user => user.id !== userId)
                    }
                }

                return {
                    ...state,
                    chats: chatsCopy,
                    currentChat: currentChatCopy
                }
            }

            
        }

        case DELETE_CURRENT_CHAT: {
            return {
                ...state,
                chats: state.chats.filter(chat => chat.id !== payload),
                currentChat: state.currentChat.id === payload ? {} : state.currentChat
            }
        }

        default:
            return state
    }
}

export default chatReducer