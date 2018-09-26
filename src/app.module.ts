import routes from "./routes";
import {Module} from "./llama";
import 'reflect-metadata';

@Module({
    routes: routes
})
export default class AppModule {
}