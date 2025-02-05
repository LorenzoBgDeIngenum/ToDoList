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

    public async getUserByMail(mail : string): Promise<User | string> {
        const config = {
            method: 'get',
            url: `${this.apiAdd}user/mail/${mail}`
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

    ////////////////////////////////////////// ADD ////////////////////////////////////////
    public async addUser(newUser): Promise<number | Error> {
        try {
            if(await this.userWithMailExist(newUser.mail)){
                return (200)
            }
            const response = await axios.post(`${this.apiAdd}user/add`, newUser);
            return response.status;
        } catch (error: any) {
            return error.response.data;
        }
    }


    ////////////////////////////////////////// Function ////////////////////////////////////////
    public async userWithMailExist(mail : string): Promise<string | boolean | undefined> {
        const config = {
            method: 'get',
            url: `${this.apiAdd}user/mail/${mail}`
        };
        try {
            await this.axios(config);  
            return true;

        } catch (error : any) {
            return false;
        }
    }
}