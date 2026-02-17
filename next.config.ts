import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // @yargram は types に .ts ソースを指定しているため transpile して解決する
  transpilePackages: ["@yargram/core", "@yargram/react"],
};

export default nextConfig;
