const swaggerJSDoc = require('swagger-jsdoc')

const options = {
  swaggerDefinition: {
    info: {
      title: 'Users API',
      version: '1.0.0',
      description: 'A simple users API',
    },
    host: 'localhost:3000',
    basePath: '/api',
  },
  apis: ['./server/routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)
module.exports = swaggerSpec