import date from 'date-and-time'
import PortadaInterface from './PortadaInterface'
import { useState } from 'react';
import { useRouter } from 'next/router'
import 'date-and-time/locale/es'
import { useEffect } from 'react';

date.locale('es');

function Portada({ category, feed }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
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

  useEffect(() => {
    setTimeout(() => {
      sessionStorage.setItem("hasFirstHome", true)
    }, 1000);
  }, [])

  return <PortadaInterface {...{ feed, category, handleLike, open, popularyItem, starItem }} />
}

export default Portada