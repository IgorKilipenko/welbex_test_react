import { Flex } from '@chakra-ui/react'

const NavContainer = ({ children }) => {
    return (
        <Flex
            position="relative"
            direction="row"
            align="flex-end"
            wrap="wrap"
            justify="space-between"
            w="100%"
            as={'nav'}
            color={'gray.50'}>
            {children}
        </Flex>
    )
}

export default NavContainer
