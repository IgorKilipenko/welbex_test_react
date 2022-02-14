import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useComponentsSelector } from '@Components/store/reducers/componentsReducer'
import { useTheme } from '@emotion/react'
import { nanoid } from 'nanoid'
import { memoStylesFactory } from '@Styles'
import { useMemo, useEffect, useCallback } from 'react'
import NavContainer, { NavList } from './nav'
import Footer from './footer'
import variantKeys from './variant_keys'

const stylesFactory = memoStylesFactory((theme) => {
    //const { bgGreen } = theme.generalStyles
    //const { position, zIndex } = theme.generalStyles.utils
    return {
        container: {
            //width: '100%',
            height: '100%',
            //...bgGreen,
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            zIndex: 999,
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
    get keys() {
        return variantKeys
    },
}

const MenuOverlay = (/*props*/) => {
    const { isOpened } = useComponentsSelector('mainMenu')
    //const theme = useTheme()
    const styles = stylesFactory(/*theme*/)
    const itemKey = useMemo(() => {
        return isOpened ? nanoid() : ''
    }, [isOpened])

    const menuControls = useAnimation()
    const navListControls = useAnimation()
    const footerNavControls = useAnimation()

    const sequence = useCallback(async () => {
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
        const main = menuControls.start(variantKeys.show)
        await sleep(200)
        const nav = navListControls.start(variantKeys.show)
        await Promise.all([main, Promise.any([sleep(500), nav])])
        return await footerNavControls.start(variantKeys.show)
    }, [menuControls, navListControls, footerNavControls])

    useEffect(() => {
        isOpened && sequence().catch(console.error)
    }, [sequence, isOpened])

    return (
        <AnimatePresence initial={true}>
            {isOpened && (
                <motion.aside
                    //className="invisible fixed top-0 left-0 m:left-[13rem] right-0 h-full overflow-hidden z-[998] text-white js-menu"
                    key={'AsideComp' + itemKey}
                    css={styles.container}
                    variants={variants}
                    initial={variants.keys.hidden}
                    animate={variants.keys.show}
                    exit={variants.keys.exit}>
                    <div className="meny-scroll absolute inset-0 bg-green-dark overscroll-none overflow-y-scroll overflow-x-hidden m:overflow-hidden js-menu-inner">
                        <div className="relative m:absolute inset-0 flex flex-col m:justify-end pt-150 m:pt-0 px-30 m:px-130">
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
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    )
}

export default MenuOverlay
