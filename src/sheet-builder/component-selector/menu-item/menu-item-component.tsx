import theme from "@/theme"
import { FunctionComponent } from "react"

interface MenuItemProps {
  title: string
  children: JSX.Element
  onClick: VoidFunction
}

const MenuItem: FunctionComponent<MenuItemProps> = ({
  title,
  children,
  onClick: handleClick,
}) => (
  <>
    <li className="toolbar__li">
      <button className="toolbar__item" title={title} onClick={handleClick}>
        {children}
      </button>
    </li>
    <style jsx>{`
      .toolbar__li {
        height: 3rem;
        margin: 0 0.5rem;
        &:first-child {
          margin-left: 1rem;
        }
        &:last-child {
          margin-right: 1rem;
        }

        .toolbar__item {
          height: 100%;
          width: 3.5rem;
          border: none;
          padding: 0;
          background: initial;
          text-align: center;
          vertical-align: super;
          transition: color 150ms;
          cursor: pointer;
          color: ${theme.palette.text.primary};

          &:hover,
          &:focus {
            font-size: 1rem;
            color: ${theme.palette.action.focus};
          }
        }

        @media screen and (min-width: 640px) {
          margin: 0;

          &:first-child,
          &:last-child {
            margin: 0;
          }

          .toolbar__item {
            width: 3rem;
            :global(svg) {
              font-size: 2rem;
            }
          }
        }
      }
    `}</style>
  </>
)

export default MenuItem
