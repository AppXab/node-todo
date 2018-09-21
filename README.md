# node-todo


for testing run 'npm run test-watch' 
package json
"test": "export NODE_ENV=test|| SET \"NODE_ENV=test\" && mocha server/**/*.test.js",

//we can easily change from dev to test db and vice versa

node server/server.js -for development
npm test to run test db  and check test log


in postman we can easily change environment between local and server(from upper right corner)