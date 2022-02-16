import NavItem from './nav_item'
import { useTheme } from '@emotion/react'
import { memoStylesFactory } from '@Styles'

const stylesFactory = memoStylesFactory((theme) => {
    const { bp } = theme
    return {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            [bp.median]: {
                width: 'auto',
            },
        },
    }
})

const NavList = ({ reverse = true, controls }) => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    return (
        <ul css={styles.container}>
            {['Home', 'Todo'].map((text, i, arr) => {
                return (
                    <NavItem
                        key={i}
                        controls={controls}
                        itemIndex={reverse ? arr.length - i - 1 : i}
                        href={`/${text.replace(/home/i, '').toLowerCase()}`}
                        reverse={reverse}
                        number={`${(i + 1).toString().padStart(2, '0')}`}
                        text={text}
                    />
                )
            })}
        </ul>
    )
}

export default NavList
