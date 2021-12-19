import { motion } from "framer-motion"
import { useState } from "react"
import icecreamImage from "../assets/images/icecream.png"
import lemonImage from "../assets/images/lemon.png"
import tomatoImage from "../assets/images/tomato.png"

function Fader() {
  const [cardState, setCardState] = useState({
    icecream: {
      enabled: false,
      title: "Icecream",
      price: 10,
      image: icecreamImage,
    },
    lemon: {
      enabled: false,
      title: "Lemon",
      price: 20,
      image: lemonImage,
    },
    tomato: {
      enabled: false,
      title: "Tomato",
      price: 900,
      image: tomatoImage,
    },
  })
  const widthFade = {
    open: { opacity: 1, width: "calc(100% - 20px)" },
    closed: { opacity: 0, width: 0, padding: 0, margin: 0, height: 0 },
  }
  const fade = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  }

  const ordersInBasket = Object.entries(cardState).filter(
    ([key, params]) => params.enabled
  )
  const ordersInBasketCount = ordersInBasket.length

  const totalPrice = ordersInBasket.reduce(
    (accumulator, [key, params]) => accumulator + params.price,
    0
  )

  const pay = () => {
    const droppedState = Object.entries(cardState).map(([key, params]) => ({
      ...params,
      enabled: false,
    }))
    setCardState({ ...droppedState })
  }

  return (
    <div className="component fader">
      <h1>Fader</h1>
      <div className="items">
        {Object.entries(cardState).map(([type, params]) => (
          <div
            className="item"
            onClick={() =>
              setCardState({
                ...cardState,
                [type]: {
                  ...params,
                  enabled: !params.enabled,
                },
              })
            }
          >
            <img src={params.image} alt="" />
            <span className="item-title">{params.title}</span>
            <span className="item-price">${params.price}</span>
          </div>
        ))}
      </div>

      <motion.div
        className="order-box"
        animate={ordersInBasketCount ? "open" : "closed"}
        variants={fade}
      >
        <h1>Order ({ordersInBasketCount} items):</h1>
        <div className="orders">
          {Object.entries(cardState).map(([type, params]) => (
            <motion.div
              animate={params.enabled ? "open" : "closed"}
              variants={widthFade}
              className="order"
              transition={{ type: "tween" }}
            >
              <span className="order-title">{params.title}</span>
              <span className="order-price">${params.price}</span>
            </motion.div>
          ))}
        </div>
        <div class="total">
          <div class="total-button" onClick={pay}>
            PAY
          </div>
          <span class="total-price">${totalPrice}</span>
        </div>
      </motion.div>
    </div>
  )
}

export default Fader
