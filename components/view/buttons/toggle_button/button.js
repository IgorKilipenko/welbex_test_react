import { useState } from 'react'
import { useTheme } from '@emotion/react'
import { motion } from 'framer-motion'
import Lines from './lines'
import { useDispatch, useSelector } from 'react-redux'
import { actions as storeActions } from '@Components/store'

const stylesFactory = (theme) => {
    const width = 13
    const { absoluteCenter, bgColor, bgColorLight } = theme
    return {
        button: {
            position: 'relative',
            pointerEvents: 'auto',
            zIndex: 2,
            backgroundColor: bgColorLight(),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: `${width / 2}rem`,
            height: '100%',
            '@media (min-width: 769px)': {
                width: `${width}rem`,
            },
        },
        lines: {
            ...absoluteCenter,
            width: '4rem',
            height: '100%',
            '@media (min-width: 769px)': {
                width: '7rem',
            },
        },
        //bgColor,
    }
}

const Button = (/*props*/) => {
    const dispatch = useDispatch()
    const { isOpened } = useSelector((state) => state.components.mainMenu)
    const [isHoverd, setHovered] = useState(false)
    const theme = useTheme()

    const { button: buttonStyles, lines: linesStyles } = stylesFactory(theme)

    const handleClick = () => {
        dispatch(
            storeActions.components.setMainMenuState({
                isOpened: isOpened ? false : true,
            })
        )
    }

    const handleHover = (hovered) => {
        setHovered(hovered)
    }

    const handleAnimateion = (definition) => {
        if (definition == 'opened') {
            setHovered(false)
        }
    }

    return (
        <motion.button
            type="button"
            initial={false}
            animate={isOpened ? 'opened' : isHoverd ? 'hovered' : 'closed'}
            css={buttonStyles}
            onHoverStart={() => handleHover(!isOpened && true)}
            onHoverEnd={() => handleHover(false)}
            onClick={(e) => handleClick(e)}
            onAnimationComplete={(definition) => handleAnimateion(definition)}>
            <Lines css={linesStyles} />
        </motion.button>
    )
}

export default Button
