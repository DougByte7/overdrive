import { Socket as NetSocket } from "net"
import { Server as HTTPServer } from "http"
import { NextApiRequest, NextApiResponse } from "next"
import { Server as ServerIO } from "socket.io"

export type NextApiResponseServerIO = NextApiResponse & {
  socket: NetSocket & {
    server: HTTPServer & {
      io: ServerIO
    }
  }
}

const socketHandler = (_req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("Socket is initializing")

    const httpServer = res.socket.server
    const io = new ServerIO(httpServer, { path: "/api/socketio" })
    res.socket.server.io = io

    io.on("connection", (socket) => {
      console.log("connected")

      socket.on("room:join", ({ room, user }) => {
        console.table({
          "room-id": room,
          "user-id": user.id,
          "user-name": user.name,
        })

        socket.join(room)

        socket.to(room).emit("user:joined", user)

        socket.on("disconnect", () => {
          socket.to(room).emit("user:left", user.id)
        })

        socket.on("user:leave", (userId) => {
          socket.to(room).emit("user:left", userId)
        })

        socket.on("user:join-video", (signal, from) => {
          socket.to(room).emit("user:joined-video", signal, from)
        })

        socket.on("user:toggle-audio", (userId) => {
          socket.to(room).emit("user:toggled-audio", userId)
        })

        socket.on("user:toggle-video", (userId) => {
          socket.to(room).emit("user:toggled-video", userId)
        })

        socket.on("chat:post", (message) => {
          socket.to(room).emit("chat:get", message)
        })
      })
    })
  }

  res.end()
}

export default socketHandler
