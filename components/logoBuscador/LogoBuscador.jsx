import { gql, useLazyQuery } from '@apollo/client'
import { useRouter } from "next/router"
import Link from "next/link"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React, { useState, useEffect, useMemo } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import styles from "./logoBuscador.module.scss"

function LogoBuscador({ partner }) {
  const router = useRouter()
  const [showSearchBox, setShowSearchBox] = useState(false)
  const PUBLICATIONS_QUERY = gql`
  query Publications($slug: String){
    publications(slug: $slug, status: true){
      category
      description
      image_2
      image_3
      image_4
      image_link
      is_new
      sale_price
      title      
      slug
    }
  }`

  const [getPublications, { data: products }] = useLazyQuery(PUBLICATIONS_QUERY)

  useEffect(() => {
    getPublications()
    if (window.screen.width > 420) setShowSearchBox(true)
  }, [])

  function onTagsChange(event, values) {
    const slug = products.publications.find((x) => x.title == values).slug;
    router.push("/publicacion/" + slug);
  }

  return (<div id={styles.LogoBuscador} className={partner ? "partner" : ""}>
    <ul>
      {!partner && (
        <Link href="/">
          <span>
            <img className={styles.logo} src="/images/logos/logo-pikajuegos.png" alt="" />
            <div className={styles.slogan}>
              <span>Videogames Marketplace</span>
            </div>
          </span>
        </Link>
      )}

      <div onClick={() => setShowSearchBox(!showSearchBox)} className={styles["icon-search-mobile"]}>
        <FontAwesomeIcon icon={faSearch} />
      </div>
      {
        <div className={styles.content_buscador} style={{ display: showSearchBox ? "block" : "none" }}>
          <Autocomplete
            freeSolo
            className="input-buscador"
            id={styles["free-solo-2-demo"]}
            disableClearable
            onChange={onTagsChange}
            options={products ? products.publications.map((option) => option.title) : []}
            renderInput={(params, ind) => <TextField inputProps={{ min: 0, style: { textAlign: "center" }, type: "search" }} {...params} key={ind} className={styles.buscador} label={<span><FontAwesomeIcon icon={faSearch} /> &nbsp;nintendo switch, ps5, controles de xbox</span>} />}
          />
        </div>
      }
    </ul>
  </div>
  )
}

export default LogoBuscador
