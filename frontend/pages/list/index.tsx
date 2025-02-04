import { ToDoListType } from "@/models/ToDoListType";
import { ColumnType } from "@/models/ColumnType";
import Column from "@/components/column";
import { useState, useEffect } from "react";

export default function List(props) {
    const [toDoList, setToDoList] = useState<ToDoListType>();
    const [columns, setColumns] = useState<ColumnType[]>([]);
    
    useEffect(() => {
      //fetch in backend the ToDoList information with the props.id
      // fetch in the backend the columns with the list id
    },[]);

    return (
      <div>
        <h2>{toDoList.name}</h2>
        <div>
          {columns.map((column) =>
            <Column key={(column.id)} column={column} />
          )}
        </div>
      </div>
    );
  }
  