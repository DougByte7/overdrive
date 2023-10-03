import { useForm } from "@mantine/form"
import {
  Button,
  PasswordInput,
  TextInput,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import Link from "next/link"

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

export default function Login() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
      password: (value) => (!!value ? null : "Insira sua senha"),
    },
  })

  return (
    <main css={styles}>
      <Stack className="container" align="center">
        <Title className="title" order={1} size={24}>
          Entre com sua conta!
        </Title>
        <form
          className="form"
          onSubmit={form.onSubmit((values) => console.log(values))}
        >
          <Stack>
            <TextInput
              type="email"
              label="Email"
              placeholder="seu@email.com"
              size="lg"
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label="Senha"
              placeholder="*************"
              size="lg"
              {...form.getInputProps("password")}
            />

            <Link href="/forgot-password">Esqueci a senha</Link>

            <Button type="submit" size="xl">
              Entrar
            </Button>

            <Link href="/create-account">
              <Text fw={700} ta="center">
                Registrar
              </Text>
            </Link>
          </Stack>
        </form>
      </Stack>
    </main>
  )
}

const styles = css`
  background-color: #8100be;
  background-image: url("/images/icon-logo.svg");
  background-position: top center;
  background-repeat: no-repeat;
  height: 100vh;

  .container {
    position: fixed;
    bottom: 0;
    padding: 48px 16px 24px;
    width: 100%;
    background: white;
    border-radius: 16px 16px 0px 0px;

    .title {
      align-self: flex-start;
    }

    .form {
      width: 100%;
    }

    a {
      color: inherit;
      text-decoration: none;
    }
  }
`
