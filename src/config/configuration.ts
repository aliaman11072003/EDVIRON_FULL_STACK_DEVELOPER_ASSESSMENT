export default () => ({
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/school-payment',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRATION || '1d',
  },
  payment: {
    apiKey: process.env.PAYMENT_GATEWAY_API_KEY,
    secret: process.env.PAYMENT_GATEWAY_SECRET,
  },
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
    environment: process.env.NODE_ENV || 'development',
  },
}); 