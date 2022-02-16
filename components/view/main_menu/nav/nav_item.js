import { useTheme } from '@emotion/react'
import { memoStylesFactory } from '@Styles'
import { motion } from 'framer-motion'
import variantKeys from '../variant_keys'
import { useMemo } from 'react'
import Link from 'next/link'

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
            position: 'relative',
            opacity: 0.75,
            fontSize: `${fontSize / 2}rem`,
            width: `${fontSize}rem`,
            [bp.median]: {
                fontSize: `${fontSize}rem`,
                width: `${fontSize * 2}rem`,
            },
        },
        text: {
            position: 'relative',
            fontSize: `${fontSize}rem`,
            cursor: 'pointer',
            [bp.median]: {
                fontSize: `${fontSize * 2}rem`,
            },
            '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '100%',
                minHeight: '1px',
                height: '.05em',
                transformOrigin: 'center',
                transform: 'scaleX(0)',
                backgroundColor: 'rgba(155, 227, 191, 1)',
                transition: 'all .75s cubic-bezier(0.165, 0.84, 0.44, 1)'
            },
            '&:hover': {
                '&::after': {
                    transform: 'scaleX(100%)',
                },
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

const NavItem = ({
    number,
    text,
    itemIndex,
    reverse,
    controls,
    href = '/',
    handleClick,
}) => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    const delay = useMemo(() => 0 + itemIndex * 0.05, [itemIndex])
    const variants = useMemo(() => variantsFactory(reverse), [reverse])
    return (
        <li css={styles.container}>
            <Link
                onClick={() => handleClick()}
                href={href}
                passHref
                css={styles.link}>
                <motion.div
                    animate={controls}
                    variants={variants}
                    initial={variants.keys.hidden}
                    exit={variants.keys.exit}
                    custom={delay}
                    css={styles.animatedElement}>
                    <span css={styles.number}>{number}</span>
                    <span css={styles.text}>{text}</span>
                </motion.div>
            </Link>
        </li>
    )
}

export default NavItem
