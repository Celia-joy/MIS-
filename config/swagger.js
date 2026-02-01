const swaggerJsdoc = require('swagger-jsdoc');
const config = require('config');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'School Management Information System API',
      version: '1.0.0',
      description: 'API documentation for School MIS',
      contact: {
        name: 'API Support'
      }
    },
    servers: [
      {
        url: `http://${config.has('swagger.host') ? config.get('swagger.host') : 'localhost:3000'}${config.has('swagger.basePath') ? config.get('swagger.basePath') : '/api/v1'}`,
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

