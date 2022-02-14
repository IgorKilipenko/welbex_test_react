import { Children, cloneElement } from 'react'
// eslint-disable-next-line react/display-name
const withItemIndex = (WrappedComponent) => (props) => {
    const { children, ...restProps } = props
    return (
        <WrappedComponent {...restProps}>
            {children &&
                Children.map(children, (child, i) => {
                    return cloneElement(child, {
                        itemIndex: i,
                        itemsCount: Children.count(child),
                    })
                })}
        </WrappedComponent>
    )
}

export default withItemIndex
