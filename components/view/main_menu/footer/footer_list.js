import { motion } from 'framer-motion'
import FooterListItem from './footer_list_item'

const items = [
    { text: 'Introducers', href: '' },
    { text: 'Frequently Asked Questions', href: '' },
    { text: 'General Terms', href: '' },
    { text: 'Compliance Requirements', href: '' },
    { text: 'Security of Funds', href: '' },
    { text: 'Account Terms', href: '' },
    { text: 'Cookie Policy', href: '' },
]

const FooterList = (props) => {
    return (
        <motion.ul className="m:flex js-menu-up" {...props}>
            {items.map(({ text, href }, i) => {
                return <FooterListItem key={i} {...{ text, href }} />
            })}
        </motion.ul>
    )
}

export default FooterList
