import * as e from "express"
import {Controller} from "../llama";
import {Get} from "../llama/get";
import { WunderlistService } from "../services/wunderlist.service";

@Controller()
export class ListsController {
    wunderlist_service = new WunderlistService();

    @Get({path: '/'})
    async lists(request: e.Request, response: e.Response) {
        try {
            const lists = await this.wunderlist_service.lists.get();

            response.send(`<script>console.log(${JSON.stringify(lists)})</script>`);
        }
        catch (error) {
            response.send('error')
        }
    }
}