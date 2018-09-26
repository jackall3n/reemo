import * as e from "express"
import {Controller} from "../llama";
import {Get} from "../llama/get";
import { WunderlistService } from "../services/wunderlist.service";

@Controller()
export class RootController {
    wunderlist_service = new WunderlistService()

    @Get({path: '/'})
    hi(request: e.Request, response: e.Response): void {
        let client_id = 'ca64d8b13659be4a3318'
        let redirect_uri = encodeURIComponent("http://localhost:5678/auth/token")
        let state = "dead"
        response.send(`<a href="https://www.wunderlist.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}">Go</a>`)
    }



    @Get({path: '/lists'})
    lists(request: e.Request, response: e.Response): void {

        this.wunderlist_service.lists().then(lists => 
        {
            response.send(`<script>console.log(${JSON.stringify(lists)})</script>`)
        }).catch(_ => response.send('error'))
    }



    @Get({path: '/tasks'})
    tasks(request: e.Request, response: e.Response): void {
        this.wunderlist_service.lists().then((lists : any) => 
        {
            console.log('Found lists:', lists.length);
            let task_promises = lists.map((list : any) => {
                return new Promise((res, rej) => {
                    this.wunderlist_service.tasks(list.id).then((tasks : any) => {
                        res({list, tasks})
                    })
                })
            })

            Promise.all(task_promises).then(res => response.send(`<script>console.log(${JSON.stringify(res)})</script>`))

            
        }).catch(_ => response.send('error'))
    }
}