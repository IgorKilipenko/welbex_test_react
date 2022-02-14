import Image from 'next/image'
import { motion } from 'framer-motion'
import { memoStylesFactory, styleUtils } from '@Styles'
import { useTheme } from '@emotion/react'


const stylesFactory = memoStylesFactory((theme) => {
    return {
        relativeImageContainer: {
            position: 'relative',
            ...styleUtils.fullSize
        },
    }
})

const WrappedImage = (props) => {
    const {
        width = '100%',
        height = '100%',
        layout,
        src,
        alt = '',
        className,
        css,
        style,
        ...rest
    } = props

    const theme = useTheme()
    const styles = stylesFactory(theme)

    return (
        <motion.div style={style} {...{ className, css }}>
            <div css={styles.relativeImageContainer}>
                <Image
                    {...{
                        ...(!layout && { width, height }),
                        layout,
                        src,
                        alt,
                        ...rest,
                    }}
                />
            </div>
        </motion.div>
    )
}

export { WrappedImage }
