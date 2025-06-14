import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'API Final project',
        description: 'userApi'
    }, 
    host: 'localhost:1313',
    schemas: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger JSON file has been generated');
}).catch(err => {
    console.error('Error generating Swagger JSON', err);
});