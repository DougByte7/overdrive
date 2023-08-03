import { atom } from "jotai"
import { io } from "socket.io-client"

const socket = atom(
  io("/", {
    path: "/api/socketio",
    addTrailingSlash: false,
    autoConnect: false,
  })
)
export const socketAton = atom((get) => get(socket))
