import { Box, Grid, GridItem, Button } from '@chakra-ui/react';

import { useRequestEngine } from '@/contexts/requestEngineContext';
import { ToDoTask } from "@/models/toDoTask";

import { useDraggable } from '@dnd-kit/core';

import { CSS } from '@dnd-kit/utilities';


export default function Task(props) {
    const task: ToDoTask = props.task;
    const requestEngine = useRequestEngine();
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
      id: task.id,
      data: {
        name: task.name,
        description: task.description,
        oldColumnId: task.columnId,
        displace: 0,
        columnId: null,
        id: task.id
      },
    });
    const style = {
      transform: CSS.Translate.toString(transform),
    };

    function handleDeleteClick(taskId: number) {
      requestEngine.deleteTask(taskId)
        .then((response) => {
            console.log(response);
            if(response === 200) {
              props.setRefreshTrigger(prev => prev + 1);
            }
        });
    }

    function handleGoClick(taskId: number, direction: number) {
      const ids = [props.leftColumnId, props.rightColumnId];
      const taskData = {
        id: task.id,
        name: task.name,
        description: task.description,
        columnId: ids[direction]
      }

      requestEngine.modifyTask(taskData)
        .then((response) => {
            console.log(response);
            if(response === 200) {
              props.setRefreshTrigger(prev => prev + 1);
            }
        });
    }

    return (
      <Box bg='#eee' w='100%' className="taskBox" ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <h4>{task.name}</h4>
        <p>{task.description}</p>
        <Grid 
          templateColumns={`repeat(2, 1fr)`}
          templateRows='repeat(2, 1fr)'
          color='#000'
          gap={2}>
          
          {props.leftColumnId && (
          <GridItem  bg='#fff' className="taskButton">
            <Button onClick={() => handleGoClick(task.id, 0)}>Go left</Button>
          </GridItem>
          )}
          {!props.leftColumnId && (
          <GridItem  bg='#fff' className="taskButton">
            <Button onClick={() => handleGoClick(task.id, 0)} disabled>Go left</Button>
          </GridItem>
          )}

          {props.rightColumnId && (
          <GridItem  bg='#fff' className="taskButton">
            <Button onClick={() => handleGoClick(task.id, 1)}>Go right</Button>
          </GridItem>
          )}
          {!props.rightColumnId && (
          <GridItem  bg='#fff' className="taskButton">
            <Button onClick={() => handleGoClick(task.id, 1)} disabled>Go right</Button>
          </GridItem>
          )}

          <GridItem  bg='#fff' className="taskButton" colSpan={2}>
            <Button onClick={() => handleDeleteClick(task.id)}>Delete</Button>
          </GridItem>
        </Grid>
      </Box>
    );
  }
  