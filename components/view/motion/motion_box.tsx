import { motion } from 'framer-motion'
import { Box, BoxProps } from '@chakra-ui/react'
import { MotionProps } from 'framer-motion'

export type MotionBoxProps = BoxProps & MotionProps
const MotionBox = motion(Box)

export default MotionBox