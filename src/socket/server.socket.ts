// import { io } from "../index"
// import { Socket } from "socket.io"

// export function Socket_server() {
//     io.on('connection', (socket:Socket) => {
//         socket.on("newUser",(username:any) => {
//             socket.broadcast.emit("update",`${username} joined the conversation`)
//         })
//         socket.on("exitUser",(username:any) => {
//             socket.broadcast.emit("update",`${username} left the conversation`)
//         })
//         socket.on("chat",(message:any) => {
//             socket.broadcast.emit("chat",message)
//         })
//     });
// }