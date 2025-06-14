import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'API Final project',
        description: 'userApi'
    }, 
    host: 'https://e5-6.onrender.com',
    schemas: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger JSON file has been generated');
}).catch(err => {
    console.error('Error generating Swagger JSON', err);
});