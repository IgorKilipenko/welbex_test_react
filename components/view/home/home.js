import { useTheme } from '@chakra-ui/react'
import { memoStylesFactory, styleUtils } from '@Styles'
import { ImageParallax } from '@Components/view'
import TextContent from './text_content'

const stylesFactory = memoStylesFactory((theme) => {
    const { bp, fontHeaderSize, fontMainSize } = theme
    const {fullSize} = styleUtils
    return {
        container: {
            position: 'relative',
            ...fullSize,
            display: 'flex',
        },
        contentContainer: {
            position: 'absolute',
            ...fullSize,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            padding: '3rem',
            [bp.median.cssTag]: {
                padding: '8rem',
            },
        },
    }
})

const HomeComponent = () => {
    const theme = useTheme()
    const styles = stylesFactory(theme.oldTheme)
    return (
        <div
        css={styles.container}>
        <ImageParallax
            imagesSrc={[
                '/images/hero-parallax-3.jpg',
                '/images/hero-parallax-2.png',
                '/images/hero-parallax-1.png',
            ]}
        />
        <TextContent styles={styles} />
    </div>
    )
}

export default HomeComponent
