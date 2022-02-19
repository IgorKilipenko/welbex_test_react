import { useTheme } from '@chakra-ui/react'
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
    return (
        <nav
            css={styles.container}
            {...{ children }}
        />
    )
}

export default NavContainer
