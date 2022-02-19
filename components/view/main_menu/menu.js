import { motion, useAnimation } from 'framer-motion'
import { useMainMenuState } from '@Store'
import { useTheme } from '@chakra-ui/react'
import { memoStylesFactory, styleUtils } from '@Styles'
import { useEffect, useCallback, useRef } from 'react'
import NavContainer, { NavList } from './nav'
import variantKeys from './variant_keys'

const stylesFactory = memoStylesFactory((theme) => {
    const { bgColorDark, zIndex, bp } = theme
    return {
        container: {
            height: '100%',
            backgroundColor: bgColorDark(),
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            zIndex: zIndex.overlay,
            overflowY: 'scroll',
            /*[bp.median]: {
                overflow: 'hidden',
            },*/
        },
        get table() {
            const padding = 13
            return {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                ...styleUtils.fullSize,
                paddingLeft: `${padding / 2}rem`,
                paddingRight: `${padding / 2}rem`,
                /*[bp.median]: {
                    paddingLeft: `${padding}rem`,
                    paddingRight: `${padding}rem`,
                },*/
            }
        },
    }
})

const variants = {
    [variantKeys.show]: {
        get translateY() {
            return 0
        },
        opacity: 1,
        transition: {
            translateY: { ease: 'easeOut', duration: 0.4 },
            opacity: { duration: 0.2, delay: 0.2 },
        },
    },
    [variantKeys.hidden]: {
        get translateY() {
            return '-100%'
        },
        opacity: 0,
    },
    [variantKeys.exit]: {
        get translateY() {
            return '100%'
        },
        opacity: 0,
        transition: {
            translateY: { ease: 'easeIn', duration: 0.2, delay: 0.2 },
            opacity: { duration: 1 },
        },
    },
}

const MenuOverlay = (/*props*/) => {
    const isOpened = useMainMenuState('isOpened')
    const theme = useTheme()
    const styles = stylesFactory(theme.oldTheme)

    const menuControls = useAnimation()
    const navListControls = useAnimation()
    const isInitial = useRef(false)

    const sequence = useCallback(
        async (show) => {
            const sleep = (ms) =>
                new Promise((resolve) => setTimeout(resolve, ms))
            if (show) {
                menuControls.set(variantKeys.hidden)
                navListControls.start(variantKeys.hidden)
                const main = menuControls.start(variantKeys.show)
                await sleep(200)
                const nav = navListControls.start(variantKeys.show)
                await Promise.all([main, Promise.any([sleep(500), nav])])
            } else {
                await navListControls.start(variantKeys.exit)
                return await menuControls.start(variantKeys.exit)
            }
        },
        [menuControls, navListControls]
    )

    useEffect(() => {
        if (isInitial.current) {
            sequence(isOpened).catch(console.error)
        } else {
            isInitial.current = true
            menuControls.set(variantKeys.hidden)
            navListControls.set(variantKeys.hidden)
        }
    }, [sequence, isOpened, menuControls, navListControls])

    return (
        <motion.aside
            css={styles.container}
            variants={variants}
            animate={menuControls}>
            <div css={styles.table}>
                <NavContainer>
                    <NavList
                        reverse={false}
                        {...{ controls: navListControls }}
                    />
                </NavContainer>
            </div>
        </motion.aside>
    )
}

export default MenuOverlay
