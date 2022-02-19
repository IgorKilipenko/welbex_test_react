import { useState, useEffect, useCallback } from 'react'
import { useTheme } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Lines from './lines'
import { useDispatch, useSelector } from 'react-redux'
import { actions as storeActions } from '@Components/store'
import { useRouter } from 'next/router'

const stylesFactory = (theme) => {
    const { absoluteCenter, bgColorLight, bp, appBarHeight } = theme
    const width = appBarHeight //13

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
            /*[bp.median]: {
                width: `${width}rem`,
            },*/
        },
        lines: {
            ...absoluteCenter,
            width: `${width / 4}rem`,
            height: '100%',
            /*[bp.median]: {
                width: `${width / 2}rem`,
            },*/
        },
    }
}

const Button = (/*props*/) => {
    const dispatch = useDispatch()
    const { isOpened } = useSelector((state) => state.components.mainMenu)
    const [isHoverd, setHovered] = useState(false)
    const theme = useTheme()
    const router = useRouter()

    const { button: buttonStyles, lines: linesStyles } = stylesFactory(theme.oldTheme)

    const handleClick = useCallback((_, forceValue = null) => {
        dispatch(
            storeActions.components.setMainMenuState({
                isOpened: forceValue != null ? forceValue : !isOpened,
            })
        )
    },[dispatch, isOpened])

    const handleHover = (hovered) => {
        setHovered(hovered)
    }

    const handleAnimateion = (definition) => {
        if (definition == 'opened') {
            setHovered(false)
        }
    }

    useEffect(() => {
        const handleRouteChange = (url) => {
            handleClick(null, false)
        }

        router.events.on('routeChangeStart', handleRouteChange)
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [router.events, handleClick])

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
