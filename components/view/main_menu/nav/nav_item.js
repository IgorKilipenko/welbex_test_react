import { useTheme } from '@emotion/react'
import { memoStylesFactory } from '@Styles'
import { motion } from 'framer-motion'
import variantKeys from '../variant_keys'
import { useMemo } from 'react'

const stylesFactory = memoStylesFactory((theme) => {
    const { textColor, bp, fontMainSize } = theme
    const fontSize = fontMainSize
    return {
        container: {
            color: textColor(1),
        },
        animatedElement: {
            position: 'relative',
            display: 'flex',
            ...textColor,
            overflow: 'hidden',
            alignItems: 'center',
        },
        link: {
            overflow: 'hidden',
            display: 'block',
            lineHeight: 1.1,
            padding: '1rem 0',
            [bp.median]: {
                padding: '1.5rem 0',
            },
        },
        number: {
            opacity: 0.75,
            fontSize: `${fontSize / 2}rem`,
            width: `${fontSize}rem`,
            [bp.median]: {
                fontSize: `${fontSize}rem`,
                width: `${fontSize * 2}rem`,
            },
        },
        text: {
            fontSize: `${fontSize}rem`,
            [bp.median]: {
                fontSize: `${fontSize * 2}rem`,
            },
        },
    }
})

const variantsFactory = (reverse) => ({
    [variantKeys.show]: (delay) => {
        return {
            get translateY() {
                return 0
            },
            [reverse ? 'paddingTop' : 'paddingBottom']: '0rem',
            opacity: 1,
            transition: {
                translateY: {
                    ease: 'easeOut',
                    duration: 0.5,
                    delay: delay,
                },
                opacity: { duration: 0.8, delay: delay },
            },
        }
    },
    [variantKeys.hidden]: {
        get translateY() {
            return reverse ? '100%' : '-100%'
        },
        opacity: 0,
    },
    [variantKeys.exit]: {
        get translateY() {
            return reverse ? '-100%' : '100%'
        },
        paddingTop: '10rem',
        opacity: 0,
        transition: {
            translateY: { ease: 'easeIn', duration: 0.2, delay: 0.2 },
            opacity: { duration: 0.2 },
        },
    },
    get keys() {
        return variantKeys
    },
})

const NavItem = ({ number, text, itemIndex, reverse, controls }) => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    const delay = useMemo(() => 0 + itemIndex * 0.05, [itemIndex])
    const variants = useMemo(() => variantsFactory(reverse), [reverse])
    return (
        <li css={styles.container}>
            <a
                href=""
                css={styles.link}
                //className="group menu-link block leading-[1.1] overflow-hidden py-10 m:py-15 js-site-link"
            >
                <motion.div
                    animate={controls}
                    variants={variants}
                    initial={variants.keys.hidden}
                    //animate={variants.keys.show}
                    exit={variants.keys.exit}
                    custom={delay}
                    css={styles.animatedElement}
                    //className="flex items-center text-white js-menu-slide-up"
                >
                    <span
                        css={styles.number}
                        //className="text-16 w-[3.7rem] m:w-[7rem] opacity-75"
                    >
                        {number}
                    </span>
                    <span
                        css={styles.text}
                        //className="menu-link__underline text-f9 m:text-f4 font-serif group-hover:text-green-light before:bg-green-light"
                    >
                        {text}
                    </span>
                </motion.div>
            </a>
        </li>
    )
}

export default NavItem
