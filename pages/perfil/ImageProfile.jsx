import { useContext } from "react"
import { PikContext } from "../../states/PikState"
import styles from "./imageProfile.module.scss"

const ImageProfile = ({ userData }) => {
  const context = useContext(PikContext)
  const { category, picture } = context?.user

  return <div className={`content_image ${styles.content_image} ${styles[category]}`}>
    <span className={styles.picture} style={{ "background-image": `url(${picture})` }} />
  </div>
}

export default ImageProfile