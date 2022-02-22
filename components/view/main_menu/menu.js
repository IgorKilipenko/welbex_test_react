import { useAnimation } from 'framer-motion'
import { useMainMenuState } from '@Store'
import { Flex } from '@chakra-ui/react'
import { useEffect, useCallback, useRef } from 'react'
import NavContainer, { NavList } from './nav'
import variantKeys from './variant_keys'
import { MotionBox } from '../motion'



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
        <MotionBox
            as="aside"
            overflowY={['auto', 'hidden']}
            position='absolute'
            bg={'green.900'}
            top={0}
            left={0}
            w='100%'
            h='100%'
            zIndex={'overlay'}
            variants={variants}
            animate={menuControls}>
            <Flex
                direction="column"
                justify="center"
                pl={[5, 10]}
                pr={[5, 10]}
                w='100%'
                h='100%'
            >
                <NavContainer>
                    <NavList
                        reverse={false}
                        {...{ controls: navListControls }}
                    />
                </NavContainer>
            </Flex>
        </MotionBox>
    )
}

export default MenuOverlay
