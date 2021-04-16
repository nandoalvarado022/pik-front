import WrapperConsumer from "../store"
import React, { useEffect, useState } from "react"
import HeaderInterface from "./HeaderInterface"

const Header = (props) => {
  const [active, setActive] = useState(false)

  const validateScroll = (event) => {
    let scroll = window.scrollY
    if (scroll > 100) setActive(true) // document.querySelector("#view_Header").classList.add('active');
    else setActive(false) // document.querySelector("#view_Header").classList.remove('active');
  }

  const checkScroll = () => {
    window.addEventListener("scroll", validateScroll)
  }

  useEffect(() => {
    checkScroll()
    return () => removeEventListener("scroll", validateScroll)
  }, [])

  return <HeaderInterface {...{ active }} />
}

export default Header
