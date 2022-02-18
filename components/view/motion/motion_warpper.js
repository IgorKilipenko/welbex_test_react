import { motion } from "framer-motion"
import { forwardRef, createElement } from "react"

const motionWarpper = (component) => {
    const element = forwardRef((props, ref) => {
        return createElement(component, { ...props, ref }, null)
    })
    const name = component.displayName || component.name
    element.displayName = `MotionWarpper(${name})`
    return motion(element)
}

export default motionWarpper