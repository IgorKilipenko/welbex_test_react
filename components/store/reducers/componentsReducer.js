import { createSlice /*, current*/ /*, isDraft*/ } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const _prepare = (payload) => {
    if (
        payload != null &&
        typeof payload === 'object' &&
        'payload' in Object.keys(payload)
    ) {
        payload = payload.payload
    }
    payload =
        payload != null && typeof payload === 'object'
            ? payload
            : { other: payload }
    return { payload }
}

/**
 * @type {{componentsState: object, appBar: object, mainMenu: object}}
 */
const initialState = () => {
    return {
        mainMenu: { isOpened: false },
        mainComponentMousePosition: {
            mousePosition: {
                clientX: 0,
                clientY: 0,
                hovered: false,
            },
        },
    }
}

const componentsSlice = createSlice({
    name: 'components',
    initialState: initialState(),
    reducers: {
        get setMainMenuState() {
            return {
                reducer: (state, action) => {
                    Object.assign(state.mainMenu, { ...action.payload })
                },
                prepare: (val) => _prepare(val),
            }
        },
        get setMainComponentMousePosition() {
            return {
                reducer: (state, action) => {
                    Object.assign(
                        state.mainComponentMousePosition.mousePosition,
                        { ...action.payload }
                    )
                },
                prepare: (val) => _prepare(val),
            }
        },
    },
})

/**
 * @param {('componentsState'|'appBar'|'mainMenu'|'mainComponent')} componentName
 * @return {object}
 */
const useMainMenuState = (prop = null) =>
    useSelector((store) =>
        prop
            ? store[componentsSlice.name].mainMenu[prop]
            : store[componentsSlice.name].mainMenu
    )

const useMainComponentMousePosition = () =>
    useSelector(
        (store) =>
            store[componentsSlice.name].mainComponentMousePosition.mousePosition
    )

export default componentsSlice
export { useMainMenuState, useMainComponentMousePosition }
