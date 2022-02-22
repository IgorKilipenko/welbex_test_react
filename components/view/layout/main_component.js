import { Box } from '@chakra-ui/react'
import { actions as storeActions, useMainComponentMousePosition } from '@Store'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'

const MainComponent = ({ children }) => {
    const mousePosition = useMainComponentMousePosition()
    const dispatch = useDispatch()
    const timer = useRef(0)

    const hadleMouseMove = (e) => {
        const now = Date.now()
        if (now - timer.current < 100) {
            return
        }

        const { clientX, clientY } = e

        if (
            Math.pow(
                Math.pow(clientX - mousePosition.clientX, 2) +
                    Math.pow(clientY - mousePosition.clientY, 2),
                0.5
            ) < 5
        ) {
            return
        }

        dispatch(
            storeActions.components.setMainComponentMousePosition({
                clientX,
                clientY,
            })
        )

        timer.current = now
    }

    const handleHover = (hovered) => {
        dispatch(
            storeActions.components.setMainComponentMousePosition({
                hovered,
            })
        )
    }
    return (
        <Box
            as="main"
            position="absolute"
            overflow={"hidden"}
            w='100%'
            h='100%'
            onMouseMove={(e) => hadleMouseMove(e)}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(true)}>
            {children}
        </Box>
    )
}

export default MainComponent