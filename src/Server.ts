import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import request from 'request';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

const app = express();
const { BAD_REQUEST } = StatusCodes;



/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

app.all('*', function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

    if (req.method === 'OPTIONS') {
        res.send();
    } else {
        var targetURL = req.originalUrl.substring(1);
        request(targetURL, (error : Error, response : any, _body : Request) => {
            if (error) {
                console.error(error)
                console.error('error: ' + response.statusCode)
            }
        }).pipe(res);
    }
});

// Export express instance
export default app;
