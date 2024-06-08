/** @type {import('next').NextConfig} */

const withPWA = require('@ducanh2912/next-pwa').default({
	dest: 'public',
	cacheOnFrontEndNav: true,
	reloadOnOnline: true,
	aggressiveFrontEndNavCaching: true,
	swcMinify: true,
	disable: false,
	workboxOptions: {
		disableDevLogs: true
	}
})

const nextConfig = { reactStrictMode: false }

module.exports = withPWA(nextConfig)
