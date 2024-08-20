import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faEdit as fasEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash as fasTrash } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const Items = () => {
  const [itemList, setItem] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(itemList));
  }, [itemList]);

  const addItem = (item) => {
    if (isEditing) {
      setItem(
        itemList.map((el) =>
          el.id == currentItem.id ? { ...el, item: item } : el
        )
      );
      setIsEditing(false);
      setCurrentItem(null);
    } else {
      const newItem = {
        id: Math.random(),
        item: item,
      };

      setItem([...itemList, newItem]);
    }

    setInput("");
  };

  const deleteItems = (id) => {
    const newList = itemList.filter((item) => item.id !== id);
    setItem(newList);
  };

  const editItem = (item) => {
    setIsEditing(true);
    setInput(item.item);
    setCurrentItem(item);
  };

  const clearAll = () => {
    setItem([]);
  };
  return (
    <div className="container">
      <input
        className="input"
        type="text"
        value={input}
        placeholder="enter item"
        onChange={(e) => setInput(e.target.value)}></input>
      <button className="addBtn" onClick={() => addItem(input)}>
        {isEditing ? "Update" : "Submit"}
      </button>
      <ul>
        {itemList.map((item) => (
          <li key={item.id}>
            {item.item}
            <div className="li_btns">
              <button className="edit_btn" onClick={() => editItem(item)}>
                <FontAwesomeIcon icon={fasEdit} />
              </button>
              <button
                className="delete_btn"
                onClick={() => deleteItems(item.id)}>
                <FontAwesomeIcon icon={fasTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className="clearAllBtn" onClick={clearAll}>
        clear List
      </button>
    </div>
  );
};

export default Items;
