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
  const [textSearch, setTextSearch] = useState("")

  const PUBLICATIONS_QUERY = gql`
  query Publications($slug: String){
    publications(slug: $slug, status: true){
      description
      image_2
      image_3
      image_4
      image_link
      is_new
      sale_price
      title
      type
      slug
    }
  }`

  const [getPublications, { data: products }] = useLazyQuery(PUBLICATIONS_QUERY)

  useEffect(() => {
    getPublications()
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
              <i>Videogames Marketplace</i>
            </div>
          </span>
        </Link>
      )}

      <div className={styles.content_buscador}>
        <Autocomplete
          freeSolo
          className="input-buscador"
          id={styles["free-solo-2-demo"]}
          disableClearable
          onChange={onTagsChange}
          options={products ? products.publications.map((option) => option.title) : []}
          renderInput={(params, ind) => <TextField inputProps={{ min: 0, style: { textAlign: "center" }, type: "search" }} {...params} key={ind} className={styles.buscador} label={<span><FontAwesomeIcon icon={faSearch} /> &nbsp;nintendo switch</span>} />}
        />
      </div>
    </ul>
  </div>
  )
}

export default LogoBuscador
