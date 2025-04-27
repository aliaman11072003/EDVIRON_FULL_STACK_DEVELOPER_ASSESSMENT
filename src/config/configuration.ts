export default () => ({
  database: {
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  payment: {
    edvironApiUrl: process.env.EDVIRON_API_URL,
    edvironApiKey: process.env.EDVIRON_API_KEY,
    edvironPgKey: process.env.EDVIRON_PG_KEY,
    schoolId: process.env.SCHOOL_ID,
  },
  app: {
    url: process.env.APP_URL,
    port: parseInt(process.env.PORT, 10) || 3000,
    environment: process.env.NODE_ENV || 'development',
  },
}); 