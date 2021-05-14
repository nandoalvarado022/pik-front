import Link from "next/link"
import { getSubcategories } from "../../lib/utils"
import styles from "./subcategories.module.scss"

const Subcategories = () => {
  const list = getSubcategories()
  return <ul className={styles.subcategories}>
    {
      list.map(item => <li>

        <Link href={item.url}>
          <a>
            <img className="Card" src={item.image} alt={item.name} />
            <h3>
              {item.name}
            </h3>
          </a>
        </Link>
      </li>
      )
    }
  </ul>
}

export default Subcategories