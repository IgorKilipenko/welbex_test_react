/*import themeReducer from './themeReducer'

export { themeReducer }*/

import themeSlice from './themeReducer'
import componentsSlice from './componentsReducer'
export { useMainComponentMousePosition, useComponentsSelector } from './componentsReducer'

const slicies = {
    theme: themeSlice,
    components: componentsSlice
}

export { slicies }
