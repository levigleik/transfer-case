import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async redirects() {
		return [
			{
				source: "/",
				destination: "/transfer",
				permanent: false, // Set to true for 308 (permanent), false for 307 (temporary)
			},
		];
	},
};

export default nextConfig;
