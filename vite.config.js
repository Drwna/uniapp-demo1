import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
	plugins: [uni()],
	server: {
		proxy: {
			'/remote': {
				target: "http://www.safereborn.com:8091/",
				changeOrigin: true,
				rewrite: (path) => {
					return path.replace(/^\/remote/, '')
				}
			},
			'/api': {
				target: "http://www.safereborn.com:8084/",
				changeOrigin: true,
				rewrite: (path) => {
					return path.replace(/^\/api/, '')
				}
			}
		}
	}
});
