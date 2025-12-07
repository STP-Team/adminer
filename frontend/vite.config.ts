import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@assets': path.resolve(__dirname, './src/assets'),
        },
    },
    server: {
        allowedHosts: [
            "test.lab.loc",
            "localhost",
            "127.0.0.1",
        ]
    }
})
