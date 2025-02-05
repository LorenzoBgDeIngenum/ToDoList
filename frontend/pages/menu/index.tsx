import { useState, useEffect } from "react";
import { ToDoList } from "@/models/toDoList";
import { useRequestEngine } from '@/contexts/requestEngineContext'; 
import Link from 'next/link'

export default function Menu() {
    const [toDoLists, setToDoLists] = useState<ToDoList[]>([]);
    const requestEngine = useRequestEngine();

    useEffect(() => {
      requestEngine.getToDoListsByUserId(1)
      .then((response) => {
        console.log(response);
        setToDoLists(response);
      });
    },[]);

    return (
      <div>
        <h2>My ToDo Lists</h2>
        <div>
          {toDoLists.map((toDoList) =>
            <Link  key={(toDoList.id)} href="list">
              <div>
                <h3>{toDoList.name}</h3>
              </div>
            </Link>
          )}
        </div>
      </div>
    );
  }
  