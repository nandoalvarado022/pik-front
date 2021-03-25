import { useRouter } from "next/router";
import Link from "next/link";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getFeed, transformarFeed } from "../../lib/functions";
import React, { useState, useEffect } from "react";

function LogoBuscador({ partner }) {
  const router = useRouter()
  const [top100Films, handleGetFeed] = useState([{ title: "" }]);

  useEffect(() => {
    getFeed().then((feed) => {
      handleGetFeed(feed);
    });
  }, []);

  function onTagsChange(event, values) {
    const slug = top100Films.find((x) => x.title == values).slug;
    router.push("/publicacion/" + slug);
  }

  return (<div id="LogoBuscador" className={partner ? "partner" : ""}>
    <ul>
      {!partner && (
        <Link href="/">
          <span>
            <img className="pikajuegos logo" src="/images/logos/logo-pikajuegos.png" alt="" />
            {/* <img className="mobile logo" src="/images/logos/Logo pikajuegos y juancho.png" alt="" /> */}
          </span>
        </Link>
      )}

      {partner && (
        <Link href="/">
          <img src={`/images/partners/${partner}.png`} />
        </Link>
      )}

      <div className="content_buscador">
        <Autocomplete
          freeSolo
          className="input-buscador"
          id="free-solo-2-demo"
          disableClearable
          onChange={onTagsChange}
          options={top100Films.map((option) => option.title)}
          renderInput={(params, ind) => (
            <TextField {...params} key={ind} className="font-a buscador" label="Busca aquí tus productos" margin="normal" variant="outlined" InputProps={{ ...params.InputProps, type: "search" }} />
          )}
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
