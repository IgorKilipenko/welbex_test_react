import { IconButton, Icon } from '@chakra-ui/react'
import { FaTrash } from 'react-icons/fa'

const TrashIcon = () => {
    return <Icon as={FaTrash} color="red.500" />
}

const TrashButton = ({ onClick=null }) => {
    return (
        <IconButton
            variant="outline"
            colorScheme="green"
            aria-label="Delete"
            fontSize={'2xl'}
            icon={<TrashIcon />}
            size="md"
            onClick={(e) => {
                e.preventDefault()
                onClick && onClick(e)
            }}
        />
    )
}

export default TrashButton
