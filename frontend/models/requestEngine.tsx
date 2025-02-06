import { User } from "./user"
import { ToDoList } from "./toDoList";
import { Column } from "./column";
import { ToDoTask } from "./toDoTask";
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

    public async getToDoListsByUserId(userId : number): Promise<ToDoList[]>{
        const config = {
            method: 'get',
            url: `${this.apiAdd}todolist/byuserid/${userId}`
        };
        try {
            const response = await this.axios(config);  

            const toDoLists: ToDoList[] = response.data.map((toDoList: ToDoList) => ({
                id: toDoList.id,
                name: toDoList.name,
                userId: toDoList.userId,
            }));
    
            return toDoLists;
        } catch (error : any) {
            return error.response;
        }
    }

    public async getToDoListById(id : number): Promise<ToDoList>{
        const config = {
            method: 'get',
            url: `${this.apiAdd}todolist/${id}`
        };
        try {
            const response = await this.axios(config);  

            const toDoList: ToDoList =  ({
                id: response.data.id,
                name: response.data.name,
                userId: response.data.userId,
            });
    
            return toDoList;
        } catch (error : any) {
            return error.response;
        }
    }

    public async getColumnsByListId(listId : number): Promise<Column[]>{
        const config = {
            method: 'get',
            url: `${this.apiAdd}column/bylistid/${listId}`
        };
        try {
            const response = await this.axios(config);  

            const columns: Column[] = response.data.map((column: Column) => ({
                id: column.id,
                name: column.name,
                listId: column.listId,
            }));
    
            return columns;
        } catch (error : any) {
            return error.response;
        }
    }

    public async getTasksByColumnId(columnId : number): Promise<ToDoTask[]>{
        const config = {
            method: 'get',
            url: `${this.apiAdd}todotask/bycolumnid/${columnId}`
        };
        try {
            const response = await this.axios(config);  

            const tasks: ToDoTask[] = response.data.map((task: ToDoTask) => ({
                id: task.id,
                name: task.name,
                description: task.description,
                columnId: task.columnId,
            }));
    
            return tasks;
        } catch (error : any) {
            return error.response;
        }
    }

    ////////////////////////////////////////// POST ////////////////////////////////////////
    public async addList(newList): Promise<number | Error> {
        try {
            const response = await axios.post(`${this.apiAdd}toDoList/add`, newList);
            return response.status;
        } catch (error: any) {
            return error.response.data;
        }
    }

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

    public async addTask(newTask): Promise<number | Error> {
        try {
            const response = await axios.post(`${this.apiAdd}toDoTask/add`, newTask);
            return response.status;
        } catch (error: any) {
            return error.response.data;
        }
    }

    public async login(userInfo): Promise<User | number >{
        try {
            const response = await axios.post(`${this.apiAdd}user/login`, userInfo);
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }
    }

    ////////////////////////////////////////// DELETE ////////////////////////////////////////
    public async deleteTask(taskId): Promise<number | Error> {
        try {
            const response = await axios.delete(`${this.apiAdd}toDoTask/${taskId}`);
            return response.status;
        } catch (error: any) {
            return error.response.data;
        }
    }

    ////////////////////////////////////////// PUT ////////////////////////////////////////
    public async modifyTask(modifyTask): Promise<number | Error> {
        try {
            const response = await axios.put(`${this.apiAdd}toDoTask`, modifyTask);
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