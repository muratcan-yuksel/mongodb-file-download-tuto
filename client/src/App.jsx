import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");

  const getItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/v1/items");
      setItems(res.data.items);
      setLoading(false);
      console.log(res.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", fileInputRef.current.files[0]);
      const res = await axios.post(
        "http://localhost:3000/api/v1/items",
        formData
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadFile = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/items/download/${id}`,
        { responseType: "blob" }
      );
      const blob = new Blob([res.data], { type: res.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "file.pdf";
      // link.download = res.headers["content-disposition"].split("filename=")[1];
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <div className="addItems">
        <input
          type="text"
          placeholder="add name"
          onChange={(e) => setName(e.target.value)}
        />
        <input type="file" ref={fileInputRef} />
        <button onClick={addItem}>Add</button>
      </div>
      <div className="items">
        {items &&
          items.map((item) => (
            <div className="item" key={item._id}>
              <h3>{item.name}</h3>
              <button onClick={() => downloadFile(item._id)}>
                Download File
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
