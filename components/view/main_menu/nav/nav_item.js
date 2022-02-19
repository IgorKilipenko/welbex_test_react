import {
    useTheme,
    ListItem,
    Box,
    Link,
    HStack,
    VStack,
    Text,
    Heading,
} from '@chakra-ui/react'
import { memoStylesFactory } from '@Styles'
import { motion } from 'framer-motion'
import variantKeys from '../variant_keys'
import { useMemo } from 'react'
import { useRouter } from 'next/router'

const stylesFactory = memoStylesFactory((theme) => {
    const { textColor, bp, fontMainSize } = theme
    const fontSize = fontMainSize
    return {
        /*container: {
            color: textColor(1),
        },*/
        animatedElement: {
            position: 'relative',
            display: 'flex',
            ...textColor,
            overflow: 'hidden',
            alignItems: 'center',
        },
        ____link: {
            /**position: 'relative',
            overflow: 'hidden',
            display: 'block',
            lineHeight: 1.1,
            padding: '1rem 0',**/
            /*[bp.median]: {
                padding: '1.5rem 0',
            },*/
        },
        number: {
            position: 'relative',
            opacity: 0.75,
            fontSize: `${fontSize / 2}rem`,
            width: `${fontSize}rem`,
            /*[bp.median]: {
                fontSize: `${fontSize}rem`,
                width: `${fontSize * 2}rem`,
            },*/
        },
        ____text: {
            position: 'relative',
            fontSize: `${fontSize}rem`,
            cursor: 'pointer',
            display: 'inline-block',
            /**[bp.median]: {
                fontSize: `${fontSize * 2}rem`,
            },*/
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
                transition: 'all .75s cubic-bezier(0.165, 0.84, 0.44, 1)',
            },
            '&:hover::after': {
                transform: 'scaleX(1)',
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
        paddingTop: 0,
        paddingBottom: 0,
        get translateY() {
            return reverse ? '100%' : '-100%'
        },
        opacity: 0,
    },
    [variantKeys.exit]: {
        get translateY() {
            return reverse ? '-100%' : '100%'
        },
        [reverse ? 'paddingTop' : 'paddingBottom']: '10rem',
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
}) => {
    const theme = useTheme()
    const styles = stylesFactory(theme.oldTheme)
    const delay = useMemo(() => 0 + itemIndex * 0.05, [itemIndex])
    const variants = useMemo(() => variantsFactory(reverse), [reverse])
    const router = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        router.push(href, undefined, {
            shallow: false,
        })
    }

    return (
        <ListItem /*css={styles.container}*/ color={'gray.50'}>
            <Box>
                <motion.div
                    onClick={(e) => handleClick(e)}
                    animate={controls}
                    variants={variants}
                    custom={delay}
                    css={styles.animatedElement}>
                    <HStack space={2}>
                        <Text fontSize={'md'} /*css={styles.number}*/>
                            {number}
                        </Text>
                        <Link>
                            <Heading size={'2xl'} /*css={styles.text}*/>
                                {text}
                            </Heading>
                        </Link>
                    </HStack>
                </motion.div>
            </Box>
        </ListItem>
    )
}

export default NavItem
