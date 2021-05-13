import date from 'date-and-time'
import PortadaInterface from './PortadaInterface'
import { useState } from 'react';
import { useRouter } from 'next/router'
import 'date-and-time/locale/es'

date.locale('es');

function Portada({ category, feed: feedProps }) {
  const router = useRouter()
  const [feed, setFeed] = useState(feedProps)
  const popularyItem = feed && feed.reduce((prev, current) => {
    return prev.views > current.views ? prev : current
  }, [])

  const starItem = feed && feed.find((item) => item.id == 68)

  const handleLike = async (params = {}) => {
    const elemento = params.event.currentTarget
    const obj = {
      docID: elemento.getAttribute("doc_id"),
      tipo_coleccion: elemento.getAttribute("tipo_coleccion"),
      elemento
    }
  }

  return <PortadaInterface {...{ feed, category, handleLike, popularyItem, starItem }} />
}

export default Portada