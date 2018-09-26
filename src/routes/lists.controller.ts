import * as e from "express"
import {Controller} from "../llama";
import {Get} from "../llama/get";
import {WunderlistService} from "../services/wunderlist.service";

@Controller()
export class ListsController {
    wunderlist_service = new WunderlistService();

    @Get({path: '/'})
    async lists(request: e.Request, response: e.Response) {
        try {
            const lists = await this.wunderlist_service.lists.get();

            console.log('lists' ,lists);

            response.send(`<script>console.log(${JSON.stringify(lists)})</script>`);
        }
        catch (error) {
            console.log(error);
            response.send('error')
        }
    }

    @Get({path: '/:id'})
    async list(request: e.Request, response: e.Response) {
        const {id} = request.params;

        try {
            const list = await this.wunderlist_service.lists.getOne(id);

            response.send(`<script>console.log(${JSON.stringify(list)})</script>`);
        }
        catch (error) {
            console.log(error);
            response.send('error')
        }
    }
}