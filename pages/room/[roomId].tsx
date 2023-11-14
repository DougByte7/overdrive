/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useId } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { socketAton } from "@/components/room/state";
import WebRTCStream from "@/components/room/web-rtc-stream";
import TurnOrder from "@/components/room/turn-order";
import Chat from "@/components/room/chat";
import Canvas from "@/components/room/canvas";

export default function Room() {
  const [socket] = useAtom(socketAton);
  const guestId = "guest" + useId();
  // Use clerk
  const { data: sessionData, status: sessionStatus } = {
    status: {},
    data: { user: { name: "" } },
  };
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "loading" || !router.query.roomId) return;

    socket.connect();

    socket.emit("room:join", {
      room: router.query.roomId,
      user: {
        id: (sessionData?.user as any)?.id ?? guestId,
        name: sessionData?.user?.name ?? "guest",
      },
    });

    return () => {
      socket.close();
    };
  }, [sessionStatus, router.query.roomId]);

  return (
    <main css={page}>
      <section>
        <Canvas />
      </section>

      <section css={avatars}>
        <WebRTCStream />
      </section>

      <section css={chat}>
        <TurnOrder />
        <Chat />
      </section>
    </main>
  );
}

const page = css`
  height: 100vh;
  background: black;
`;

const aside = css`
  position: fixed;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.65);
`;

const avatars = css`
  ${aside}
  left: 0;
  width: 300px;
  padding: 95px 30px;
`;

const chat = css`
  ${aside}
  right: 0;
  width: 350px;
  padding: 24px 16px;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 16px;
`;
