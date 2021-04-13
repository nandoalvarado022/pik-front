import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import React from "react"
import { Item } from "./Item"
import { List } from "./List"
import { BrowserRouter as Router, Route } from "react-router-dom"

function Store({ match }) {
  let { id } = match.params;
  const imageHasLoaded = true;

  return <div>
    <List selectedId={id} />
    <AnimatePresence>
      {id && imageHasLoaded && <Item id={id} key="item" />}
    </AnimatePresence>
  </div>
}

const ArticlesList = () => {
  return <div className="container" id="ArticlesList">
    <AnimateSharedLayout type="crossfade">
      <Router>
        <Route path={["/:id", "/"]} component={Store} />
      </Router>
    </AnimateSharedLayout>
  </div>
}
export default ArticlesList