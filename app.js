const express=require('express');
const app=express();
const swaggerTools=require('swagger-tools');
const bodyParser = require('body-parser');
const fs = require('fs');
const routes=require('./routes');
const path=require('path');
const yaml=require('js-yaml')
require('dotenv').config()
require('./Utilities/mongoose')();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const yamlPath=path.join(__dirname,'.','swagger.yml');
const swaggerDoc=yaml.safeLoad(fs.readFileSync(yamlPath,'utf8'));

const options={
    controllers:routes
}

swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
    app.use(middleware.swaggerMetadata())
    app.use(middleware.swaggerValidator())
    app.use(middleware.swaggerRouter(options))
    app.use(middleware.swaggerUi())
    // app.use(errorhandler)
    app.listen(process.env.PORT, () => {
      console.log(`you are connected to port ${process.env.PORT}`)
    })
  })