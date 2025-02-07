import { useState, useEffect } from "react";

import { ToDoTask } from "@/models/toDoTask";
import { Column } from "@/models/column";
import Task from "./task";
import { useRequestEngine } from '@/contexts/requestEngineContext';


export default function ColumnList({ leftColumnId, rightColumnId, column, refreshTrigger, setRefreshTrigger }: { column: Column, refreshTrigger: number }) {
    const [tasks, setTasks] = useState<ToDoTask[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const requestEngine = useRequestEngine();

    useEffect(() => {
      fetchTasks();
      setLoading(false);
  }, []); 

    useEffect(() => {
        fetchTasks();
    }, [refreshTrigger]); 

    async function fetchTasks() {
        const response = await requestEngine.getTasksByColumnId(column.id);
        setTasks(response);
        console.log("Tasks fetched:", response); 
    }

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {tasks.map((task) => (
                        <Task key={task.id} task={task} setRefreshTrigger={setRefreshTrigger} leftColumnId={leftColumnId} rightColumnId={rightColumnId}/>
                    ))}
                </div>
            )}
        </>
    );
}
