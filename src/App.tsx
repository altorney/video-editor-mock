import { useState, useEffect, Fragment } from "react";
import "./App.css";
import { MemoizedVideoSpacer } from "./videoSpacer";
const dataInital = [
  { id: 1, name: "John1" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Bob" },
  { id: 4, name: "Bob2" },
];
interface Item {
  id: number;
  name: string;
}

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [data, setData] = useState<Array<Item>>(dataInital);

  const handleDelete = (index: number) => {
    const newData = data.filter((item, i) => i !== index);
    setData(newData);
  };

  const handleClick = (index: number) => {
    if (!selected) {
      setSelected(index);
    } else {
      setSelected(null);
    }
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
    <Fragment key={item.id + "fragment"}>
      <MemoizedVideoSpacer key={item.id + "spacer"} />
      <div
        className={index === selected ? "video selected" : "video"}
        key={item.id}
        onClick={() => handleClick(index)}
      >
        {item.name}
      </div>
    </Fragment>
  ));

  return <div className="container">{items}</div>;
};

export default App;
