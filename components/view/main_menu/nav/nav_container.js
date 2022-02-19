import { Box, Flex, useTheme } from '@chakra-ui/react'
import { memoStylesFactory } from '@Styles'

const stylesFactory = memoStylesFactory((theme) => {
    const { bp } = theme
    return {
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            paddingBottom: '4rem',
            width: '100%',
            /*[bp.median]: {
                paddingBottom: '30rem',
            },*/
        },
    }
})

const NavContainer = ({ children }) => {
    const theme = useTheme()
    const styles = stylesFactory(theme.oldTheme)
    return <Flex direction="row" style={styles.container} align="end" wrap='wrap' justify='space-between' h='100vh' as={'nav'} color={'gray.50'} /*css={styles.container}*/ {...{ children }} />
}

export default NavContainer
