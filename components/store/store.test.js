import configureAppStore, {actions} from './store'

const initialState = { 
    theme: {},
    components: {},
}

let store

beforeEach(() =>{
    store = configureAppStore(initialState)
})

describe('test store', () => {
    test('should return store object', ()=>{
        expect(store).toBeDefined()
    })
})