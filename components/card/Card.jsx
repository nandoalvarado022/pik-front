import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faHeart } from "@fortawesome/free-regular-svg-icons"
import Grow from "@material-ui/core/Grow"
import { format_number } from "../../lib/utils"
import { useQuery, gql } from '@apollo/client'
import styles from "./card.module.scss"
import { faStar } from "@fortawesome/free-solid-svg-icons"

const Card = ({ accept_changues, certificate, id: id_publication, is_new, tags, special_title, title, descuento = 0, description, image_link, slug, tipo_coleccion, destacada, user_name, user_picture, type, likes, price, sale_price, logDetalle, quantity } = {}) => {
  const usuario = typeof localStorage != "undefined" ? localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).email : null : null
  let like = null
  if (usuario) like = likes ? !!likes.find((like) => like == usuario) : false
  destacada = id_publication == 1 ? true : false
  const { loading, error, data } = useQuery(gql`{
    publications{
      title
    }
  }`)

  return <Grow key={id_publication} in={true} style={{ opacity: 1 }}>
    <Link href={slug ? "/publicacion/[id]" : "javascript:void(0)"} as={slug ? `/publicacion/${slug}` : "javascript:void(0)"}>
      <a className={id_publication == 1 ? styles.destacada_Card : ""}>
        {special_title && (<h3 className={styles.title_destacada}>{special_title}</h3>)}
        <div key={id_publication} className={`${styles.Card} ${destacada ? styles.destacada : ""}`} >
          <div className={styles.author}>
            <span className={styles.user_picture} style={{ backgroundImage: `url(${user_picture})` }} />
            <p title={certificate ? "El usuario esta certificado, puedes confiar en esta oferta" : ""}>
              <h3>
                {certificate && <FontAwesomeIcon icon={faCheckCircle} />}
                {user_name}
              </h3>
              {
                certificate && <div className={styles.stars}>
                  <FontAwesomeIcon icon={faStar} /> 4,5
                </div>
              }
            </p>
          </div>
          <div className={styles.descripcion_imagen}>
            <div className={styles.content_imagen}>
              <div className={styles.tags}>
                {!is_new && <span title="El articulo es de segunda mano" className={styles.condition}>Usado</span>}
                {accept_changues && <span className={styles.condition} title="El vendedor acepta productos como parte de pago o incluso cambiar el producto por otro de su interés">Acepto cambios</span>}
                {
                  tags && JSON.parse(tags).map((item, ind) => {
                    return (<span key={ind} /*style={{ background: item.background }}*/>
                      {item.texto}
                    </span>
                    );
                  })
                }
              </div>

              {image_link && <img alt={title} className="image-front" src={`${image_link}`} />}
            </div>
            {
              <div className={styles.descripcion}>
                <h2>{title}</h2>
                {quantity && <p className={styles.quantity}>{quantity} unidades disponibles</p>}
                <div className={styles["likes-precio"]}>
                  {/* <div className="likes">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>12</span>
                  </div> */}
                  <div className={styles.content_precio}>
                    {/* Precio */
                      price && <span className={styles.tachado}>
                        ${format_number(price)}
                      </span>
                    }

                    {
                      sale_price && sale_price != 0 && (
                        <React.Fragment>
                          <span className={styles.nuevoPrecio}>
                            ${format_number(sale_price)}
                          </span>
                        </React.Fragment>
                      )
                    }
                  </div>
                </div>
              </div >
            }
          </div >
        </div >
      </a >
    </Link >
  </Grow >
};

export default Card;
