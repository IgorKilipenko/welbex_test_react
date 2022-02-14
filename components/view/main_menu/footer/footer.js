import { motion } from 'framer-motion'
import variantKeys from '../variant_keys'
import FooterList from './footer_list'
import { useMemo } from 'react'

const variants = {
    [variantKeys.show]: (delay) => {
        return {
            get translateY() {
                return 0
            },
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
}

const reverse = false
const Footer = ({ controls }) => {
    const delay = 0 //useMemo(() => 0.5 + itemIndex * 0.05, [itemIndex])
    const animation = useMemo(
        () => ({
            variants: variants,
            initial: variants.keys.hidden,
            //animate: variants.keys.show,
            animate: controls,
            exit: variants.keys.exit,
            custom: delay,
        }),
        [controls]
    )
    return (
        <motion.div className="flex text-white text-f15 w-full flex-wrap justify-between pb-40 m:pb-60">
            <div className="w-full h-[1px] relative bg-white bg-opacity-25 mb-40 m:mb-60 origin-left js-menu-scale" />
            <FooterList {...animation} />
            <motion.p {...animation} className="mt-30 m:mt-0 js-menu-up">
                <span className="opacity-50">
                    © 2021 Aston Currency Management
                </span>
            </motion.p>
        </motion.div>
    )
}

export default Footer
