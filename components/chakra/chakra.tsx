import {
    ChakraProvider,
    cookieStorageManager,
    localStorageManager,
    ChakraProviderProps,
} from '@chakra-ui/react'
import { customTheme } from '@Components/theme'
import { GetServerSideProps } from 'next'

interface ChakraProviderPropsWithCookies extends ChakraProviderProps {
    cookies?: string
}

export function Chakra({ cookies, children }: ChakraProviderPropsWithCookies) {
    const colorModeManager =
        typeof cookies === 'string'
            ? cookieStorageManager(cookies)
            : localStorageManager
    return (
        <ChakraProvider
            resetCSS
            theme={customTheme}
            colorModeManager={colorModeManager}>
            {children}
        </ChakraProvider>
    )
}

type ServerSideProps = GetServerSideProps<{ cookies: string }>

export const getServerSideProps: ServerSideProps = async ({ req }) => {
    return Promise.resolve({
        props: {
            cookies: req.headers.cookie ?? '',
        },
    })
}