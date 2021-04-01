export default {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Movies API',
            version: '1.0.0',
        },
        tags: [
            {
                name: 'movies',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./**/*.swagger.yaml'],
};