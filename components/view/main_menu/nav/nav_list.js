import NavItem from './nav_item'
import { useTheme } from '@emotion/react'
import { memoStylesFactory, styleUtils } from '@Styles'

const stylesFactory = memoStylesFactory((theme) => {
    const { fullSize } = styleUtils
    const { bp } = theme
    return {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            [bp.median]: {
                width: 'auto',
            },
        },
    }
})

const NavList = ({ reverse = true, controls }) => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    return (
        <>
            <ul
                css={styles.container}
                //className="w-full m:w-auto flex flex-col items-start"
            >
                {['Home', 'Totos', 'Solutions', 'Solutions', 'Solutions'].map(
                    (text, i, arr) => {
                        return (
                            <NavItem
                                key={i}
                                controls={controls}
                                itemIndex={reverse ? arr.length - i - 1 : i}
                                reverse={reverse}
                                number={`${(i + 1)
                                    .toString()
                                    .padStart(2, '0')}`}
                                text={text}
                            />
                        )
                    }
                )}
            </ul>
            <div className="w-full m:w-auto m:flex">
                <div className="m:mr-50 my-40 m:my-0 py-40 m:py-0 border-t border-b m:border-0 border-white border-opacity-25 js-menu-up">
                    <div className="text-f15 uppercase mb-10 font-semibold">
                        Customer support
                    </div>
                    <ul>
                        <li>
                            <a
                                href="tel:+44 (0)20 7493 5555"
                                className="opacity-50 hover:opacity-100 transition-opacity duration-1000 ease-out-expo">
                                T: +44 (0)20 7493 5555
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:contact@astoncm.com"
                                className="opacity-50 hover:opacity-100 transition-opacity duration-1000 ease-out-expo">
                                E: contact@astoncm.com
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="js-menu-up">
                    <div className="text-f15 uppercase mb-15 font-semibold">
                        Social
                    </div>
                    <div className="flex">
                        <a
                            href="https://twitter.com/AstonCurrency"
                            //target="_blank"
                            className="relative group w-[6.4rem] h-[6.4rem] mr-10 rounded-full flex items-center justify-center border border-white">
                            <div className="absolute inset-0 rounded-full bg-white transform scale-0 group-hover:scale-100 transition-transform duration-700 ease-out-expo" />
                            <svg className="text-25 group-hover:text-green relative z-2 text-f11 icon icon-twitter transition-colors duration-500 ease-out-expo">
                                <use xlinkHref="#icon-twitter" />
                            </svg>
                        </a>
                        <a
                            href="https://www.facebook.com/AstonCurrency"
                            //target="_blank"
                            className="relative group w-[6.4rem] h-[6.4rem] rounded-full flex items-center justify-center border border-white">
                            <div className="absolute inset-0 rounded-full bg-white transform scale-0 group-hover:scale-100 transition-transform duration-700 ease-out-expo" />
                            <svg className="text-25 group-hover:text-green relative z-2 text-f11 icon icon-facebook transition-colors duration-500 ease-out-expo">
                                <use xlinkHref="#icon-facebook" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavList
