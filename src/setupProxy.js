import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_UPLOAD_URL,
      changeOrigin: true,
    })
  );

}; 