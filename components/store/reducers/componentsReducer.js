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
    const size = { width: 0, heigth: 0 }
    return {
        componentsState: {},
        appBar: { ...{ size } },
        mainMenu: { initial: false, ...{ size } },
        mainComponent: { ...{ size } },
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
        get setComponentsState() {
            return {
                reducer: (state, action) => {
                    console.warn(
                        'Not use this action (setComponentsState) in production, only for development'
                    )
                    Object.assign(state.componentsState, { ...action.payload })
                },
                prepare: (val) => _prepare(val),
            }
        },
        get setAppBarState() {
            return {
                reducer: (state, action) => {
                    Object.assign(state.appBar, { ...action.payload })
                },
                prepare: (val) => _prepare(val),
            }
        },
        get setMainMenuState() {
            return {
                reducer: (state, action) => {
                    //console.log('CURRENT_STATE', current(state))
                    Object.assign(state.mainMenu, { ...action.payload })
                },
                prepare: (val) => _prepare(val),
            }
        },
        get setMainComponentState() {
            return {
                reducer: (state, action) => {
                    Object.assign(state.mainComponent, { ...action.payload })
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
const useComponentsSelector = (componentName, propName = null) =>
    useSelector((store) =>
        !propName
            ? store[componentsSlice.name][componentName]
            : store[componentsSlice.name][componentName][propName]
    )

const useMainComponentMousePosition = () =>
    useSelector(
        (store) =>
            store[componentsSlice.name].mainComponentMousePosition.mousePosition
    )

export default componentsSlice
export { useComponentsSelector, useMainComponentMousePosition }
