import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import {useStore} from "./store";

export default function App() {
    const data = useStore((state) => state.data)

    const [state, handlers] = useListState(data);

    const items = state.map((item , index : number) => (
        <Draggable key={item.id} index={index} draggableId={item.name}>
            {(provided) => (
                <div
                    className={"bg-[#555] p-2 rounded shadow-lg"}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Text>{item.name}</Text>
                </div>
            )}
        </Draggable>
    ));

    return (
     <div className={"w-full h-screen flex items-center justify-center p-10 bg-[#333]"}>
         <DragDropContext
             onDragEnd={({ destination, source }) =>
                 handlers.reorder({ from: source.index, to: destination?.index || 0 })
             }
         >
             <Droppable droppableId="dnd-list" direction="vertical">
                 {(provided) => (
                     <div className={"w-full flex flex-col gap-1"} {...provided.droppableProps} ref={provided.innerRef}>
                         {items}
                         {provided.placeholder}
                     </div>
                 )}
             </Droppable>
         </DragDropContext>
     </div>
    );
}