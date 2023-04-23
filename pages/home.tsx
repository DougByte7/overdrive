import useRouteGuard from "@/hooks/routeGuard"
import { LoadingOverlay } from "@mantine/core"
import HomeComponent from "@/components/home"

export default function Home() {
  const authStatus = useRouteGuard()
  if (authStatus !== "authenticated") return <LoadingOverlay visible />

  const campaigns = [
    {
      id: "1",
      limit: 4,
      imgSrc:
        "https://images.ctfassets.net/swt2dsco9mfe/5ufckdRJoL1Nh1XJv6clTt/1e8faa90bb0cfef53e3e5dbefc54b661/cos-rp.jpg",
      title: "Maldição de Strahd",
      description: "Estamos utilizando o D&D 5e, venha participar!",
      players: [
        { imgSrc: "", name: "test1" },
        { imgSrc: "", name: "test2" },
        { imgSrc: "", name: "test3" },
      ],
    },
    {
      id: "2",
      limit: 4,
      imgSrc:
        "https://images.ctfassets.net/swt2dsco9mfe/2vBTubJNP0ZXwhKVZBHG9g/31300a00a34dd561c2e9e67da6a69476/1920x1342-ebberon.jpg?q=70",
      title: "Rising from the Last War",
      description:
        "Explore Sharn, uma cidade de arranha-céus, aeronaves e intrigas noir",
      players: [
        { imgSrc: "", name: "test4" },
        { imgSrc: "", name: "test5" },
        { imgSrc: "", name: "test6" },
      ],
    },
  ]

  const characters = [
    {
      id: "1",
      campaignName: "Maldição de Strahd",
      campaignId: "1",
      name: "Anóriel Heinhardt",
      imgSrc:
        "https://i.pinimg.com/564x/fa/73/88/fa7388b1240d66cb712e15f7533d34cd.jpg",
    },
    {
      id: "2",
      campaignName: "Rising from the Last War",
      campaignId: "2",
      name: "NPC - Arlow",
      imgSrc:
        "https://i.pinimg.com/564x/29/f0/f4/29f0f4a55670997585dc912836b0cb8a.jpg",
    },
  ]

  return <HomeComponent campaigns={campaigns} characters={characters} />
}
