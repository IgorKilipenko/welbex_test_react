import { WrappedImage } from '@Components/view'
import { useTransform, useMotionValue } from 'framer-motion'
import { useMeasure } from 'react-use'
import { useEffect } from 'react'
import { useMainComponentMousePosition } from '@Store'
import { useTransition } from 'hooks'
import { memoStylesFactory, styleUtils } from '@Styles'
import { useTheme } from '@emotion/react'

const stylesFactory = memoStylesFactory((theme) => {
    const { fullSize } = styleUtils
    return {
        container: {
            width: '100%',
            height: '100%',
            transform: 'scale(1.2)',
        },
        imageItem: {
            overflow: 'hidden',
            position: 'absolute',
            ...fullSize,
            top: '0',
            left: '0',
        },
    }
})

const ImageItem = ({ index, x, y, scale, src, itemCount }) => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    const translateX = useTransform(x, (val) => ((index + 1) / itemCount) * val)
    const translateY = useTransform(y, (val) => ((index + 1) / itemCount) * val)
    return (
        <WrappedImage
            src={src}
            alt=""
            objectFit={'cover'}
            layout={'fill'}
            aria-hidden={true}
            {...{ css: styles.imageItem }}
            style={{
                translateX: translateX,
                translateY: translateY,
                scale,
            }}
        />
    )
}

const ImageParallax = (props) => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    const { imagesSrc, ...restProps } = props
    const mouseState = useMainComponentMousePosition()
    const [ref, size] = useMeasure()
    const offset = ((size.height + size.height) / 2) * 0.025 || 15
    const dx = useMotionValue(0)
    const dy = useMotionValue(0)
    const translateX = useTransition(
        useTransform(dx, [0, size.width], [-offset, offset]),
        { duration: 2, ease: 'easeOut' }
    )
    const translateY = useTransition(
        useTransform(dy, [0, size.height], [-offset, offset]),
        { duration: 2, ease: 'easeOut' }
    )
    const scale = useTransition(useTransform(dy, [0, size.width], [1, 1.05]), {
        duration: 2,
        ease: 'easeOut',
    })

    useEffect(() => {
        if (dx.isAnimating() || dy.isAnimating()) {
            return
        }
        dx.set(mouseState.clientX, true)
        dy.set(mouseState.clientY, true)
    }, [mouseState, dx, dy])

    return (
        <div ref={ref} css={styles.container} {...restProps}>
            {imagesSrc.map((src, i, arr) => {
                return (
                    <ImageItem
                        key={i}
                        x={translateX}
                        y={translateY}
                        scale={scale}
                        index={i}
                        itemCount={arr.length}
                        src={src}
                    />
                )
            })}
        </div>
    )
}

export default ImageParallax
