import axios, {AxiosInstance} from 'axios'

// class Http {
//     instance: AxiosInstance
//     constructor() {
//         this.instance = axios.create({
//             baseURL: process.env.NEXT_PUBLIC_API_BACKEND,
//             timeout: 10000,
//             headers: {
//                 'Content-Type': 'application/json',
//                 "Access-Control-Allow-Origin": "*",
//                 "Access-Control-Allow-Credentials": "true",
//                 "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT",
//                 "Access-Control-Allow-Headers" : "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
//             }
//         })
//     }
// }
//
// const http = new Http().instance
// export default http;

export const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BACKEND
});