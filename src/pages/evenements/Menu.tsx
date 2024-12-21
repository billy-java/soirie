import { menuParametre } from "../../lib/menu"

const Menu = () => {
  return (
      <div>
          {menuParametre.map((menu) => (
              <a key={menu.nom} href={menu.lien}> <div>{menu.nom}</div></a>
          ))}
    </div>
  )
}

export default Menu