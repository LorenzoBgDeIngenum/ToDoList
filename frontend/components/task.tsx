import { ToDoTask } from "@/models/toDoTask";
import { Box, Grid, GridItem, Button } from '@chakra-ui/react'

export default function Task(props) {
    const task: ToDoTask = props.task;

    function handleDeleteClick(taskId: number) {
      
    }

    function handleGoClick(taskId: number, direction: number) {
    }

    return (
      <Box bg='#eee' w='100%' className="taskBox">
        <h4>{task.name}</h4>
        <p>{task.description}</p>
        <Grid 
          templateColumns={"repeat(2, 1fr)"}
          templateRows='repeat(2, 1fr)'
          color='#000'
          gap={2}>
          <GridItem  bg='#fff' className="taskButton">
            <Button onClick={() => handleGoClick(task.id, 0)}>Go left</Button>
          </GridItem>
          <GridItem  bg='#fff' className="taskButton">
            <Button onClick={() => handleGoClick(task.id, 1)}>Go right</Button>
          </GridItem>
          <GridItem  bg='#fff' className="taskButton" colSpan={2}>
            <Button onClick={() => handleDeleteClick(task.id)}>Delete</Button>
          </GridItem>
        </Grid>
      </Box>
    );
  }
  