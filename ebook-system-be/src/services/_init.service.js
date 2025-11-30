import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import Init from "../models/Init.js";
import Token from "../models/Token.js"
import { where } from "sequelize";

class InitService {
    async InitFunc({ email, password }) {
        try {

            
            return {}
        } catch (error) {
            // throw "Email hoặc password không chính xác"  
            throw error          
        }

    }
}

export default InitService;