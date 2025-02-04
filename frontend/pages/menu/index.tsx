import { useState, useEffect } from "react";
import { ToDoListType } from "@/models/ToDoListType";
import List from "../list";

export default function Menu() {
    const [toDoLists, setToDoLists] = useState<ToDoListType[]>([]);

    useEffect(() => {
      //Fetch all the list with user Id
    },[]);

    return (
      <div>
        <h2>My ToDo Lists</h2>
        <div>
          {toDoLists.map((toDoList) =>
            <List key={(toDoList.id)} toDoList={toDoList} />
          )}
        </div>
      </div>
    );
  }
  