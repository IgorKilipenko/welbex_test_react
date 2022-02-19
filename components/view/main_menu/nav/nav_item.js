import {
    useTheme,
    ListItem,
    Box,
    Link,
    HStack,
    VStack,
    Text,
    Heading,
    useBreakpointValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import variantKeys from '../variant_keys'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { MotionBox } from '@Components/view/motion'


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
        //[reverse ? 'paddingTop' : 'paddingBottom']: '10rem',
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
        <MotionBox
            onClick={(e) => handleClick(e)}
            animate={controls}
            variants={variants}
            custom={delay}
            >
            <HStack space={2}>
                <Text fontSize={'md'}>{number}</Text>
                <Link>
                    <Heading size={'2xl'}>{text}</Heading>
                </Link>
            </HStack>
        </MotionBox>
    )
}

export default NavItem
