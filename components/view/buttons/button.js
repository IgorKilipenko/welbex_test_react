const Button = ({ href, text, color='primary', }) => {
    let textColor = ''
    if (color === 'error') {
        color = 'bg-red'
        textColor = 'text-white'
    }else {
        color = 'bg-green-light' 
        textColor = 'text-green'
    }
    return (
        <a
            href={href}
            className={`font-medium uppercase group inline-flex rounded-full overflow-hidden relative ${color} ${textColor} mr-15 w-[123px] text-[10px]`}>
            <div className="w-full flex items-center text-center justify-center transition-transform duration-1000 ease-out-expo transform translate-y-[0%] group-hover:translate-y-[-100%] px-0 h-[44px]">
                {text}
            </div>
            <div
                className="absolute top-0 left-0 w-full h-full flex items-center text-center justify-center transition-transform duration-1000 ease-out-expo transform translate-y-[100%] group-hover:translate-y-[0%]"
                aria-hidden="true">
                {text}
            </div>
        </a>
    )
}

export default Button
