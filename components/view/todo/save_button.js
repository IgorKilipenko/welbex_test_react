import { IconButton, ButtonGroup, Button, Icon } from '@chakra-ui/react'
import { FaSave, FaWindowClose } from 'react-icons/fa'

const CloseIcon = () => {
    return <Icon as={FaWindowClose} color="red.500" />
}

const SaveButton = ({
    size = 'md',
    fontSize = '2xl',
    onSave = null,
    onCancel = null,
}) => {
    return (
        <ButtonGroup
            isAttached
            variant="outline">
            <IconButton
                variant="outline"
                colorScheme="green"
                aria-label="Save"
                icon={<FaSave />}
                size={size}
                fontSize={fontSize}
                onClick={(e) => {
                    e.preventDefault()
                    onSave && onSave(e)
                }}>
                Save
            </IconButton>
            <IconButton
                variant="outline"
                colorScheme="green"
                aria-label="Cancle"
                icon={<CloseIcon />}
                size={size}
                fontSize={fontSize}
                onClick={(e) => {
                    e.preventDefault()
                    onCancel && onCancel(e)
                }}
            />
        </ButtonGroup>
    )
}

export default SaveButton
