import { useState, useRef, useEffect } from "react";
function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [btnPlus, setBtnPlus] = useState(false);
  const [selectTaskIndex, setSelectTaskIndex] = useState(null);
  const [checkComplete, setCheckComplete] = useState(false);

  //fcous on
  const inputRef = useRef(null);
  useEffect(() => {
    if (btnPlus && inputRef.current) {
      inputRef.current.focus();
    }
  }, btnPlus);

  // hidden form
  const formRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setBtnPlus(false);
        setSelectTaskIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // btn - plus
  const handleBtnPlus = () => {
    setBtnPlus(!btnPlus);
  };

  // Thêm task
  const handleAddTasks = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      alert("Vui lòng nhập task");
      return;
    }
    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInput("");
    setBtnPlus(false);
  };

  //=================================
  const handleDuplicate = (e, task) => {
    e.stopPropagation();
    const duplicatedTask = {
      id: Date.now(),
      text: task.text,
      completed: false, // hoặc task.completed nếu muốn giữ trạng thái
    };
    setTasks([...tasks, duplicatedTask]);
    setSelectTaskIndex(null);
  };

  const handleEdit = (e, index) => {
    e.stopPropagation();
    const newText = prompt("Sửa task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[index].text = newText;
      setTasks(updatedTasks);
    }
    setSelectTaskIndex(null);
  };

  const handleDelete = (e, index) => {
    e.stopPropagation();
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setSelectTaskIndex(null);
  };

  const handleToggleComplete = (e, index) => {
    e.stopPropagation();
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    setSelectTaskIndex(null);
    setCheckComplete(!checkComplete);
  };
  console.log(checkComplete);

  return {
    tasks,
    input,
    btnPlus,
    formRef,
    inputRef,
    selectTaskIndex,
    checkComplete,
    handleAddTasks,
    setInput,
    handleBtnPlus,
    handleDuplicate,
    setSelectTaskIndex,
    handleEdit,
    handleDelete,
    handleToggleComplete,
  };
}

export default App;
