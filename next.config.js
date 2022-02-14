const path = require('path')
module.exports = {
    reactStrictMode: true,
    experimental: {
        outputStandalone: true,
    },
    /*webpack: {
        resolve: {
            extensions: ['.js', 'jsx', '.ts', '.tsx'],
            alias: {
                '@Components': path.resolve(process.cwd(), 'components')
            },
        },
    }*/
}
