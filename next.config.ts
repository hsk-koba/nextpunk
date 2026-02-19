import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Next.js 16: webpack プラグイン（vanilla-extract）がある場合、turbopack を明示してエラーを解消
  turbopack: {},
  // @yargram は types に .ts ソースを指定しているため transpile して解決する
  transpilePackages: ["@yargram/core", "@yargram/react"],
};

export default withVanillaExtract(nextConfig);
