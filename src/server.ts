import * as express from "express"
import * as logger from "morgan"
import * as bodyParser from "body-parser";
import AppModule from "./app.module";
import RouteService from "./services/route.service";
import * as passport from "passport";
import passportConfiguration from './config/passport';

export default class ApiServer {
    public app: express.Application;
    public mainModule: AppModule = new AppModule();

    public static bootstrap(): ApiServer {
        return new ApiServer();
    }

    constructor() {
        this.app = express();

        this.config();
        this.initialize();
    }

    config() {
        this.app.all('*', function(request: express.Request, response: express.Response, next : express.NextFunction) {
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });

        this.app.use(logger('dev'));

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        this.app.use(passport.initialize());
        passportConfiguration(passport);

        this.app.use((error: any, request: express.Request, response: express.Response, next: express.NextFunction) => {
            error.status = 404;
            next(error)
        });
    }

    initialize() {
        let baseRouter = RouteService.init(AppModule);

        this.app.use("/", baseRouter)
    }
}