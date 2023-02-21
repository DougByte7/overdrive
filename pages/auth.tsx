import { useForm } from "@mantine/form"
import {
  Button,
  PasswordInput,
  TextInput,
  Stack,
  Text,
  Title,
  Space,
} from "@mantine/core"
import { css } from "@emotion/react"
import { signIn } from "next-auth/react"
import { NextRouter, useRouter } from "next/router"
import { Dispatch, SetStateAction, useState } from "react"
import { showNotification } from "@mantine/notifications"

type FormMode = "login" | "register" | "forgot"

export default function Login() {
  const router = useRouter()
  const { confirmationCode } = router.query

  const [formMode, setFormMode] = useState<FormMode>("login")

  function getForm() {
    switch (formMode) {
      case "register":
        return <RegisterForm setFormMode={setFormMode} />
      case "forgot":
        return <ForgotForm setFormMode={setFormMode} />
      default:
        return <LoginForm setFormMode={setFormMode} router={router} />
    }
  }

  return (
    <main css={styles}>
      <Stack
        className={`container ${formMode === "login" ? "" : "container--full"}`}
        align="center"
      >
        {confirmationCode ? (
          <PasswordForm
            confirmationCode={confirmationCode as string}
            router={router}
          />
        ) : (
          getForm()
        )}
      </Stack>
    </main>
  )
}

function LoginForm({
  setFormMode,
  router,
}: {
  setFormMode: Dispatch<SetStateAction<FormMode>>
  router: NextRouter
}) {
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

  const handleLogin = form.onSubmit(async (values) => {
    const res = await signIn("credentials", {
      ...values,
      redirect: false,
    }).catch(console.error)

    if (res?.ok) {
      router.push("/home")
    } else {
      showNotification({
        autoClose: 10000,
        title: "Erro ao validar seu dados de sessão",
        message: res?.error,
        color: "red",
      })
    }
  })
  const handleForgotPassword = () => setFormMode("forgot")
  const handleStartRegistration = () => setFormMode("register")

  return (
    <>
      <Title className="title" order={1} size={24}>
        Entre com sua conta!
      </Title>
      <form onSubmit={handleLogin}>
        <Stack>
          <TextInput
            sx={{
              ".mantine-InputWrapper-label": {
                fontSize: "14px",
                fontWeight: 700,
              },
            }}
            type="email"
            label="Email"
            placeholder="seu@email.com"
            size="lg"
            withAsterisk
            {...form.getInputProps("email")}
          />

          <PasswordInput
            sx={{
              ".mantine-InputWrapper-label": {
                fontSize: "14px",
                fontWeight: 700,
              },
            }}
            label="Senha"
            placeholder="*************"
            size="lg"
            withAsterisk
            {...form.getInputProps("password")}
          />

          <Button
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              width: "min-content",
              padding: 0,
            }}
            variant="subtle"
            size="xs"
            onClick={handleForgotPassword}
          >
            <Text color="#1E1E1E">Esqueci a senha</Text>
          </Button>

          <Button sx={{ fontSize: "14px" }} type="submit" size="md">
            Entrar
          </Button>

          <Button
            sx={{ fontSize: "14px" }}
            variant="subtle"
            size="md"
            onClick={handleStartRegistration}
          >
            <Text color="#1E1E1E">Registrar</Text>
          </Button>
        </Stack>
      </form>
    </>
  )
}

function ForgotForm({
  setFormMode,
}: {
  setFormMode: Dispatch<SetStateAction<FormMode>>
}) {
  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
    },
  })

  const handleSendConfirmationEmail = form.onSubmit(async (values) => {
    const res = await fetch("/api/password-reset", {
      method: "POST",
      body: JSON.stringify(values),
    }).then((res) => res.json())

    if (res.success) {
      showNotification({
        autoClose: 10000,
        title: "Enviamos um código para você",
        message: "Verifique seu email e continue o processo pelo link enviado",
        color: "green",
      })
    } else {
      showNotification({
        autoClose: 10000,
        title: "Algo de errado não está certo",
        message: res.message,
        color: "red",
      })
    }
  })

  const handleGoBack = () => setFormMode("login")

  return (
    <>
      <Title className="title" order={1} size={24}>
        Digite um e-mail
      </Title>
      <Text sx={{ alignSelf: "start" }}>
        Digite o e-mail utilizado na criação da sua conta, enviaremos um link
        para você criar uma nova senha de acesso.
      </Text>
      <Space h="sm" />
      <form onSubmit={handleSendConfirmationEmail}>
        <Stack>
          <TextInput
            sx={{ ".mantine-InputWrapper-label": { fontSize: "14px" } }}
            type="email"
            label="E-mail"
            placeholder="seu@email.com"
            size="lg"
            {...form.getInputProps("email")}
          />
          <Button sx={{ fontSize: "16px" }} type="submit" size="lg">
            Continuar
          </Button>
          <Button
            sx={{ fontSize: "16px" }}
            size="lg"
            variant="subtle"
            onClick={handleGoBack}
          >
            <Text color="#1E1E1E">Voltar</Text>
          </Button>
        </Stack>
      </form>
    </>
  )
}

