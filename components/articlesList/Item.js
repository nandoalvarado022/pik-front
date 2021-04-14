import React from "react"
import { motion } from "framer-motion"
import { Link, useHistory } from "react-router-dom"
import { items } from "./data"
import parse from 'html-react-parser'
import Router from 'next/router'

export function Item({ id }) {
  const item = items.find(item => item.id === id)
  const { category, title, description, image } = item ? item : {}

  return <>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }} transition={{ duration: 0.2, delay: 0.15 }} style={{ pointerEvents: "auto" }} className="overlay">
      <a onClick={() => Router.back()} />
    </motion.div>
    <div className="card-content-container open">
      <motion.div className="card-content" layoutId={`card-container-${id}`}>
        <motion.div className="card-image-container" layoutId={`card-image-container-${id}`}>
          <img className="card-image" src={image} alt="" />
        </motion.div>
        <motion.div className="title-container" layoutId={`title-container-${id}`}>
          <span className="category">{category}</span>
          <h2>{title}</h2>
        </motion.div>
        <motion.div className="content-container" animate>
          {description && parse(description)}
        </motion.div>
      </motion.div>
    </div>
  </>
}