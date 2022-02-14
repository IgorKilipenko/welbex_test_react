import { createMemo } from 'react-use'

const memoStylesFactory = (stylesFactory) => createMemo(stylesFactory)

export { memoStylesFactory }
