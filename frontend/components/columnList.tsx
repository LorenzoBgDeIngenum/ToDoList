import { useState, useEffect } from "react";
import { ToDoTask } from "@/models/toDoTask";
import { Column } from "@/models/column";
import Task from "./task";
import { useRequestEngine } from '@/contexts/requestEngineContext'; 

export default function ColumnList(props) {
    const column: Column = props.column;
    const [tasks, setTasks] = useState<ToDoTask[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const requestEngine = useRequestEngine();

    useEffect(() => {
          fetchTasks();
          setLoading(false);
        },[]);
    
        async function fetchTasks(){
          const reponse = await requestEngine.getTasksByColumnId(column.id);
          setTasks(reponse);
        }

    return (
      <>
        {loading &&(
          <div>
            <p>Loading</p>
          </div>
        )}

        {!loading &&(
          <div>
            {tasks.map((task) =>
              <Task key={(task.id)} task={task} />
            )}
          </div>
        )}
      </>
    );
  }
  