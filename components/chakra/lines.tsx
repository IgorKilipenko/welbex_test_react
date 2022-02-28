import {
    Box,
    useStyleConfig,
    omitThemingProps,
    ResponsiveArray,
} from '@chakra-ui/react'

import type { HTMLChakraProps, ThemingProps } from '@chakra-ui/react'

export interface LineProps
    extends HTMLChakraProps<'div'>,
        ThemingProps<'VLine'> {
    spacing?:
        | string
        | number
        | boolean
        | (string & object)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        | ResponsiveArray<any>
        | object
}

const Line = ({ spacing, ...props }: LineProps) => {
    const {
        width,
        height,
        backgroundColor = 'blackAlpha.300',
        ...styles
    } = useStyleConfig('Line', props)
    const {
        className,
        orientation = 'horizontal',
        __css,
        ...rest
    } = omitThemingProps(props)

    const lineStyles = {
        vertical: {
            width: width ?? '1px',
            height: height ?? '100%',
        },
        horizontal: {
            height: width ?? '1px',
            width: height ?? '100%',
        },
    }

    const spacingStyles = {
        vertical: {
            width: spacing ?? lineStyles.vertical.width,
            height: height ?? '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        horizontal: {
            height: spacing ?? lineStyles.horizontal.height,
            width: height ?? '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
    }

    return (
        <Box __css={{ display: 'flex', ...spacingStyles[orientation] }}>
            <Box
                {...rest}
                __css={{
                    ...styles,
                    backgroundColor,
                    ...lineStyles[orientation],
                    ...__css,
                }}
                className={className}
            />
        </Box>
    )
}
const HLine = ({ spacing, ...props }: LineProps) => {
    const styles = useStyleConfig('HLine', props)
    return (
        <Line
            orientation="horizontal"
            spacing={spacing}
            __css={{ ...styles }}
        />
    )
}
const VLine = ({ spacing, ...props }: LineProps) => {
    const styles = useStyleConfig('VLine', props)
    return (
        <Line orientation="vertical" spacing={spacing} __css={{ ...styles }} />
    )
}

export interface LineProps
    extends HTMLChakraProps<'div'>,
        ThemingProps<'Line'> {
    orientation?: 'horizontal' | 'vertical'
}

export { Line, VLine, HLine }
