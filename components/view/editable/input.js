import { Input } from '@chakra-ui/react'
import { forwardRef } from 'react'

const InputComponent = forwardRef(
    ({ value, placeholder, fontSize, pl=4 ,onChange, onBlur, onKeyDown }, ref) => {
        return (
            <Input
                ref={ref}
                fontSize={fontSize}
                pl={pl}
                size="md"
                onChange={(e) => onChange(e, e.target.value)}
                placeholder={placeholder}
                value={value}
                onBlur={(e) => onBlur(e)}
                onKeyDown={(e) => onKeyDown(e)}
            />
        )
    }
)

InputComponent.displayName = 'InputComponent'

export default InputComponent
