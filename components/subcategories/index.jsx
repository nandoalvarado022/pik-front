import Link from "next/link"
import { getSubcategories } from "../../lib/utils"
import styles from "./subcategories.module.scss"

const Subcategories = () => {
  const list = getSubcategories()
  return <div className={styles.subcategories}>
    <ul>
      {
        list.map(item => <Link href={item.url}>
          <a className="Card">
            <h3>
              {item.name}
            </h3>
          </a>
        </Link>
        )
      }
    </ul>
  </div>
}

export default Subcategories