import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons"
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import Router from 'next/router'
import Card from '../../components/card/Card'
import styles from './publicaciones.module.scss'
import Button from '../../components/button/Button'
import { useEffect, useState } from 'react'
import { format_number } from '../../lib/utils'
import moment from "moment"
import Notification from "../../components/notification"

moment.locale('es')

const Publicaciones = () => {
    const [showDescription, setShowDescription] = useState(false)
    const [message, setMessage] = useState({})
    const phone = typeof window != "undefined" ? JSON.parse(localStorage.getItem("user")).phone : null
    const UPDATE_MUTATION = gql`
	mutation ChangeStatePublication($id: Int!, $status: Boolean!){
		changeStatePublication(id: $id, status: $status)
	}`

    const [changeStatePublication, { loading: loadingUpdate }] = useMutation(UPDATE_MUTATION);

    const PUBLICATIONS_QUERY = gql`
	query Publications($phone: String, $order: Boolean){
		publications(phone: $phone, order: $order){
			accept_changues
			created
			id
			is_verified
			image_link
			sale_price
			slug
			status
			title
			views
		}
	}`

    const [getPublications, { loading: loadingPublications, error, data: reqPublications }] = useLazyQuery(PUBLICATIONS_QUERY, {
        variables: { phone, order: true },
        fetchPolicy: "no-cache"
    })

    const handleChangeState = (id, status) => {
        changeStatePublication({
            variables: { id, status }
        });
        setTimeout(() => {
            getPublications()
        }, 1000)
    }

    const handleEdit = (slug) => {
        Router.push("/publicacion/" + slug + "/editar")
    }

    useEffect(() => {
        getPublications()
    }, [])

    return <div className={styles.content}>
        <Notification isOpen={showDescription} setIsOpen={setShowDescription} message={message} />
        <h2 style={{ textAlign: "center" }}>
            Publicaciones
            <FontAwesomeIcon style={{ float: "right" }} icon={faQuestionCircle} onClick={() => {
                setMessage({
                    id: 0, message: <div>
                        <p>🔵 Bienvenido al panel de tus publicaciones</p>
                        <p>💙 En Pikajuegos te premiamos por cada cosa que haces, por eso cada vez que realices una venta recibiras 1 moneda</p>
                        <p>🤝 Juntos somos mejor</p>
                    </div>
                })
                setShowDescription(true)
            }} />
        </h2>
        <ul className="Card">
            {
                reqPublications && reqPublications.publications.map((item, ind) => {
                    return <li className={`${styles["flex-table"]} ${item.status ? '' : styles.disabled}`}>
                        <div><img src={item.image_link} /></div>
                        <div className={styles["flex-row"]}>{item.title}</div>
                        <div className={styles["flex-row"]}>${format_number(item.sale_price)}</div>
                        <div className={styles["flex-row"]}>{moment(parseInt(item.created)).format("MMMM DD YYYY, h:mm:ss a")}</div>
                        <div className={styles["flex-row"]}>{item.views} visitas</div>
                        <div className={styles["flex-row"]}>{item.is_verified ? item.status ? "Activa" : "Pausada" : "En revisión"}</div>
                        <div className={`${styles["flex-row"]} ${styles.actions}`}>
                            {
                                item.status && <Link href="/publicacion/[id]" as={`/publicacion/${item.slug}`}>
                                    <a className={styles.verPublicacion}>Ver</a>
                                </Link>
                            }
                            {
                                !item.status && <span className={styles.verPublicacion} onClick={() => {
                                    setShowDescription(true)
                                    setMessage({
                                        id: 0, message: <div>
                                            <p>Normalmente no es posible ir a la publicación cuando aún esta siendo revisada por Pikajuegos ó porque esta pausada</p>
                                        </div>
                                    })
                                }}>
                                    <FontAwesomeIcon style={{ position: "relative", left: "-5px", top: "2px" }} icon={faQuestionCircle} />
                                    {/* No es posible ver la publicación */}
                                </span>
                            }
                            <Button onClick={() => handleEdit(item.slug)} color="blue">Editar</Button>
                            <Button onClick={() => item.is_verified ? handleChangeState(item.id, !item.status) : null} color={item.is_verified ? item.status ? "red" : "green" : "disabled"}>
                                {
                                    item.status == true ? <>Desactivar</> : <>Activar</>
                                }
                            </Button>
                        </div>
                    </li>
                })
            }
        </ul>
    </div>
}

export default Publicaciones