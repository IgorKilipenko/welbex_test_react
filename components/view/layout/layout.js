import { MenuOverlay } from '../main_menu'
import { styleUtils } from '@Styles'

const styles = {

        container: {
            position: 'fixed',
            //...center({ mode: 'flexCenter' }),
            ...styleUtils.fullSize,
            overscrollBehavior: 'none',
        },
        page: {},
    }

const Layout = (props) => {
    const { children } = props
    console.log({ Layout_Props: props })
    return (
        <div css={styles.container}>
            <MenuOverlay />
            {children}
        </div>
    )
}

export default Layout
