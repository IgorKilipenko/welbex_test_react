import { cssToArray } from '@Utils'
import { motion } from 'framer-motion'
import { useState } from 'react'

const ButtonBase = ({
    href,
    color = 'primary',
    children,
    css: overrideCss,
    onHoverStart,
    ...restProps
}) => {
    const [isHovered, setIsHovered] = useState()
    const handlerHoverd = (e, hover) => {
        setIsHovered(hover)
        if (onHoverStart != null && typeof onHoverStart == 'function') {
            onHoverStart(e)
        }
    }
    return (
        <motion.button
            onHoverStart={(e) => handlerHoverd(e, true)}
            onHoverEnd={(e) => handlerHoverd(e, false)}
            css={[...cssToArray(overrideCss)]}
            
            {...restProps}
            >
            {children}
        </motion.button>
    )
}

export default ButtonBase
