import React, { ComponentType, useState } from "react"
import MenuRoundedIcon from "@material-ui/icons/MenuRounded"
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded"
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded"
import AccountTreeRoundedIcon from "@material-ui/icons/AccountTreeRounded"
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded"
import TextFieldsRoundedIcon from "@material-ui/icons/TextFieldsRounded"
import IsoRoundedIcon from "@material-ui/icons/IsoRounded"
import BuildRoundedIcon from "@material-ui/icons/BuildRounded"
import ArrowDropDownCircleRoundedIcon from "@material-ui/icons/ArrowDropDownCircleRounded"
import theme from "@/theme"
import MenuItem from "./menu-item/menu-item-component"
import { SheetDataBlock, SheetInputField } from "@/common/sheet/sheet-container"
import { Backdrop } from "@material-ui/core"

interface IComponentSelectorProps {
  sheetData: SheetDataBlock[]
  addSheetElement: (newField: SheetInputField) => void
}

export default function ComponentSelector(props: IComponentSelectorProps) {
  const { sheetData, addSheetElement } = props
  const [isAddComponentMenuOpen, setIsAddComponentMenuOpen] = useState(false)
  const handleCloseAddComponent = () => {
    setIsAddComponentMenuOpen(false)
  }
  const handleOpenAddComponent = () => {
    setIsAddComponentMenuOpen(true)
  }

  const menuItems: Array<{
    title: string
    iconComponent: ComponentType
    onClick: VoidFunction
  }> = [
    { title: "Menu", iconComponent: MenuRoundedIcon, onClick: () => {} },
    {
      title: "Criar lista",
      iconComponent: ListAltRoundedIcon,
      onClick: () => {},
    },
    {
      title: "Adicionar componente",
      iconComponent: AddCircleOutlineRoundedIcon,
      onClick: handleOpenAddComponent,
    },
    {
      title: "Criar regra",
      iconComponent: AccountTreeRoundedIcon,
      onClick: () => {},
    },
    {
      title: "Editar componente",
      iconComponent: BuildRoundedIcon,
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

      <Backdrop
        className="backdrop"
        invisible
        open={isAddComponentMenuOpen}
        onClick={handleCloseAddComponent}
      >
        <div className="popup-menu">
          <div className="container">
            <button>
              <DashboardRoundedIcon style={{ fontSize: 100 }} />
              Container
            </button>
            <button
              onClick={() => {
                addSheetElement({
                  type: "text",
                  position: {
                    columnStart: 0,
                    columnEnd: 13,
                    rowStart: 3,
                    rowEnd: 4,
                  },
                  label: "Xablau",
                  value: "",
                })
              }}
            >
              <TextFieldsRoundedIcon style={{ fontSize: 100 }} />
              Text
            </button>
            <button>
              <IsoRoundedIcon style={{ fontSize: 100 }} /> Skill
            </button>
            <button>
              <ArrowDropDownCircleRoundedIcon style={{ fontSize: 100 }} />
              Dropdown
            </button>
          </div>
        </div>
      </Backdrop>

      <style jsx>{`
        .toolbar {
          grid-area: toolbar;
          display: flex;
          justify-content: center;
          position: fixed;
          bottom: 2rem;
          left: 50%;
          z-index: 2;
          transform: translateX(-50%);
          margin: 0 auto;
          padding: 0;
          border: 1px solid;
          border-radius: 4rem;
          list-style: none;

          @media screen and (min-width: 640px) {
            position: initial;
            z-index: 0;
            flex-wrap: wrap;
            border: none;
            border-right: 1px solid;
            border-radius: 0;
            height: 100vh;
            transform: initial;
          }
        }

        .backdrop {
          z-index: 1;
        }

        .popup-menu {
          position: fixed;
          bottom: 10rem;
          left: 1rem;
          width: calc(100% - 2rem);
          height: 50%;
          border-radius: 15px;
          box-shadow: 0px 0px 10px ${theme.palette.grey[700]};
          background: ${theme.palette.common.white};
          z-index: 1;

          &::before {
            content: "";
            width: 2rem;
            height: 2rem;
            position: fixed;
            bottom: 9rem;
            left: 50%;
            transform: translateX(-50%) rotate(45deg);
            background: ${theme.palette.common.white};
            box-shadow: 0px 0px 10px ${theme.palette.grey[700]};
            z-index: 0;
          }

          .container {
            position: absolute;
            height: 100%;
            width: 100%;
            border-radius: 15px;
            padding: 1rem;
            background: white;
            z-index: 1;
            display: grid;
            grid-gap: 1rem;
            grid-template-columns: repeat(2, 1fr);

            button {
              cursor: pointer;
              background: none;
              border: none;
              font-size: 3rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              border-radius: 15px;
              box-shadow: 0px 0px 10px ${theme.palette.grey[700]};
            }
          }
        }
      `}</style>
    </>
  )
}
