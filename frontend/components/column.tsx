import { useState } from "react";
import { TaskType } from "@/models/TaskType";
import { ColumnType } from "@/models/ColumnType";
import Task from "./task";

export default function Column(props) {
    // fetch the task with the column id from backend
    const [column, setColumn] = useState<ColumnType>(props.column);
    const [tasks, setTasks] = useState<TaskType[]>([]);

    return (
      <div>
        <h3>{column.name}</h3>
        <div>
          {tasks.map((task) =>
            <Task key={(task.id)} task={task} />
          )}
        </div>
      </div>
    );
  }
  