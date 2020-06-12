require('dotenv').config();
        
        //*

const   express = require('express'),
        cors = require('cors'),
        path = require('path'),
        morgan = require('morgan'), 
        api = require('./routes/api'),
        HTTP_PORT = process.env.PORT || 3000;
                
        //* Express init
        
const   app = express();

        //* Middleware 

        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(cors()); 
        app.use(morgan("dev")); 

        //* Routes
        
        app.use('/api', api);

        //
        // FRONTEND SOURCE FILES UN-COMMENT BEFORE DEPLOYMENT 
        app.use(express.static(path.join(__dirname, 'public'))); // Home route to render angular build 
        app.get('/', (req, res, next) => {
            res.send('Invalid endpoint, serve.js error')        
        });
        //FINAL ROUTE TO BE HIT BY APP
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'public/index.html'));
        });

        // 404 ERROR HANDLER 
        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        //*

        app.listen(HTTP_PORT || process.env.PORT, () => {
            console.log(`HTTP_PORT connection: ${HTTP_PORT || process.env.PORT}`);
        }); 