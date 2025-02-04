import { User } from "@/models/user"
import axios from 'axios';


export class RequestEngine {
    private apiAdd: string;
    private axios: any;

    constructor() {
        this.apiAdd = "http://localhost:5041/";
        this.axios = axios;
    }

    ////////////////////////////////////////// GET ////////////////////////////////////////
    public async getUserById(id : number): Promise<User | string> {
        const config = {
            method: 'get',
            url: `${this.apiAdd}user/${id}`
        };
        try {
            const response = await this.axios(config);  

            const user: User = {
                id: response.data.id,
                mail: response.data.mail,
                password: response.data.password
            };
    
            return user;
        } catch (error : any) {
            return error.response;
        }
    }
}