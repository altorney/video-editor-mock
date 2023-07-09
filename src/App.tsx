import { useState, useEffect, Fragment } from "react";
import "./App.css";
import { MemoizedVideoSpacer } from "./videoSpacer";
const dataInital = [
  { id: 1, name: "video 1" },
  { id: 2, name: "video 2" },
  { id: 3, name: "video 3" },
  { id: 4, name: "video 4" },
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

  return (
    <>
      <div className="container">{items}</div> <br />
      <p>Click on a video and then the delete key to remove a video</p>
      <p>
        hover over the right border of a spacer; mouse press and drag to resize
      </p>
    </>
  );
};

export default App;
