import Link from "next/link"
import { getSubcategories } from "../../lib/utils"
import styles from "./subcategories.module.scss"

const Subcategories = () => {
  const list = getSubcategories()
  return <ul className={styles.subcategories}>
    {
      list.map(item => <Link href={item.url}>
        <a className="Card" style={{ backgroundImage: `url(${item.image})` }} >
          <h3>
            {item.name}
          </h3>
        </a>
      </Link>
      )
    }
  </ul>
}

export default Subcategories