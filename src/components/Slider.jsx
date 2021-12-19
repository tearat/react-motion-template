import { motion, useMotionValue, useTransform } from "framer-motion"

function Slider() {
  const x = useMotionValue(0)
  const background = useTransform(
    x,
    [-200, 0, 200],
    ["#e42e2e", "#666", "#74ec3c"]
  )
  return (
    <div className="component">
      <h1>Tinder</h1>
      <motion.div style={{ background }} className="slider">
        <span x={x} className="leftSpan">
          Nop
        </span>
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x }}
        >
          <span x={x} className="centerSpan">
            ???
          </span>
        </motion.div>
        <span x={x} className="rightSpan">
          Yis
        </span>
      </motion.div>
    </div>
  )
}

export default Slider
