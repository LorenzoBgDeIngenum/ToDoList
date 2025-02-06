import { ToDoList } from "@/models/toDoList";
import { Column } from "@/models/column";
import ColumnList from "@/components/columnList";
import { useState, useEffect } from "react";
import { useRequestEngine } from '@/contexts/requestEngineContext'; 
import { Grid, GridItem, Button, Textarea } from "@chakra-ui/react";

export default function List( {props} ) {
    const [toDoList, setToDoList] = useState<ToDoList>();
    const [columns, setColumns] = useState<Column[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0)
    const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
    const requestEngine = useRequestEngine();
    
    useEffect(() => {
      fetchToDoList();
      fetchColumns();
      setLoading(false);
      //console.log(props.listId);
    },[]);

    async function fetchToDoList(){
      const reponse = await requestEngine.getToDoListById(5);
      setToDoList(reponse);
    }

    async function fetchColumns() {
      const reponse = await requestEngine.getColumnsByListId(5);
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
          columnId: columns[0].id
        }

        requestEngine.addTask(taskData)
        .then((response) => {
            console.log(response);
            if(response === 201) {
                alert('Task added successfully');
                setIsAddingTask(false);
                fetchColumns();
                setRefreshTrigger(prev => prev + 1);
            }
        });
     }

    return (
      <div>
        {loading &&(
          <div>
            <p>Loading</p>
          </div>
        )}

        {!loading &&(
          <div className="listPage">
            <h2>{ !!toDoList && toDoList.name}</h2>
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
                  <ColumnList column={column} refreshTrigger={refreshTrigger} setRefreshTrigger={setRefreshTrigger} 
                      leftColumnId={index > 0 ? columns[index - 1].id : null} 
                      rightColumnId={index < columns.length - 1 ? columns[index + 1].id : null} 
                    />
                </GridItem>
              )}
            </Grid>
            
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
  