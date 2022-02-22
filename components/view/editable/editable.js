import { Box, Text } from '@chakra-ui/react'
import { useState, useEffect, useRef, useCallback } from 'react'
import InputComponent from './input'

const Editable = ({
    text,
    type = 'input',
    placeholder,
    onChange,
    fontSize = 'xl',
    cleanEdited = false,
}) => {
    const [isEditing, setEditing] = useState(false)
    const [value, setValue] = useState(text)
    const ref = useRef()
    useEffect(() => {
        if (ref && ref.current && isEditing === true) {
            ref.current.focus()
        }
    }, [isEditing, ref])

    const handleKeyDown = useCallback((event, type) => {
        const { key } = event
        const keys = ['Escape', 'Tab']
        const enterKey = 'Enter'
        const allKeys = [...keys, enterKey]
        if (
            (type === 'textarea' && keys.indexOf(key) > -1) ||
            (type !== 'textarea' && allKeys.indexOf(key) > -1)
        ) {
            setEditing(false)
        }
    }, [])

    useEffect(() => {
        if (cleanEdited) {
            setValue(text)
        }
    }, [text, cleanEdited])

    const handleValueChange = useCallback(
        (event, value) => {
            setValue(value)
            onChange(event, value)
        },
        [onChange]
    )

    const PlaceholdComponent = ({ pl = 4 }) => {
        return (
            <Text pl={pl} onClick={() => setEditing(true)}>
                {value || placeholder || ''}
            </Text>
        )
    }
    return (
        <Box as="section" fontSize={fontSize}>
            {isEditing ? (
                <InputComponent
                    ref={ref}
                    fontSize={fontSize}
                    pl={4}
                    size="md"
                    onChange={handleValueChange}
                    placeholder={placeholder}
                    value={value}
                    onBlur={() => setEditing(false)}
                    onKeyDown={(e) => handleKeyDown(e, type)}
                />
            ) : (
                <PlaceholdComponent pl={4} />
            )}
        </Box>
    )
}

export default Editable
