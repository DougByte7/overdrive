import { activeTabAtom } from "@/components/character/state"
import { css } from "@emotion/react"
import {
  Menu,
  Burger,
  Anchor,
  Flex,
  UnstyledButton,
  Stack,
  Divider,
  Text,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconUser, IconLogout, IconCrystalBall } from "@tabler/icons-react"
import { useAtom } from "jotai"

export default function CharacterFooter() {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom)
  const [opened, { toggle }] = useDisclosure(false)
  const menuLabel = opened ? "Fechar menu" : "Abrir menu"

  const handleSetActiveTab = (tab: typeof activeTab) => () => {
    setActiveTab(tab)
  }

  const handleNotImplemented = () =>
    notifications.show({
      title: "Falha crítica!",
      message: "Função não implementada",
      color: "red",
    })

  return (
    <footer css={footerStyles}>
      <Menu css={menuStyles} width={300} opened={opened} onChange={toggle}>
        <Menu.Target>
          <Burger
            css={burgerStyles}
            color="white"
            opened={opened}
            aria-label={menuLabel}
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            icon={<i css={customIconStyles("/d10-electric.svg", false)} />}
          >
            <Anchor href="/home" color="default">
              Início
            </Anchor>
          </Menu.Item>

          <Menu.Divider />
          <Menu.Label>Ações extras da página</Menu.Label>
          <Menu.Item onClick={handleNotImplemented}>Traços raciais</Menu.Item>
          <Menu.Item onClick={handleNotImplemented}>
            Características de classe
          </Menu.Item>
          <Menu.Item onClick={handleNotImplemented}>Ações</Menu.Item>
          <Menu.Item onClick={handleNotImplemented}>Subir de nível</Menu.Item>

          <Menu.Divider />
          <Menu.Label>Conta</Menu.Label>

          <Menu.Item icon={<IconUser />} onClick={handleNotImplemented}>
            Perfil
          </Menu.Item>

          <Menu.Item
            color="red"
            icon={<IconLogout />}
            onClick={handleNotImplemented}
          >
            Sair
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Flex justify="space-evenly" align="center" h={56} mt={8}>
        <UnstyledButton onClick={handleSetActiveTab("basic")}>
          <Stack align="center" spacing={0}>
            <i
              aria-hidden={true}
              css={customIconStyles(
                `/icons/${
                  activeTab === "basic" ? "bold" : "linear"
                }/user-octagon.svg`,
                activeTab === "basic"
              )}
            />
            <Text size={10}>Básico</Text>
          </Stack>
        </UnstyledButton>

        <Divider orientation="vertical" />

        <UnstyledButton onClick={handleSetActiveTab("inventory")}>
          <Stack align="center" spacing={0}>
            <i
              aria-hidden={true}
              css={customIconStyles(
                `/icons/${
                  activeTab === "inventory" ? "bold" : "linear"
                }/archive.svg`,
                activeTab === "inventory"
              )}
            />
            <Text size={10}>Inventário</Text>
          </Stack>
        </UnstyledButton>

        <Divider orientation="vertical" />

        <UnstyledButton onClick={handleSetActiveTab("skills")}>
          <Stack align="center" spacing={0}>
            <i
              aria-hidden={true}
              css={customIconStyles(
                `/icons/${activeTab === "skills" ? "bold" : "linear"}/book.svg`,
                activeTab === "skills"
              )}
            />
            <Text size={10}>Habilidades</Text>
          </Stack>
        </UnstyledButton>

        <Divider orientation="vertical" />

        <UnstyledButton onClick={handleSetActiveTab("magic")}>
          <Stack align="center" spacing={0}>
            <IconCrystalBall
              fill={
                activeTab === "magic" ? "var(--do_color_primary_base)" : "none"
              }
              color={
                activeTab === "magic"
                  ? "white"
                  : "var(--do_color_support_dark_30)"
              }
              size={28}
              stroke={1.5}
            />
            <Text size={10}>Magias</Text>
          </Stack>
        </UnstyledButton>
      </Flex>
    </footer>
  )
}

const footerStyles = css`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 72px;
  background: var(--do_text_color_600);
  border-top: 1px solid var(--do_color_support_light_30);
`

const menuStyles = css`
  position: absolute;
  bottom: 32px;
  right: 50%;
  translate: calc(50% - 6px);
`

const customIconStyles = (path: string, isActive: boolean) => css`
  display: flex;
  width: 32px;
  height: 32px;
  background-color: ${isActive
    ? "var(--do_color_primary_base)"
    : "var(--do_color_support_dark_30)"};
  mask: url(${path}) no-repeat center;
  mask-size: 28px;
`

const burgerStyles = css`
  border-radius: 50%;
  border: 6px solid var(--do_text_color_600);
  padding: 16px;
  background: var(--do_color_primary_base);
  width: calc(1.5rem + 42px);
  height: calc(1.5rem + 42px);
`