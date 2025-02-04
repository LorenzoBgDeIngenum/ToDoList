import { useState } from "react";
import { TaskType } from "@/models/taskType";

export default function Task(props) {
    const [task, setTask] = useState<TaskType>(props.task);

    return (
      <div>
        <h4>{task.name}</h4>
        <p>{task.description}</p>
      </div>
    );
  }
  