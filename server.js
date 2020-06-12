require('dotenv').config();
        
        //*

const   express = require('express'),
        cors = require('cors'),
        path = require('path'),
        morgan = require('morgan'), 
        api = require('./routes/api'),
        HTTP_PORT = 3000;
                
        //* Express init
        
const   app = express();

        //* Middleware 

        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(cors()); 
        app.use(morgan("dev")); 

        //* Routes
        
        app.use('/', api);

        //*

        app.listen(HTTP_PORT, () => {
            console.log(`HTTP_PORT connection: ${HTTP_PORT}`);
        }); 