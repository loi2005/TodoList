import style from "./AppStyle.scss";
import classNames from "classnames/bind";
import { CiCirclePlus } from "react-icons/ci";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import App, {
  tasks,
  input,
  formRef,
  inputRef,
  setInput,
  handleBtnPlus,
  btnPlus,
  selectTaskIndex,
  handleDuplicate,
  setSelectTaskIndex,
  handleEdit,
  handleDelete,
  handleToggleComplete,
} from "./index.js";
function AppToDo() {
  const cx = classNames.bind(style);
  const {
    tasks,
    input,
    selectTaskIndex,
    inputRef,
    handleAddTasks,
    formRef,
    setInput,
    handleBtnPlus,
    setSelectTaskIndex,
    btnPlus,
    handleDuplicate,

    handleEdit,
    handleDelete,
    handleToggleComplete,
  } = App();
  // const [tasks, setTasks] = useState([]);
  return (
    <div className={cx("container")}>
      <h1>📋 To-Do List</h1>
      <div onClick={handleBtnPlus} className={cx("btl-plus")}>
        <CiCirclePlus />
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            onClick={() => setSelectTaskIndex(index)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {task.text}
            {/* hien thi tat ca cac nut neu chon dung task */}
            {selectTaskIndex == index && (
              <div>
                <button onClick={(e) => handleDelete(e, index)}>
                  <FaTrashAlt />
                  delete
                </button>
                <button onClick={(e) => handleDuplicate(e, task)}>
                  <HiDocumentDuplicate />
                  Duplicate
                </button>
                <button onClick={(e) => handleToggleComplete(e, index)}>
                  <FaRegCircleCheck />
                  {task.completed ? "Hoàn tác" : "Hoàn thành"}
                </button>
                <button onClick={(e) => handleEdit(e, index)}>
                  <FaEdit />
                  Edit Task
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <form>
        <div className={cx("input-page")}>
          {btnPlus && (
            <div ref={formRef}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Enter your task..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></input>
              <button onClick={handleAddTasks}>add tasks</button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default AppToDo;
