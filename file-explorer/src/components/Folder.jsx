import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import "./Folder.css";

const Folder = ({ handleAddItem, explorerData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [addType, setAddType] = useState();

  const handleClick = (id) => {
    setIsExpanded(!isExpanded);
  };

  const handleAdd = (e, type) => {
    setShowInput(true);
    setIsExpanded(true);
    setAddType(type);
  };

  const handleAddNewItem = (e, id) => {
    if (e.keyCode === 13 && e.target.value) {
      handleAddItem(id, e.target.value, addType); // Ensure this function is called
      setShowInput(false);
    }
  };

  return (
    <div>
      <div className="name-container">
        <span className="name" id={explorerData.id} onClick={() => handleClick(explorerData.id)}>
          {explorerData.type === "folder" ? "🗂️" : "📄"}{explorerData.name}
        </span>
        {explorerData.type === "folder" && (
          <span className='button-group'>
            <button style={{ border: "none", background: "none" }} onClick={(e) => handleAdd(e, "folder")}>
              <FontAwesomeIcon icon={faFolderPlus} />
            </button>
            <button style={{ border: "none", background: "none" }} onClick={(e) => handleAdd(e, "file")}>
              <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
          </span>
        )}
      </div>
      {showInput && (
        <>
          <span>{addType === "file" ? "📄" : "🗂️"}</span>
          <input
            autoFocus
            onKeyDown={(e) => handleAddNewItem(e, explorerData.id)}
            onBlur={() => setShowInput(false)}
            type="text"
          />
        </>
      )}
      {explorerData.children && isExpanded && explorerData.children.map((data, index) => (
        <div key={index} style={{ marginLeft: "10px" }}>
          <Folder handleAddItem={handleAddItem} explorerData={data} />
        </div>
      ))}
    </div>
  );
};

export default Folder;
