import { motion } from 'framer-motion'
import { Box, BoxProps } from '@chakra-ui/react'
import { MotionProps } from 'framer-motion'

export type MotionBoxProps = BoxProps & MotionProps
const MotionBox = motion<MotionBoxProps>(Box)

export default MotionBox