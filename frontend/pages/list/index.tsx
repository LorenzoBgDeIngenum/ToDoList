import { useState, useEffect } from "react";
import Link from "next/link";
import Head from 'next/head';
import { Button } from "@chakra-ui/react";

import { useRequestEngine } from "@/contexts/requestEngineContext";
import { useUser } from "@/contexts/userContext";
import { ToDoList } from "@/models/toDoList";

export default function Menu() {
  const [toDoLists, setToDoLists] = useState<ToDoList[]>([]);
  const requestEngine = useRequestEngine();
  const { user } = useUser();
  const [isAddList, setIsAddList] = useState<boolean>(false);

  useEffect(() => {
    if (user?.id) { 
      fetchToDoLists();
    }
  }, [user?.id]); 

  function fetchToDoLists() {
    if (user?.id) {
      requestEngine.getToDoListsByUserId(user.id)
        .then((response) => {
          setToDoLists(response);
        })
        .catch((error) => {
          console.error("Error fetching ToDo Lists", error);
        });
    }
  }

  function handleAddListFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    const name = event.target.name.value;
    if (!name) {
      alert("Please enter a name for the list.");
      return;
    }

    const listData = {
      name: name,
      userId: user.id, 
    };

    requestEngine.addList(listData)
      .then((response) => {
        if (response === 201) {
          setIsAddList(false);
          
          fetchToDoLists();
        }
      })
      .catch((error) => {
        console.error("Error adding list", error);
        alert("Failed to add the list.");
      });
  }

  function handleAddListClick() {
    setIsAddList(true);
  }

  return (
    <>
      <Head>
        <title>My Lists</title>
      </Head>
      <h2>My ToDo Lists</h2>
      {toDoLists.length > 0 && (
        <div className="centerColumn">
          {toDoLists.map((toDoList) => (
            <Link key={toDoList.id} href={`list/${toDoList.id}`}>
              <div>
                <h3>{toDoList.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      {!isAddList && (
        <div className="listAdd paddingTop">
          <Button onClick={handleAddListClick}>New List</Button>
        </div>
      )}

      {isAddList && (
        <div className="paddingTop">
          <h2>Add List</h2>
          <form onSubmit={handleAddListFormSubmit}>
            <label>Name: <input type="text" name="name" /></label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      )}
    </>
  );
}
