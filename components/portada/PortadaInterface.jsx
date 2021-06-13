import Card from '../card/Card'
import Footer from '../footer/Footer'
import styles from "./portada.module.scss"
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Subcategories from '../subcategories';
// import ArticlesList from "../articlesList/ArticlesList";

const SpecialBanner = ({ category, handleLike, popularyItem, starItem }) => {
  if (!category && popularyItem && starItem) {
    return <div id={styles.SpecialBanner}>
      <div className={styles.box}>
        <div className={styles.title}>Lo más popular</div>
        <Card key={popularyItem.id} handleLike={handleLike} permitirLink={true} {...popularyItem} />
      </div>
      <img src="/images/banners/banner-varios-juegos.png" alt="Juegos SSwitch en promoción" />
      <div className={styles.box}>
        <div className={styles.title}>Lo más vendido</div>
        <Card key={starItem.id} handleLike={handleLike} permitirLink={true} {...starItem} />
      </div>
    </div>
  } else {
    switch (category) {
      case "playstation":
        return <img className="block-center m-t-20" src="https://www.combogamer.com/wp-content/uploads/2014/05/ps4-launch-banner.png" />
      case "nintendo-switch":
        return <img className="block-center m-t-20" src="https://switchplayer.net/wp-content/uploads/2017/03/Nintendo-Switch-List-Banner-1-820x171.png" />
      default:
        return <div></div>
    }
  }
}

const PortadaInterface = ({ handleSubcategory, category, handleLike, feed, popularyItem, starItem }) => {
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("user") == null) setShowVideo(true)
    setTimeout(() => {
      document.querySelectorAll("video").forEach(item => {
        item.play()
      })
    }, 2000)
  }, [])

  const handleVideo = () => {
    document.getElementById("btnStart").click()
  }

  return <React.Fragment>
    {
      showVideo && <div className={styles.videoContent}>
        <video onClick={handleVideo} className="block-center" src="/videos/video1.mp4" />
      </div>
    }
    <SpecialBanner {...{ category, handleLike, popularyItem, starItem }} />
    {
      <Subcategories />
    }
    <div className={styles.view_Rodadas}>
      <div className={styles.main}>
        <div className="listadoRodadas">
          {feed && feed.map((item, ind) => {
            return <React.Fragment>
              {ind == 4 && <video className="block-center video-evita-estafas" src="/videos/evita-estafas.mp4" />}
              <Card special_title="Más vendido" handleLike={handleLike} {...item} />
            </React.Fragment>
          })}
        </div>
      </div>
    </div>
    <Footer />
  </React.Fragment>
}

export default PortadaInterface