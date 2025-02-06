import {useDroppable} from '@dnd-kit/core';


export default function Droppable(props) {
    const {setNodeRef} = useDroppable({
      id: props.id,
      data: {
        order: props.order
      },
    });
    
    return (
      <div ref={setNodeRef} className="droppable"> 
        {props.children}
      </div>
    );
  }