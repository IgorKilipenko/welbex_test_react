import { Box, Flex } from '@chakra-ui/react'
import Head from 'next/head'
import HomeComponent from '@Components/view/home'

const HomePage = (/*props*/) => {
    return (
        <>
            <Head>
                <title>HOME | To Do</title>
            </Head>

            <Flex direction="row" justify="center" w='100%' h='100%'>
                <HomeComponent />
                <Box></Box>
            </Flex>
        </>
    )
}

export { HomePage as default }
