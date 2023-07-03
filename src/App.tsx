import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
const dataInital = [
  { id: 1, name: "John1" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Bob" },
];
interface Item {
  id: number;
  name: string;
}

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);
  console.log("rendered");
  const [data, setData] = useState<Array<Item>>(dataInital);

  const handleDelete = (index: number) => {
    const newData = data.filter((item, i) => i !== index);
    setData(newData);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete" && selected !== null) {
        handleDelete(selected);
        setSelected(null);
      }
    };

    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleDelete]);

  const items = data.map((item, index) => (
    <>
      <span className="video-spacer" key={item.id + "spacer"}></span>
      <div
        className={index === selected ? "video selected" : "video"}
        key={item.id}
        onClick={() => setSelected(index)}
      >
        {item.name}
      </div>
    </>
  ));

  return <div className="container">{items}</div>;
};

export default App;
