import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointFile = ["./app.js"];
    swaggerAutogen(outputFile, endpointFile);