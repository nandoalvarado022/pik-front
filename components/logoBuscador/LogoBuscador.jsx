import { gql, useLazyQuery } from '@apollo/client'
import { useRouter } from "next/router"
import Link from "next/link"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { getFeed, transformarFeed } from "../../lib/functions"
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
            {/* <img className="mobile logo" src="/images/logos/Logo pikajuegos y juancho.png" alt="" /> */}
          </span>
        </Link>
      )}

      {partner && (
        <Link href="/">
          <img src={`/images/partners/${partner}.png`} />
        </Link>
      )}

      <div className={styles.content_buscador}>
        <Autocomplete
          freeSolo
          className="input-buscador"
          id={styles["free-solo-2-demo"]}
          disableClearable
          onChange={onTagsChange}
          options={products && products.publications.map((option) => option.title)}
          renderInput={(params, ind) => <TextField inputProps={{ min: 0, style: { textAlign: "center" }, type: "search" }} {...params} key={ind} className={styles.buscador} label={<span>nintendo switch <FontAwesomeIcon icon={faSearch} /></span>} />}
        />
      </div>
      {/* {!partner && (
        <img className="logo juancho" src="/images/logos/logo_juancho.png" alt="" />
      )} */}
    </ul>
  </div>
  )
}

export default LogoBuscador
