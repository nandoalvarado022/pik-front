import Card from '../card/Card'
import Footer from '../footer/Footer'
import styles from "./portada.module.scss"
import ArticlesList from "../articlesList/ArticlesList";

const SpecialBanner = ({ category, handleLike, feed }) => {
  if (!category && feed.length > 2) {
    const items = [feed[0], feed[1]]

    return <div id={styles.SpecialBanner}>
      <div className={styles.box}>
        <div className={styles.title}>Lo más popular</div>
        <Card key={items[0].id} handleLike={handleLike} permitirLink={true} {...items[0]} />
      </div>
      <img src="/images/banners/banner-varios-juegos.png" alt="Juegos SSwitch en promoción" />
      <div className={styles.box}>
        <div className={styles.title}>Lo más vendido</div>
        <Card key={items[1].id} handleLike={handleLike} permitirLink={true} {...items[1]} />
      </div>
    </div>
  } else {
    switch (category) {
      case "ps4":
        return <img className="block-center" src="https://www.combogamer.com/wp-content/uploads/2014/05/ps4-launch-banner.png" />
      default:
        return <img className="block-center" src="https://switchplayer.net/wp-content/uploads/2017/03/Nintendo-Switch-List-Banner-1-820x171.png" />
    }
  }
}

const PortadaInterface = ({ category, handleLike, feed }) => {
  return <React.Fragment>
    <SpecialBanner {...{ category, feed, handleLike }} />
    <div className={styles.view_Rodadas}>
      <div className={styles.main}>
        {/* NUEVOS */}
        {feed && feed.filter(item => item.is_new) && <React.Fragment>
          <div className="listadoRodadas sellados">
            {feed && feed.map((item, ind) => {
              return <React.Fragment>
                <Card special_title="Más vendido" handleLike={handleLike} {...item} />
                {ind == 3 && <ArticlesList />}
              </React.Fragment>
            })}
          </div>
        </React.Fragment>}
      </div>
    </div>
    <Footer />
  </React.Fragment>
}

export default PortadaInterface