import NavItem from './nav_item'
import { useTheme, List } from '@chakra-ui/react'

const NavList = ({ reverse = true, controls }) => {
    const theme = useTheme()
    return (
        <List>
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
        </List>
    )
}

export default NavList
