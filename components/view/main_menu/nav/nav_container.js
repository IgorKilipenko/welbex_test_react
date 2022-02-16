import { useTheme } from '@emotion/react'
import { memoStylesFactory, styleUtils } from '@Styles'

const stylesFactory = memoStylesFactory((theme) => {
    const { fullSize } = styleUtils
    const { bp } = theme
    return {
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            paddingBottom: '4rem',
            width: '100%',
            [bp.median]: {
                paddingBottom: '6rem',
            },
        },
    }
})

const NavContainer = ({ children }) => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    return (
        <nav
            css={styles.container}
            //className="flex flex-wrap w-full items-end justify-between pb-40 m:pb-60"
            {...{ children }}
        />
    )
}

export default NavContainer
