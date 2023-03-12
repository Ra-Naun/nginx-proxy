export const isProd = process.env.NODE_ENV === 'production';
export const isDev = process.env.NODE_ENV === 'development';
export const port = parseInt(process.env.PORT || '') || 3000;
