import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function useRouteGuard() {
  const { status } = useSession()
  const router = useRouter()

  if (status === "unauthenticated") {
    router.push("/auth")
  }
}
