import { type userToken } from "../utils/tokens.js"

declare global{
    namespace Express{
        interface Request{
           user?:userToken
           id?:userToken
        }
    }
}

export {}