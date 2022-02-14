import { motion } from 'framer-motion'

const styles = {
    svgLine: {
        strokeWidth: 1.5,
        strokeLinecap: 'round',
        fill: 'transparent',
        vectorEffect: 'non-scaling-stroke',
        alignmentBaseline: 'central',
    },
}

const size = {
    scale: 1.5,
    width: 100,
    height: 80,
    get viewBox() {
        return [
            (-this.width * this.scale) / 2,
            (-this.height * this.scale) / 2,
            this.width * this.scale,
            this.height * this.scale,
        ]
    },
}

const Path = ({ color, ...props }) => {
    return (
        <motion.line
            x1={-size.width / 2}
            y1="0"
            x2={size.width / 2}
            y2="0"
            origin={[0, 0, 0]}
            stroke={color}
            {...props}
        />
    )
}

const Lines = (props) => {
    const { color = 'hsl(0, 0%, 18%)', ...restProps } = props
    //* const springs = { type: 'spring', stiffness: 700, damping: 30, duration: 2 }
    const line = (mode = 'center', translateVal = size.height / 2.5) => {
        console.assert(
            ['top', 'bottom', 'center'].reduce((res, v) => {
                if (v.match(RegExp(`^${mode}$`, 'ig'))) {
                    res = true
                }
                return res
            }, false),
            `Mode must be in values ['top', 'bottom', 'center'], mode = ${mode}`
        )
        return {
            css: styles.svgLine,
            get variants() {
                return {
                    closed: {
                        ...(['top', 'bottom'].includes(mode) && {
                            get translateY() {
                                return mode == 'top'
                                    ? -translateVal
                                    : translateVal
                            },
                        }),
                        ...(mode == 'center' && {
                            pathLength: 1,
                            opacity: 1,
                            transition: {
                                opacity: { delay: 0, duration: 0.1 },
                            },
                        }),
                    },
                    opened: {
                        ...(['top', 'bottom'].includes(mode) && {
                            translateY: 0,
                            get rotate() {
                                return mode == 'top' ? -45 : 45
                            },
                        }),
                        ...(mode == 'center' && {
                            pathLength: 0,
                            opacity: 0,
                            transition: {
                                opacity: { delay: 0.1, duration: 0.1 },
                                default: { duration: 0.2 },
                            },
                        }),
                    },
                    get hovered() {
                        return {
                            ...(['top', 'bottom'].includes(mode) && {
                                get translateY() {
                                    return mode == 'top'
                                        ? -translateVal * 1.2
                                        : translateVal * 1.2
                                },
                                transition: {
                                    translateY: {
                                        easy: 'easyOut',
                                        delay: 0.0,
                                        duration: 1,
                                    },
                                },
                            }),
                            ...(mode == 'center' && {
                                get translateX() {
                                    return -50
                                },
                                transition: {
                                    translateX: {
                                        easy: 'easyIn',
                                        delay: 0.1,
                                        duration: 0.5,
                                    },
                                },
                            }),
                        }
                    },
                }
            },
        }
    }

    return (
        <motion.svg
            width={size.width}
            height={size.height}
            viewBox={size.viewBox}
            {...restProps}>
            {/*<defs>
                <clipPath>
                    <rect
                        x={-size.width / 2}
                        y={-size.height / 2}
                        width={size.width}
                        height={size.height}
                    />
                </clipPath>
            </defs>*/}
            <Path
                {...line('top')}
                //layout
                color={color}
                //transition={springs}
            />
            <Path
                {...line('center')}
                //layout
                //transition={{opacity:{delay:1, duration: 0.1 }}}
                //transitionEnd = {{delay:0, duration: 0.1}}
                color={color}
            />
            <Path
                {...line('bottom')}
                //layout
                color={color}
            />
        </motion.svg>
    )
}

export default Lines
