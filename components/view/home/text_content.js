import { memoStylesFactory, styleUtils } from '@Styles'
import { useTheme } from '@chakra-ui/react'

const stylesFactory = memoStylesFactory((theme) => {
    const { fullSize } = styleUtils
    const { textColor, bp, fontHeaderSize } = theme
    const fontSize = fontHeaderSize
    return {
        container: {
            position: 'absolute',
            ...fullSize,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            padding: '3rem',
            /*[bp.median]: {
                padding: '8rem',
            },*/
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
        },
        h1: {
            display: 'block',
            color: textColor(),
            textAlign: 'start',
            fontFamily: 'domaine',
            fontSize: `${fontSize / 2}rem`,
            lineHeight: 1.1,
            /*[bp.median]: {
                fontSize: `${fontSize}rem`,
            },*/
        },
        get h2() {
            return {
                fontSize: `${fontSize/4}rem`,
                /*[bp.median]: {
                    fontSize: `${fontSize/2}rem`,
                },*/
            }
        },
    }
})

const TextContent = () => {
    const theme = useTheme()
    const styles = stylesFactory(theme.oldTheme)
    return (
        <div css={styles.container}>
            <div css={styles.content}>
                <div css={styles.h1}>
                    <div>Тестовое задание React</div>
                    <div css={styles.h2}>выполнил: Килипенко Игорь</div>
                </div>
                {/* <div css={styles.scrollText}>Scroll to explore</div> */}
            </div>
        </div>
    )
}

export default TextContent
