var env = process.env.NODE_ENV || 'development'; //for environment setup to development or testing
console.log("env*****" + env);
if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/myproject';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/myprojectTest';
}