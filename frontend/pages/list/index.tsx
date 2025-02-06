import { useState, useEffect } from "react";
import { ToDoList } from "@/models/toDoList";
import { useRequestEngine } from '@/contexts/requestEngineContext'; 
import Link from 'next/link'
import { useUser } from "@/contexts/userContext";
import { Button } from "@chakra-ui/react";

export default function Menu() {
    const [toDoLists, setToDoLists] = useState<ToDoList[]>([]);
    const requestEngine = useRequestEngine();
    const { user, setUser } = useUser();
    const [isAddList, setIsAddList] = useState<boolean>(false);

    useEffect(() => {
      console.log(user);
      fetchToDoLists();
    },[]);

    function fetchToDoLists(){
      requestEngine.getToDoListsByUserId(1)
      .then((response) => {
        console.log(response);
        setToDoLists(response);
      });
    }

    function handleAddListFormSubmit(event){
      event.preventDefault();
      const name = event.target.name.value;
      const userId = 1;

      const listData = {
        name : name,
        userId : userId
      }

    requestEngine.addList(listData)
    .then((response) => {
        console.log(response);
        if(response === 201) {
            alert('List added successfully');
            setIsAddList(false);
            fetchToDoLists();
        }
    });
    }

    function handleAddListClick() {
      setIsAddList(true);
    }

    return (
      <>
        <h2>My ToDo Lists</h2>
        <div>
          {toDoLists.map((toDoList) =>
            <Link key={(toDoList.id)} href={("list/" + toDoList.id)}>
              <div>
                <h3>{toDoList.name}</h3>
              </div>
            </Link>
          )}
        </div>
        {!isAddList &&(
            <div>
              <Button onClick={handleAddListClick}>
                New List
              </Button>
            </div>
          )}
          {isAddList &&(
          <div>
            <h2>Add List</h2>
            <form onSubmit={handleAddListFormSubmit}>
              <label>Name : <input type="text" name="name" /></label>
              <input type="submit" name="Submit" />
            </form>
          </div>
      )}
      </>
    );
  }
  