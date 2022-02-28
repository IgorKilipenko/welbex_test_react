import Editable from '@Components/view/editable'
import { Text } from '@chakra-ui/react'

const TodoData = ({ items, cleanEdited, onChange = null }) => {
    return items.reduce((res, [name, value], i) => {
        res.push(
            <Text
                key={`name_${i}`}
                position="relative"
                fontSize={['xl', 'lg']}
                pr={[1, 3]}
                _after={{
                    content: '""',
                    position: 'absolute',
                    h: '100%',
                    top: 0,
                    right: 0,
                    w: '1px',
                    bg: 'gray.500',
                    opacity: 0.25,
                }}>
                {`${name}:`}
            </Text>
        )
        res.push(
            <Editable
                key={`value_${i}`}
                text={`${value}`}
                placeholder={`${value}`}
                fontSize={['lg', 'xl']}
                size="md"
                type="input"
                cleanEdited={cleanEdited}
                onChange={(e) =>
                    onChange && onChange(e, name, e.target.value)
                }></Editable>
        )
        return res
    }, [])
}

export default TodoData
