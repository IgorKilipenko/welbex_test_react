import { motion, useAnimation } from 'framer-motion'
import { useMainMenuState } from '@Components/store/reducers/componentsReducer'
import { useTheme } from '@emotion/react'
import { memoStylesFactory, styleUtils } from '@Styles'
import { useEffect, useCallback, useRef } from 'react'
import NavContainer, { NavList } from './nav'
import Footer from './footer'
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
            [bp.median]: {
                overflow: 'hidden',
            },
        },
        get table() {
            const padding = 13
            return {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                ...styleUtils.fullSize,
                paddingLeft: `${padding / 2}rem`,
                paddingRight: `${padding / 2}rem`,
                [bp.median]: {
                    paddingLeft: `${padding}rem`,
                    paddingRight: `${padding}rem`,
                },
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
    const styles = stylesFactory(theme)

    const menuControls = useAnimation()
    const navListControls = useAnimation()
    const footerNavControls = useAnimation()
    const isInitial = useRef(false)

    const sequence = useCallback(
        async (show) => {
            const sleep = (ms) =>
                new Promise((resolve) => setTimeout(resolve, ms))
            if (show) {
                menuControls.set(variantKeys.hidden)
                const main = menuControls.start(variantKeys.show)
                await sleep(200)
                const nav = navListControls.start(variantKeys.show)
                await Promise.all([main, Promise.any([sleep(500), nav])])
                return await footerNavControls.start(variantKeys.show)
            } else {
                return await menuControls.start(variantKeys.exit)
            }
        },
        [menuControls, navListControls, footerNavControls]
    )

    useEffect(() => {
        if (isInitial.current) {
            sequence(isOpened).catch(console.error)
        } else {
            isInitial.current = true
            menuControls.set(variantKeys.hidden)
        }
    }, [sequence, isOpened, menuControls])

    return (
        <motion.aside
            css={styles.container}
            variants={variants}
            animate={menuControls}>
            <div
                css={styles.table}
                //className="relative m:absolute inset-0 flex flex-col m:justify-end pt-150 m:pt-0 px-30 m:px-130"
            >
                <NavContainer>
                    <NavList
                        reverse={false}
                        {...{ controls: navListControls }}
                    />
                </NavContainer>
                <Footer
                    {...{
                        controls: footerNavControls,
                    }}
                />
            </div>
        </motion.aside>
    )
}

export default MenuOverlay
