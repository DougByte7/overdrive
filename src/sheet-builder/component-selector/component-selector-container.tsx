import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import AccountTreeRoundedIcon from "@material-ui/icons/AccountTreeRounded";
import BuildRoundedIcon from "@material-ui/icons/BuildRounded";
import { SyntheticEvent, useState } from "react";
import theme from "@/theme";

export default function ComponentSelector() {
  const [isAddComponentMenuOpen, setIsAddComponentMenuOpen] = useState(false);
  const handleCloseAddComponent = () => {
    setIsAddComponentMenuOpen(false);
  };
  const handleOpenAddComponent = () => {
    setIsAddComponentMenuOpen(true);
  };

  return (
    <>
      <menu className="toolbar" type="toolbar">
        <li className="toolbar__li">
          <button className="toolbar__item" title="Menu">
            <MenuRoundedIcon />
          </button>
        </li>
        <li className="toolbar__li">
          <button className="toolbar__item" title="Criar lista">
            <ListAltRoundedIcon />
          </button>
        </li>
        <li className="toolbar__li">
          <button
            className="toolbar__item"
            title="Adicionar componente"
            onClick={handleOpenAddComponent}
          >
            <AddCircleOutlineRoundedIcon />
          </button>
        </li>
        <li className="toolbar__li">
          <button className="toolbar__item" title="Criar regra">
            <AccountTreeRoundedIcon />
          </button>
        </li>
        <li className="toolbar__li">
          <button className="toolbar__item" title="Editar componente">
            <BuildRoundedIcon />
          </button>
        </li>
      </menu>

      {isAddComponentMenuOpen && (
        <div className="popup-menu">
          <div className="container"></div>
          <div className="backdrop"></div>
        </div>
      )}

      <style jsx>{`
        .toolbar {
          grid-area: toolbar;
          display: flex;
          justify-content: center;
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          list-style: none;
          margin: 0 auto;
          padding: 0;
          border: 1px solid;
          border-radius: 4rem;
          .toolbar__li {
            height: 6rem;
            margin: 0 0.5rem;
            &:first-child {
              margin-left: 1rem;
            }
            &:last-child {
              margin-right: 1rem;
            }

            .toolbar__item {
              height: 100%;
              width: 5.5rem;
              border: none;
              padding: 0;
              background: initial;
              text-align: center;
              transition: color 150ms;
              cursor: pointer;

              :global(svg) {
                height: 100%;
                font-size: 3rem;
              }

              &:hover,
              &:focus {
                font-size: 1rem;
                color: ${theme.palette.primary.main};
              }
            }
          }
        }

        .popup-menu {
          position: fixed;
          bottom: 10rem;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 2rem);
          height: 50%;
          border-radius: 15px;
          box-shadow: 0px 0px 10px ${theme.palette.grey[700]};
          background: ${theme.palette.common.white};

          &::before {
            content: "";
            width: 2rem;
            height: 2rem;
            position: fixed;
            bottom: -1rem;
            left: 50%;
            transform: translateX(-50%) rotate(45deg);
            background: ${theme.palette.common.white};
            box-shadow: 0px 0px 10px ${theme.palette.grey[700]};
            z-index: -1;
          }

          .backdrop {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.5);]
          }

          .container {
            height: 100%;
            width: 100%;
            border-radius: 15px;
            background: white;
          }
        }
      `}</style>
    </>
  );
}