function RegisterForm({
  setFormMode,
}: {
  setFormMode: Dispatch<SetStateAction<FormMode>>
}) {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
    },

    validate: {
      name: (value) => {
        if (!value) return "Insira um nome"
        if (value.length < 2)
          return "Seu nome precisa conter pelo menos 2 caracteres"
        if (value.length > 30)
          return "Sua nome não pode conter mais que 30 caracteres"

        return null
      },
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
    },
  })

  const handleSendConfirmationEmail = form.onSubmit(async (values) => {
    const res = await fetch("/api/email-confirmation", {
      method: "POST",
      body: JSON.stringify(values),
    }).then((res) => res.json())

    if (res.success) {
      showNotification({
        autoClose: 10000,
        title: "Enviamos um código para você",
        message:
          "Verifique seu email e continue seu cadastro pelo link enviado",
        color: "green",
      })
    } else {
      showNotification({
        autoClose: 10000,
        title: "Algo de errado não está certo",
        message: res.message,
        color: "red",
      })
    }
  })

  const handleGoBack = () => setFormMode("login")

  return (
    <>
      <Title className="title" order={1} size={24}>
        Digite um e-mail e nome de usuário
      </Title>
      <Text sx={{ alignSelf: "start" }}>
        Digite o e-mail utilizado na criação da sua conta, enviaremos um link
        para você criar uma nova senha de acesso.
      </Text>
      <Space h="sm" />
      <form onSubmit={handleSendConfirmationEmail}>
        <Stack>
          <TextInput
            sx={{ ".mantine-InputWrapper-label": { fontSize: "14px" } }}
            label="Nome de usuário"
            placeholder="Antedeguemon"
            size="lg"
            {...form.getInputProps("name")}
          />
          <TextInput
            sx={{ ".mantine-InputWrapper-label": { fontSize: "14px" } }}
            type="email"
            label="E-mail"
            placeholder="seu@email.com"
            size="lg"
            {...form.getInputProps("email")}
          />
          <Button sx={{ fontSize: "16px" }} type="submit" size="lg">
            Continuar
          </Button>
          <Button
            sx={{ fontSize: "16px" }}
            size="lg"
            variant="subtle"
            onClick={handleGoBack}
          >
            <Text color="#1E1E1E">Voltar</Text>
          </Button>
        </Stack>
      </form>
    </>
  )
}

function PasswordForm({
  confirmationCode,
  router,
}: {
  confirmationCode: string
  router: NextRouter
}) {
  const form = useForm({
    initialValues: {
      newPassword: "",
      passwordConfirmation: "",
    },

    validate: {
      newPassword: (value) => {
        if (!value) return "Insira sua nova senha"
        if (value.length < 8)
          return "Sua senha precisa conter pelo menos 8 caracteres"
        if (value.length > 64)
          return "Sua senha não pode conter mais que 64 caracteres"

        return null
      },
      passwordConfirmation: (value, values) =>
        value !== values.newPassword ? "As senhas devem ser iguais" : null,
    },
  })

  return (
    <>
      <Title className="title" order={1} size={24}>
        Redefina a sua senha
      </Title>
      <Text sx={{ alignSelf: "start" }}>
        Ótimo, agora vamos criar a sua nova senha!
      </Text>
      <Space h="sm" />
      <form
        onSubmit={form.onSubmit(async (values) => {
          const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({
              confirmationCode,
              password: values.newPassword,
            }),
          }).then((res) => res.json())

          if (res.success) {
            signIn("credentials", {
              email: res.email,
              password: values.newPassword,
              redirect: false,
            }).catch(console.error)
            router.push("/home")
          } else {
            showNotification({
              autoClose: 10000,
              title: "Algo de errado não está certo",
              message: res.message,
              color: "red",
            })
          }
        })}
      >
        <Stack>
          <PasswordInput
            sx={{ ".mantine-InputWrapper-label": { fontSize: "14px" } }}
            label="Nova senha"
            placeholder="*************"
            size="lg"
            {...form.getInputProps("newPassword")}
          />
          <PasswordInput
            sx={{ ".mantine-InputWrapper-label": { fontSize: "14px" } }}
            label="Repita sua nova senha"
            placeholder="*************"
            size="lg"
            {...form.getInputProps("passwordConfirmation")}
          />
          <Button sx={{ fontSize: "16px" }} type="submit" size="lg">
            Criar nova senha
          </Button>
        </Stack>
      </form>
    </>
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
    height: 100%;
    max-height: 428px;
    transition: border-radius 250ms, padding-top 250ms, max-height 250ms;

    &.container--full {
      border-radius: 0;
      padding-top: 24px;
      max-height: 100%;
    }

    .title {
      align-self: flex-start;
    }

    form {
      width: 100%;
    }
  }
`
