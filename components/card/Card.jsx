import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Grow from "@material-ui/core/Grow";
import { format_number } from "../../lib/utilidades";
import { useQuery, gql } from '@apollo/client';
import styles from "./card.module.scss"

const Card = ({ itemId, tags, special_title, title, descuento = 0, description, image_link, slug, tipo_coleccion, destacada, type, likes, price, sale_price, logDetalle, quantity } = {}) => {
  const usuario =
    typeof localStorage != "undefined"
      ? localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).email
        : null
      : null;
  let like = null;
  if (usuario) like = likes ? !!likes.find((like) => like == usuario) : false;
  destacada = itemId == 1 ? true : false;

  const { loading, error, data } = useQuery(gql`{
    publications{
      title
    }
  }`)

  return (<Grow key={itemId} in={true} style={{ transformOrigin: "0 0 0" }}>
    <Link href={slug ? "/publicacion/[id]" : "javascript:void(0)"} as={slug ? `/publicacion/${slug}` : "javascript:void(0)"}>
      <a className={itemId == 1 ? styles.destacada_Card : ""}>
        {special_title && (<h3 className={styles.title_destacada}>{special_title}</h3>)}
        <div key={itemId} className={`${styles.Card} ${destacada ? styles.destacada : ""}`} >
          <div className={styles.descripcion_imagen}>
            <div className={styles.content_imagen}>
              {image_link && (
                <img className="image-front" src={`${image_link}`} />
              )}
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

                    {tags && (
                      <div className={styles.tags}>
                        {
                          JSON.parse(tags).map((item, ind) => {
                            return (<span style={{ background: item.background }}>
                              {item.texto}
                            </span>
                            );
                          })
                        }
                      </div>
                    )}
                  </div>
                </div>
              </div >
            }
          </div >
        </div >
      </a >
    </Link >
  </Grow >
  );
};

export default Card;
