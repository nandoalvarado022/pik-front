import styles from "./imageProfile.module.scss"

const ImageProfile = ({ userData }) => {
  return <div className={`${styles.content_image} ${styles[userData?.category]}`}>
    <span className={styles.picture} style={{ "background-image": `url(${userData?.picture})` }} />
  </div>
}

export default ImageProfile