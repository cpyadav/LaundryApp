import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


class App extends React.Component {


    onDragEnd = result =>{
        if (!result.destination) {
            return;
          }
          const new_list = reorder(
            this.props.items,
            result.source.index,
            result.destination.index
          )

         this.props.changeHandler(new_list) 
      
          
    }
  


     getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        // padding: grid * 2,
        // margin: `0 0 ${grid}px 0`,
        boxShadow: "var(--elevation-z4)",
        borderRadius: "4px",
        // change background colour if dragging
        background: isDragging ? "var(--primary)" : "var(--bg-paper)",
      
        // styles we need to apply on draggables
        ...draggableStyle
      });
      
       getListStyle = isDraggingOver => ({
        borderRadius: "4px",
        background: isDraggingOver ? "rgba(0,0,0, .1)" : "var(--bg-default)",
        // padding: grid,
        width: 250
      });


  async componentWillMount(){



  }

render(){
    return(


<DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={this.getListStyle(snapshot.isDraggingOver)}
            >
              {this.props.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.order} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={this.getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content()}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>



    )
}

}


function reorder(list, startIndex, endIndex){
    console.log(list)
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };


 

 export default App;