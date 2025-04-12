import style from "./AppStyle.scss";
import classNames from "classnames/bind";
import { CiCirclePlus } from "react-icons/ci";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import App from "./index.js";
function AppToDo() {
  const cx = classNames.bind(style);
  const {
    tasks,
    input,
    selectTaskIndex,
    inputRef,
    checkComplete,
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
  return (
    <div className={cx("container")}>
      <h1>📋 To-Do List</h1>
      <div onClick={handleBtnPlus} className={cx("btl-plus")}>
        <CiCirclePlus />
      </div>
      <ul className={cx("list-tasks")}>
        {tasks.map((task, index) => (
          <li
            className={cx("task")}
            key={index}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            <p
              className={cx("name-task")}
              onClick={() => setSelectTaskIndex(index)}
            >
              <FaRegCircle style={{ marginRight: "10px" }} size={40} />
              {task.text}
            </p>
            <span
              onClick={(e) => handleToggleComplete(e, index)}
              className={cx("icon-complete", { checked: checkComplete })}
            >
              <FaRegCircle className={cx("circle")} />
              <FaCheckCircle className={cx("check")} />
            </span>
            {/* hien thi tat ca cac nut neu chon dung task */}

            {selectTaskIndex === index && (
              <div className={cx("btn-wrapper")} ref={formRef}>
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

      {/* form */}
      <form>
        {btnPlus && (
          <div className={cx("overplay")}>
            <div ref={formRef} className={cx("form")}>
              <div className={cx("form-input-wrapper")}>
                <input
                  className={cx("input")}
                  type="text"
                  ref={inputRef}
                  placeholder="Enter your task..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                {input !== "" && (
                  <span
                    className={cx("clear-icon")}
                    onClick={() => setInput("")}
                  >
                    ✕
                  </span>
                )}
                <button className={cx("btn-add")} onClick={handleAddTasks}>
                  add tasks
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default AppToDo;
