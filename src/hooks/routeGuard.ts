import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function useRouteGuard() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  if (isLoaded && !isSignedIn) {
    router.push("/");
  }

  return status;
}
