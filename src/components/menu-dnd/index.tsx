import React, { useEffect, useState, useCallback, useMemo } from "react";
import MyIcon from "@/components/icon";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link, useHistory } from "react-router-dom";
import "./index.less";
import { OpenedMenu } from "@/types"
import { message } from "antd";
import ContextMenu from "../contextMenu";
import { useDispatchMenu, useStateCurrentPath, useStateOpenedMenu } from "@/store/hooks";
// Re-record array order
const reorder = (list: OpenedMenu[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  //delete and record, delete element 1
  const [removed] = result.splice(startIndex, 1);
  //Add the original element to the array
  result.splice(endIndex, 0, removed);
  return result;
};

export default function MenuDnd() {
  const history = useHistory();
  const [data, setData] = useState<OpenedMenu[]>([]);
  const [contextMenuVisible, setVisible] = useState(false)
  const [currentItem, setCurrentItem] = useState<OpenedMenu | null>(null)
  const [point, setPoint] = useState({ x: 0, y: 0 })

  // state
  const openedMenu = useStateOpenedMenu()
  const currentPath = useStateCurrentPath()
  const { stateFilterOpenMenuKey: filterOpenMenu } = useDispatchMenu()

  // Add drag and drop options according to the selected menu
  useEffect(() => {
    if (data.length !== openedMenu.length) {
      let old = [...data];
      openedMenu.forEach((item) => {
        if (!data.find((i) => i.path === item.path)) {
          old.push(item);
        }
      });
      old = old.filter((i) => openedMenu.find((item) => item.path === i.path));
      setData(old)
    }
  }, [openedMenu, data]);

  // drag end
  const onDragEnd = useCallback((result) => {
    if (!result.destination) {
      return;
    }
    // Get the data after dragging and reassign
    const newData = reorder(data, result.source.index, result.destination.index);
    setData(newData);
  }, [data]);

  // close current top menu
  const closeCurrent = useCallback((item) => {
    const newData = data.filter((i) => i.path !== item.path);
    const next = newData[newData.length - 1];
    if (next) {
      setData(newData);
    }
    const isCurrent = item.path === currentPath
    filterOpenMenu([item.path])
    if (next && isCurrent) {
      history.replace(next.path);
    } else if (isCurrent && !next) {
      history.replace("/")
    }
  }, [data, currentPath, filterOpenMenu, history]);

  // close right
  const closeRight = useCallback(() => {
    if (!currentItem) {
      return
    }
    const findIndex = data.findIndex(item => item.path === currentItem.path)
    console.log(findIndex);
    // If on the last selection close the right
    if (findIndex === data.length - 1) {
      return message.warn("No closing items on the right")
    }
    const keys = data.slice(findIndex + 1).map(i => i.path)
    console.log(keys);
    filterOpenMenu(keys)
    history.replace(currentItem.path)

  }, [currentItem, data, filterOpenMenu, history])

  // close left
  const closeLeft = useCallback(() => {
    if (!currentItem) {
      return
    }
    const findIndex = data.findIndex(item => item.path === currentItem.path)
    console.log(findIndex);
    //
    if (findIndex === 0) {
      return message.warn("No closing items on the left")
    }
    const keys = data.slice(0, findIndex).map(i => i.path)
    console.log(keys);
    filterOpenMenu(keys)
    history.replace(currentItem.path)
  }, [currentItem, data, filterOpenMenu, history])

  // close left
  const closeAll = useCallback(() => {
    const keys = data.map(i => i.path)
    console.log(keys);
    filterOpenMenu(keys)
    history.replace("/")
  }, [data, filterOpenMenu, history])

  // Right click to open the popup menu
  const onContextMenu = useCallback((e, item) => {
    const { clientX: x, clientY: y } = e
    e.stopPropagation()
    e.preventDefault()
    setVisible(true)
    setCurrentItem(item)
    setPoint({ x, y })
    return false
  }, [])

  // Right click and select close
  const onContextMenuClose = useCallback((type) => {
    switch (type) {
      case "current":
        closeCurrent(currentItem)
        break;
      case "right":
        closeRight()
        break
      case "left":
        closeLeft()
        break
      case "all":
        closeAll()
        break
      default:
        break;
    }
  }, [closeCurrent, currentItem, closeRight, closeLeft, closeAll])

  // drag list
  const DraggableList = useMemo(() => {
    if (data.length) {
      return data.map((item, index) => {
        const clsname = currentPath === item.path ? "dnd-items active" : "dnd-items"
        const iconClick: React.MouseEventHandler<HTMLSpanElement> = (e) => {
          e.preventDefault();
          e.stopPropagation();
          closeCurrent(item);
        }
        return <Draggable index={index} key={item.path} draggableId={item.path}>
          {(provided) => (
            // The style of the drag component
            <Link
              className={clsname}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onContextMenu={(e) => onContextMenu(e, item)}
              style={{ ...provided.draggableProps.style }}
              to={item.path}
            >
              {item.title}
              <MyIcon
                className="anticon-close"
                type="icon_close"
                onClick={iconClick}
              />
            </Link>
          )}
        </Draggable>
      })
    }
    return null
  }, [data, currentPath, onContextMenu, closeCurrent])

  return (<>
    <DragDropContext onDragEnd={onDragEnd}>
      {/* direction drag direction  Default Vertical Orientation, Horizontal Orientation:horizontal */}
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          // Here is the drag container, set the width and height of the container here, etc...
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="dnd-body hide-scrollbar"
          >
            {/* The components that need to be dragged are placed here, and they must be wrapped by Draggable */}
            {DraggableList}
            {/* can't delete this */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    <ContextMenu
      {...point}
      isCurrent={Boolean(currentItem && currentItem.path === currentPath)}
      onClose={onContextMenuClose}
      visible={contextMenuVisible}
      setVisible={setVisible}
    />
  </>);
}
