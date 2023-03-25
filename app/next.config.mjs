import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DOMAIN: process.env.DOMAIN || '', // Если нужно использовать и на клиенте и на сервере
  },
  webpack: (config) => {
    // некст не имеет встроенного функционала для превращения кебаба в кемел, поэтому временный костыль(возможно в будущем добавят фичу)
    // https://github.com/vercel/next.js/discussions/11267
    const rules = config.module.rules
      .find((/** @type {{ oneOf: any; }} */ rule) => typeof rule.oneOf === 'object')
      .oneOf.filter((/** @type {{ use: any; }} */ rule) => Array.isArray(rule.use));

    rules.forEach((/** @type {{ use: any[]; }} */ rule) => {
      rule.use.forEach((moduleLoader) => {
        if (/css-loader\/(?:cjs|dist|src)/.test(moduleLoader.loader)) {
          if (typeof moduleLoader.options.modules === 'object') {
            moduleLoader.options.modules = {
              ...moduleLoader.options.modules,
              exportLocalsConvention: 'camelCaseOnly', // https://github.com/webpack-contrib/css-loader#exportlocalsconvention
            };
          }
        }
      });
    });

    return config;
  },
  // для использования scss-штук в стилях компонентов надо преподготовить эти самые scss-штуки:
  sassOptions: {
    includePaths: [`${__dirname}/sass`],
    prependData: `@import "./styles/global/index.scss";`,
  },

  images: {
    domains: ['placeimg.com'],
  },
};

export default nextConfig;
