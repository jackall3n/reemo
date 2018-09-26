import * as e from "express"
import {Controller} from "../llama";
import {Get} from "../llama/get";
import {WunderlistService} from "../services/wunderlist.service";

@Controller()
export class AuthController {
    wunderlist_service = new WunderlistService();

    @Get({path: '/token'})
    async token(request: e.Request, response: e.Response) {
        const {access_token} = await this.wunderlist_service.auth.access_token(request.query.code);

        response.send({access_token});
    }
}