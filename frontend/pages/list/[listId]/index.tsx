import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import { useDndMonitor } from "@dnd-kit/core";
import { Grid, GridItem, Button, Textarea } from "@chakra-ui/react";

import { ToDoList } from "@/models/toDoList";
import { Column } from "@/models/column";
import ColumnList from "@/components/columnList";
import Droppable from "@/components/droppable";
import { useRequestEngine } from "@/contexts/requestEngineContext";


export default function List() {
    const [toDoList, setToDoList] = useState<ToDoList>();
    const [columns, setColumns] = useState<Column[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0)
    const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
    const requestEngine = useRequestEngine();
    const router = useRouter();
    const {listId} = router.query;
    useDndMonitor({
      onDragEnd(event) {
        handleDragEnd(event);
      },
    });
    
    useEffect(() => {
      if (!router.isReady) return; 
      fetchToDoList();
      fetchColumns();
      setLoading(false);
    }, [router.isReady]); 

    function handleDragEnd(event) {
        const taskData = event.active.data.current;

        if(event.collisions.length > 0){
          if(taskData.oldColumnId != event.collisions[0].id){
            taskData.columnId = event.collisions[0].id;

            requestEngine.modifyTask(taskData)
            .then((response) => {
                if(response === 200) {
                    setRefreshTrigger(prev => prev + 1);
                }

            });
          }
        }
      }
    

    async function fetchToDoList(){
      const reponse = await requestEngine.getToDoListById(listId);
      setToDoList(reponse);
    }

    async function fetchColumns() {
      const reponse = await requestEngine.getColumnsByListId(listId);
      setColumns(reponse);
    }


    function handleAddTaskClick() {
      setIsAddingTask(true);
    }

    function handleAddTaskFormSubmit(event) {
        event.preventDefault();
        const name = event.target.name.value;
        const description = event.target.description.value;
    
        const taskData = {
          name: name,
          description: description,
          columnId: columns[0].id,
          columnNumber: 1
        }

        requestEngine.addTask(taskData)
        .then((response) => {
            console.log(response);
            if(response === 201) {
                setIsAddingTask(false);
                fetchColumns();
                setRefreshTrigger(prev => prev + 1);
            }
        });
     }

    return (
      <div>
        <Head>
          <title>{toDoList?.name}</title>
        </Head>

        {loading &&(
          <div>
            <p>Loading</p>
          </div>
        )}

        {!loading &&(
          <div className="listPage">
            <h2>{ !!toDoList && toDoList.name}</h2>

            {(columns.length > 0) &&(
            <Grid 
              templateColumns={"repeat(" + columns.length + ", 1fr)"}
              color='#000'
              gap={2}>
              {columns.map((column) =>
              <GridItem key={(column.id)} bg='#fff' className="title listColumn">
                <h3>{column.name}</h3>
              </GridItem>
              )}
              {columns.map((column, index) =>
                <GridItem key={(column.id)} bg='#fff' className="listColumn">
                  <Droppable id={column.id} key={column.id} order={column.order}>
                    <ColumnList column={column} refreshTrigger={refreshTrigger} setRefreshTrigger={setRefreshTrigger} 
                        leftColumnId={index > 0 ? columns[index - 1].id : null} 
                        rightColumnId={index < columns.length - 1 ? columns[index + 1].id : null} 
                      />
                  </Droppable>
                </GridItem>
              )}
            </Grid>
            )}

            {!isAddingTask &&(
            <div>
              <Button onClick={handleAddTaskClick}>
                New Task
              </Button>
            </div>
            )}

            {isAddingTask &&(
              <div className="addingTask">
              <h3>New Task</h3>
              <form onSubmit={handleAddTaskFormSubmit}>
                <label>Name : <input type="text" name="name" /></label>
                <label>Description : <Textarea name="description" /></label>
                <input type="submit" name="Submit" />
              </form>
            </div>
            )}
          </div>

          
        )}
      </div>
    );
  }
  