import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import React, { useEffect, useState } from "react"
import { Item } from "./Item"
import { List } from "./List"
import { BrowserRouter as Router, Route } from "react-router-dom"

function Store({ match }) {
  let { id } = match.params;
  const [isLoadedpPage, setIsLoadedPage] = useState(false)

  useEffect(() => {
    setIsLoadedPage(true)
  }, [])

  return <div>
    <List selectedId={id} />
    <AnimatePresence>
      {id && isLoadedpPage && <Item id={id} key="item" />}
    </AnimatePresence>
  </div>
}

const ArticlesList = () => {
  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => setIsDocumentLoaded(true), 500);
  }, [])

  return <div className="container" id="ArticlesList">
    {isDocumentLoaded && <AnimateSharedLayout type="crossfade">
      <Router>
        <Route path={["/article/:id", "/"]} component={Store} />
      </Router>
    </AnimateSharedLayout>
    }
  </div>
}

export default ArticlesList