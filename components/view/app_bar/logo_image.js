import { useTheme } from '@chakra-ui/react'
import { memoStylesFactory, styleUtils } from '@Styles'

const cssToArray = (css) => {
    if (css == null || Array.isArray(css)) {
        return css == null ? [] : css
    }
    return [css]
}

const stylesFactory = memoStylesFactory((theme) => {
    const { fullSize } = styleUtils
    const { textColor } = theme
    return {
        container: {
            ...fullSize,
        },
        svg: {
            fill: 'none',
            stroke: textColor(),
            strokeWidth: 2,
            strokeLinejoin: 'round',
            strokeMiterlimit: 10,
            ...fullSize,
        },
    }
})

const LogoImage = ({ stroke, css: overrideCss, ...resetProps }) => {
    const theme = useTheme()
    const styles = stylesFactory(theme.oldTheme)
    return (
        <div
            css={[...cssToArray(styles.container), ...cssToArray(overrideCss)]}
            {...resetProps}>
            <svg css={[styles.svg, stroke]} viewBox="0 0 56 64">
                <g>
                    <path d="M16,33h16   c6.6,0,12-5.4,12-12v-8c0-6.6-5.4-12-12-12H19H9L1,56h12L16,33z" />
                    <path d="M13,56l-1,7h13l3-23h15   c6.6,0,12-5.4,12-12v-8c0-6.6-5.4-12-12-12H30H19l-3,25" />
                </g>
            </svg>
        </div>
    )
}

export default LogoImage
