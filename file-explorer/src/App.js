import React, { useState } from "react";
import Folder from "./components/Folder";
import { explorerData } from "./data/explorerData";

function App() {
  // Initialize data as an object, not an array
  const [data, setData] = useState(explorerData);

  const handleAddItem = (folderId, item, type) => {
    const addItemToFolder = (folder) => {
      if (folder.id === folderId) {
        return {
          ...folder,
          children: [
            ...(folder.children || []), // Ensure children is always an array
            {
              name: item,
              id: new Date().getTime().toString(), // Convert to string for consistency
              type: type,
            },
          ],
        };
      } else if (folder.children) {
        // Recursively check child folders
        return {
          ...folder,
          children: folder.children.map(addItemToFolder),
        };
      }
      return folder; // Return the folder unchanged if no match
    };

    const updatedData = addItemToFolder(data); // Update the structure with the new item
    setData(updatedData); // Update the state
  };

  return (
    <div className="App">
      <header className="App-header">
        <Folder handleAddItem={handleAddItem} explorerData={data} />
      </header>
    </div>
  );
}

export default App;
