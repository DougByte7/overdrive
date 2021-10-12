import React, { ComponentType } from "react"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded"
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded"
import BuildRoundedIcon from "@mui/icons-material/BuildRounded"
import theme from "@/theme"
import MenuItem from "./menu-item/menu-item-component"
import { darken } from "@mui/material"

export default function ComponentSelector() {
  const createMenuIcon = (icon: JSX.Element) => () =>
    React.cloneElement(icon, {
      style: { fontSize: "2rem" },
    })

  const menuItems: Array<{
    title: string
    iconComponent: ComponentType
    onClick: VoidFunction
  }> = [
    {
      title: "Menu",
      iconComponent: createMenuIcon(<MenuRoundedIcon />),
      onClick: () => {},
    },
    {
      title: "Criar lista",
      iconComponent: createMenuIcon(<ListAltRoundedIcon />),
      onClick: () => {},
    },
    {
      title: "Criar regra",
      iconComponent: createMenuIcon(<AccountTreeRoundedIcon />),
      onClick: () => {},
    },
    {
      title: "Editar componente",
      iconComponent: createMenuIcon(<BuildRoundedIcon />),
      onClick: () => {},
    },
  ]
  return (
    <>
      <menu className="toolbar" type="toolbar">
        {menuItems.map(({ iconComponent: Icon, ...restProps }, i) => (
          <MenuItem key={i} {...restProps}>
            <Icon />
          </MenuItem>
        ))}
      </menu>

      <style jsx>{`
        .toolbar {
          grid-area: toolbar;
          display: flex;
          justify-content: center;
          position: fixed;
          bottom: 2rem;
          left: 50%;
          z-index: 2;
          background: ${darken(theme.palette.background.default, 0.15)};
          transform: translateX(-50%);
          margin: 0 auto;
          padding: 0;
          border-radius: 4rem;
          border: 1px solid ${theme.palette.text.primary};
          list-style: none;
        }
      `}</style>
    </>
  )
}
