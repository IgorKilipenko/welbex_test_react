import { cssToArray } from '@Utils'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '@chakra-ui/react'
import { memoStylesFactory } from '@Styles'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const stylesFactory = memoStylesFactory((theme) => {
    const { fontMainSize, bp } = theme
    const fontSize = fontMainSize * 0.5
    return {
        container: {
            position: 'relative',
            fontSize: `${fontSize / 2}rem`,
            /*[bp.median]: {
                fontSize: `${fontSize * 1.5}rem`,
            },*/
        },
        overlay: {
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'transparent',
        },
    }
})

const ButtonBase = ({
    href,
    color = 'primary',
    onClick,
    children,
    css: overrideCss,
    onHoverStart,
    ...restProps
}) => {
    const theme = useTheme()
    const styles = stylesFactory(theme.oldTheme)
    const router = useRouter()
    const [isHovered, setHovered] = useState(false)
    const animate = {
        boxShadow: isHovered
            ? '0 1px 4px rgba(0, 0, 0, .6)'
            : theme.boxShadow(false),
    }
    const animateOverlay = {
        backgroundColor: isHovered
            ? theme.textColorDark(0.1)
            : theme.textColorDark(0.05),
        transition: { duration: 0 },
    }
    const handlerHoverd = (e, hover) => {
        setHovered(hover)
        if (onHoverStart != null && typeof onHoverStart == 'function') {
            onHoverStart(e)
        }
    }
    return (
        <motion.button
            type="button"
            onHoverStart={(e) => handlerHoverd(e, true)}
            onHoverEnd={(e) => handlerHoverd(e, false)}
            css={[styles.container, ...cssToArray(overrideCss)]}
            onClick={(e) => {
                e.preventDefault()
                if (onClick != null && typeof onClick == 'function') {
                    onClick(e)
                }
                if (href != null) {
                    router.push(href, undefined, {
                        shallow: true,
                    })
                }
            }}
            animate={animate}
            transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
            {...restProps}>
            {
                <>
                    <motion.div
                        animate={animateOverlay}
                        css={styles.overlay}></motion.div>
                    {children}
                </>
            }
        </motion.button>
    )
}

export default ButtonBase
