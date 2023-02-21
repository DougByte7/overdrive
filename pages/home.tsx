import useRouteGuard from "@/hooks/routeGuard"
import { Button } from "@mantine/core"
import { signOut } from "next-auth/react"

export default function Home() {
  useRouteGuard()

  return (
    <>
      <Button onClick={() => signOut()}>sign out</Button>
    </>
  )
}
