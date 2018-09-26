import * as e from "express"
import {Controller} from "../llama";
import {Get} from "../llama/get";
import {WunderlistService} from "../services/wunderlist.service";

@Controller()
export class RootController {
    wunderlist_service = new WunderlistService();

    @Get({path: '/'})
    hi(request: e.Request, response: e.Response): void {
        let client_id = 'ca64d8b13659be4a3318';
        let redirect_uri = encodeURIComponent("http://localhost:5678/auth/token");
        let state = "dead";

        response.send(`<a href="https://www.wunderlist.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}">Go</a>`)
    }
}