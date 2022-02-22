import { AppBar, MenuOverlay } from '@Components/view'
import { Flex, useTheme } from '@chakra-ui/react'
import MainComponent from './main_component'

const Layout = ({ children }) => {
    return (
        <Flex fontSize={'md'} direction="column" align="flex-start" position="fixed" w='100%' h='100%'>
            <AppBar />
            <MenuOverlay />
            <MainComponent>{children}</MainComponent>
        </Flex>
    )
}

export default Layout
