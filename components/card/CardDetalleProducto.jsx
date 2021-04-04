import Card from "../card/Card"
import Categorias from "../categorias/Categorias"
import Footer from "../footer/Footer"
import { Button } from "@material-ui/core"
import { DiscussionEmbed } from "disqus-react"
import ReactMarkdown from "react-markdown/with-html"
import Grow from "@material-ui/core/Grow"
import { format_number } from "../../lib/utilidades"
import ImageGallery from "react-image-gallery"
import { useEffect } from "react"
import styles from "./cardDetalleProducto.module.scss"

const CardProducto = ({ feed, meta_url, title, descuento = 0, description = "", image_link, image_2, image_3, image_4, image_5, tipo_coleccion, indice_item, destacada, tipo_publicacion, likes, fecha, inventory, price, sale_price, handleComprar } = {}) => {
  let images = [
    { original: image_link, thumbnail: image_link, }
  ]

  useEffect(() => {

  }, [])

  if (image_2) images.push({ original: image_2, thumbnail: image_2, })
  if (image_3) images.push({ original: image_3, thumbnail: image_3, })
  if (image_4) images.push({ original: image_4, thumbnail: image_4, })
  if (image_5) images.push({ original: image_5, thumbnail: image_5, })
  indice_item = indice_item ? indice_item : 1;
  const usuario =
    typeof localStorage != "undefined"
      ? localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).email
        : null
      : null;
  let like = null;
  if (usuario) like = likes ? !!likes.find((like) => like == usuario) : false

  return (<Grow key={indice_item} in={true} style={{ transformOrigin: "0 0 0" }}>
    <div key={indice_item} className={styles.DetalleProducto}>
      <Categorias scroll={false} />
      <div className={styles.descripcion_imagen}>
        <div className={styles.left}>
          <div className={styles.content_imagen}>
            <ImageGallery
              items={images}
              lazyLoad={false}
              showPlayButton={false}
              showBullets={false}
              showFullscreenButton={false} />
          </div>

          <div className={`${styles.Card} ${styles["productos-relacionados"]}`}>
            <h3 className="text-center">Productos que te pueden interesar</h3>
            <div className="listadoRodadas">
              {["", "", ""].map((current, ind) => {
                const item = feed[ind]
                return <Card key={ind} special_title="Más vendido" destacada={true} doc_id={item.id} permitirLink={true} {...item} coleccion={item.coleccion} indice_item={ind} />
              })}
            </div>
          </div>
        </div>

        {description && (
          <div className={`${styles.Card} ${styles.descripcion}`}>
            <h1>{title}</h1>
            <div className={styles.content_precio}>
              {/* Precio */}
              <span className={styles.tachado}>
                {price && <React.Fragment>$&nbsp;{price}</React.Fragment>}
              </span>

              {descuento > 0 && (
                <span className={"descuento" + (logDetalle ? " logDetalle" : "")}> -{descuento}% </span>
              )}

              {sale_price && (<React.Fragment>
                <br />
                <span className={styles.nuevoPrecio}>
                  $&nbsp;{sale_price}
                </span>
              </React.Fragment>
              )}
            </div>

            {inventory > 0 && (<Button variant="contained" color="primary" onClick={handleComprar}>
              Hablar con el vendedor
            </Button>)}

            <div className="texto">
              <ReactMarkdown
                source={description}
                escapeHtml={false}></ReactMarkdown>
            </div>

            <div className={styles.social_media}>
              <a href="#"
                onClick={() => {
                  window.open(
                    `http://www.facebook.com/sharer.php?u=${meta_url}&t=${title}', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600`
                  );
                  return false;
                }}>
                <img src="/images/icons/icon-facebook.png" />
              </a>
              <a href="http://twitter.com/share?text={{data.name}}&url={{urlSite}}&hashtags=equipos_kebco,hashtag2"
                onClick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;">
                <img src="/images/icons/icon-twitter.png" />
              </a>
              <a href="whatsapp://send?text=The text to share!"
                data-action="share/whatsapp/share"
                onClick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;">
                <img src="/images/icons/icon-whatsapp.png" />
              </a>
            </div>
            <div>
              {/* <DiscussionEmbed
                shortname="pikajuegos-1"
                config={{
                  url: meta_url,
                  identifier: meta_url,
                  title: title,
                  language: "es_ES",
                }}
              /> */}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  </Grow>
  )
}

export default CardProducto