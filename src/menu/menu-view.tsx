import MenuIcon from "@mui/icons-material/Menu"

export default function Menu() {
  return (
    <nav className="main-menu-container">
      <ul className="main-menu">
        <li className="menu-item">
          <MenuIcon fontSize="large" />
        </li>
      </ul>
      <style jsx>{`
        .main-menu-container {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          background: #272727;
          height: 64px;

          .main-menu {
            list-style: none;
            margin: 0;
            padding: 16px;
            display: flex;
          }
        }
      `}</style>
    </nav>
  )
}
