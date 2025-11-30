import HttpResponse from '../utils/HttpResponse.js'
import InitService from "../services/Init.service.js";
class InitController {

    postFunc = async (req, res, next) => {
        const { key1, key2, ... } = JSON.parse(req.body);
        let data = await new InitService().InitFunc({ key1, key2, ... })
        
        if( data.error ){
            return res.status(400).json(HttpResponse.error(data.error));
        }
        return res.json(HttpResponse.success(data));
    }
    
}

export default InitController;