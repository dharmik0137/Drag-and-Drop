import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import DehazeIcon from '@mui/icons-material/Dehaze';
const axios = require('axios').default;


function App() {

  const[data,setData] = useState([]);

  useEffect(() =>{
    axios.get('https://jsonplaceholder.typicode.com/users')
  .then(function (response) {
    // handle success
    setData(response.data)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  },[])

  const handleEnd = (result) =>{
    console.log("result==>",result)
    let temp = [...data];
    let [selectRow] = temp.splice(result.source.index,1)
    temp.splice(result.destination.index,0,selectRow)
    setData(temp)
  }
  
  return (
   <DragDropContext onDragEnd={(result) => handleEnd(result)}>
    <Droppable droppableId={`${data.length}`}>
      {
        (provided) =>(
          <div ref={provided.innerRef}{...provided.droppableProps}>
          {
            data.map((item,index)=>(
              <Draggable draggableId={item.name} key={`index-${index}`} index={index}>
                {
                  (provider) =>(
                    <div key={index} ref={provider.innerRef} {...provider.draggableProps}>
                      <table border='1'>  
                      <tr>
                        <th {...provider.dragHandleProps}><DehazeIcon /></th><th>Email:-----</th><th>{item.email}</th>
                      </tr>
                      </table>
                    </div>
                  )
                }
              </Draggable>
            ))}
        </div>
        )}
    </Droppable>
   </DragDropContext>
  );
}

export default App;
