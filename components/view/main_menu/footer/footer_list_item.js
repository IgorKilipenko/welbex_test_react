const FooterListItem = ({ href = '', text }) => {
    return (
        <li className="m:mr-20 mb-10 m:mb-0">
            <a
                href={href}
                className="opacity-50 hover:opacity-100 transition-opacity duration-1000 ease-out-expo js-site-link">
                {text}
            </a>
        </li>
    )
}

export default FooterListItem
