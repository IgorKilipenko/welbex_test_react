import NavItem from './nav_item'
import { VStack, StackProps } from '@chakra-ui/react'
import { AnimationControls } from 'framer-motion'

export interface NavListProps extends StackProps {
    reverse: boolean
    controls: AnimationControls
    routes: string[]
}

const NavList = ({routes=['Home', 'Todo'], reverse = true, controls }: NavListProps) => {
    return (
        <VStack align={'left'} spacing={'2rem'}>
            {routes.map((text, i, arr) => {
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
        </VStack>
    )
}

export default NavList
