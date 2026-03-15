import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fixes "multiple lockfiles" warning on Vercel — points tracing to repo root
  outputFileTracingRoot: path.join(__dirname, "../"),
};

export default nextConfig;
