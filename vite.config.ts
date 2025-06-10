export default {
    base: '/games/',
    build: {
        rollupOptions: {
            input: {
                // @ts-ignore
                main: resolve(__dirname, 'index.html'),
                // @ts-ignore
                gallows: resolve(__dirname, 'gallows.html'),
                // @ts-ignore        
                memgen: resolve(__dirname, 'memGen.html'),
                // @ts-ignore        
                matrix: resolve(__dirname, 'matrix.html'),
            }
        }
    }
}