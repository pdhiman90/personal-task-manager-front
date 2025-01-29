// import { useState } from "react";
// import {addTasks,updateTask,AllTasks} from "../API/services";

// // interface Task {
// //   title: string;
// //   description: string;
// //   priority: string;
// //   dueDate: string;
// //   category: string;
// //   completed: boolean;
// // }

// function TaskForm() {
//   const [tasks, setTasks] = useState<any>([]);
//   const [id, setId] = useState<string>("");
//   const [taskTitle, setTaskTitle] = useState<string>("");
//   const [taskDescription, setTaskDescription] = useState<string>("");
//   const [priority, setPriority] = useState<string>("Medium");
//   const [dueDate, setDueDate] = useState<string>("");
//   const [category, setCategory] = useState<string>("");
//   const [completed, setCompleted] = useState<boolean>(false);

//   console.log(completed,"tasks");
//   const token = localStorage.getItem("Token");

//   const addTask = async() => {
//     if (!taskTitle) return;
    
//     const payload: any= {
//       title: taskTitle,
//       description: taskDescription,
//       priority,
//       dueDate,
//       category,
//       completed: false,
//     };
    
//     const result = await addTasks(payload,token);

//     console.log(result?.data.data.title,"result");

 
//       const alltasks = await AllTasks(token);
//       console.log(alltasks.data.data,"alltasks");


//     setTasks(alltasks.data.data.tasks);
//     setId(result?.data.data._id);
//     setTaskTitle("");
//     setTaskDescription("");
//     setPriority("Medium");
//     setDueDate("");
//     setCategory("");
//     console.log(tasks,"tasks");
//   };

//   // const deleteTask = (id: number) => {
//   //   // setTasks(tasks.filter((task) => task.id !== id));
//   // };

//   // const toggleComplete = (id: string) => {
//   //   setTasks(
//   //     tasks.map((task:any) =>
//   //       task.id === id ? { ...task, completed: !task.completed } : task
//   //     )
//   //   );
//   // };

//   // const updateTaskStatus = async (taskId: string, completed: boolean) => {
//   //   try {
//   //     const result = await updateTask(taskId, completed,token);
//   //     console.log(result,"result");
//   //     setCompleted(completed);
//   //   } catch (error) {
//   //     console.error("Error updating task status:", error);
//   //   }
//   // };
  

//   const updateTaskStatus = async (taskId: string, completed: boolean) => {
//     try {
//       await updateTask(taskId, completed, token);
//       const alltasks = await AllTasks(token); // Fetch updated tasks list
//       setTasks(alltasks.data.data.tasks); // Update state with latest tasks
//     } catch (error) {
//       console.error("Error updating task status:", error);
//     }
//   };
  

//   const getTasksByPriority = (priorityLevel: string) => {
//     return tasks.filter((task:any) => task.priority === priorityLevel).length;
//   };

//   const completedTasks = tasks.filter((task:any) => task.completed).length;
//   const completionRate = tasks.length
//     ? ((completedTasks / tasks.length) * 100).toFixed(1)
//     : 0;

//   return (
//    token&& <div className="p-6 flex flex-col md:flex-row gap-6 font-roboto">
//       <div className="w-full md:w-2/3">
//         <div className="bg-white rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-6 mb-6">
//           <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
//           <div className="space-y-4">
//             <input
//               type="text"
//               name="title"
//               placeholder="Task Title"
//               className="w-full p-2 border rounded"
//               value={taskTitle}
//               onChange={(e) => setTaskTitle(e.target.value)}
//             />
//             <textarea
//               name="description"
//               placeholder="Task Description"
//               className="w-full p-2 border rounded h-24"
//               value={taskDescription}
//               onChange={(e) => setTaskDescription(e.target.value)}
//             />
//             <select
//               name="priority"
//               className="w-full p-2 border rounded"
//               value={priority}
//               onChange={(e) => setPriority(e.target.value)}
//             >
//               <option>Low</option>
//               <option>Medium</option>
//               <option>High</option>
//             </select>
//             <input
//               type="date"
//               name="dueDate"
//               className="w-full p-2 border rounded"
//               value={dueDate}
//               onChange={(e) => setDueDate(e.target.value)}
//             />
//             <input
//               type="text"
//               name="category"
//               placeholder="Category"
//               className="w-full p-2 border rounded"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             />
//             <button
//               onClick={addTask}
//               className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
//             >
//               Add Task
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-6">
//           <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
//           {tasks.length === 0 ? (
//             <p>No tasks yet. Add a task to get started!</p>
//           ) : (
//             <div className="space-y-4">
//               {tasks.map((task:any) => (
//                 <div
//                   key={task._id}
//                   className="border p-4 rounded flex items-center justify-between"
//                 >
//                   <div className="flex items-center gap-4">
//                     <input
//                       type="checkbox"
//                       checked={completed}
//                       onChange={() => updateTaskStatus(task._id, !completed)
//                       }
//                       className="w-5 h-5"
//                     />
//                     <div>
//                       <h3
//                         className={`font-bold ${completed ? "line-through" : ""}`}
//                       >
//                         {task.title}
//                       </h3>
//                       <p className="text-gray-600">{task.description}</p>
//                       <div className="flex gap-2 mt-2">
//                         <span
//                           className={`px-2 py-1 rounded text-sm ${
//                             task.priority === "High"
//                               ? "bg-red-100 text-red-800"
//                               : task.priority === "Medium"
//                               ? "bg-yellow-100 text-yellow-800"
//                               : "bg-green-100 text-green-800"
//                           }`}
//                         >
//                           {task.priority}
//                         </span>
//                         <span className="px-2 py-1 bg-gray-100 rounded text-sm">
//                           {task.dueDate.split("T")[0]}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <button
//                     // onClick={() => deleteTask(task.id)}
//                     className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="w-full md:w-1/3 space-y-6">
//         <div className="bg-white rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-6">
//           <h2 className="text-2xl font-bold mb-4">Calendar - January</h2>
//           <div className="bg-gray-50 p-4 rounded">Calendar placeholder</div>
//         </div>

//         <div className="bg-white rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-6">
//           <h2 className="text-2xl font-bold mb-4">Task Analytics</h2>
//           <div className="space-y-4">
//             <div>
//               <h3 className="font-bold mb-2">Task Completion Rate</h3>
//               <div className="w-full bg-gray-200 rounded-full h-2.5">
//                 <div
//                   className="bg-black h-2.5 rounded-full"
//                   style={{ width: `${completionRate}%` }}
//                 ></div>
//               </div>
//               <p className="mt-2">
//                 {completedTasks} out of {tasks.length} tasks completed (
//                 {completionRate}%)
//               </p>
//             </div>
//             <div>
//               <h3 className="font-bold mb-2">Task Breakdown</h3>
//               <div className="space-y-1">
//                 <p className="text-red-600">
//                   High Priority: {getTasksByPriority("High")}
//                 </p>
//                 <p className="text-yellow-600">
//                   Medium Priority: {getTasksByPriority("Medium")}
//                 </p>
//                 <p className="text-green-600">
//                   Low Priority: {getTasksByPriority("Low")}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TaskForm;


import { useState, useEffect } from "react";
import { addTasks, updateTask, AllTasks, deleteTask } from "../API/services";
import { jwtDecode } from "jwt-decode";

function TaskForm() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [priority, setPriority] = useState<string>("Medium");
  const [dueDate, setDueDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const token = localStorage.getItem("Token");

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  // Fetch all tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      if (token) {
        const alltasks = await AllTasks(token);
        setTasks(alltasks.data.data.tasks || []);
      }
    };
    fetchTasks();
  }, [token]);

  const addTask = async () => {
    if (!taskTitle) return;

    const payload = {
      title: taskTitle,
      description: taskDescription,
      priority,
      dueDate,
      category,
      completed: false,
    };

    try {
      const result = await addTasks(payload, token);
      const newTask = result?.data.data;
      setTasks((prevTasks) => [...prevTasks, newTask]); // Append new task

      // Reset form fields
      setTaskTitle("");
      setTaskDescription("");
      setPriority("Medium");
      setDueDate("");
      setCategory("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTaskStatus = async (taskId: string, completed: boolean) => {
    try {
      await updateTask(taskId, completed, token);
      const alltasks = await AllTasks(token);
      setTasks(alltasks.data.data.tasks || []); // Refresh tasks
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const getTasksByPriority = (priorityLevel: string) => {
    return tasks.filter((task: any) => task.priority === priorityLevel).length;
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId, token);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const completedTasks = tasks.filter((task: any) => task.completed).length;
  const completionRate = tasks.length
    ? ((completedTasks / tasks.length) * 100).toFixed(1)
    : 0;

  return (
    token && (
      <div className="p-6 flex flex-col md:flex-row gap-6 font-roboto">
        <div className="w-full md:w-2/3">
          {/* Add Task Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                className="w-full p-2 border rounded"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <textarea
                placeholder="Task Description"
                className="w-full p-2 border rounded h-24"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
              <select
                className="w-full p-2 border rounded"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <input
                type="text"
                placeholder="Category"
                className="w-full p-2 border rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <button
                onClick={addTask}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Add Task
              </button>
            </div>
          </div>

          {/* Task List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
            {tasks.length === 0 ? (
              <p>No tasks yet. Add a task to get started!</p>
            ) : (
              <div className="space-y-4">
                {tasks.map((task: any) => (
                  <div
                    key={task._id}
                    className="border p-4 rounded flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => updateTaskStatus(task._id, !task.completed)}
                        className="w-5 h-5"
                      />
                      <div>
                        <h3 className={`font-bold ${task.completed ? "line-through" : ""}`}>
                          {task.title}
                        </h3>
                        <p className="text-gray-600">{task.description}</p>
                        <div className="flex gap-2 mt-2">
                          <span
                            className={`px-2 py-1 rounded text-sm ${
                              task.priority === "High"
                                ? "bg-red-100 text-red-800"
                                : task.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {task.priority}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                            {task.dueDate.split("T")[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                   {task.completed && <button
                   onClick={() => handleDeleteTask(task._id)}
                    className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
                  >
                    Delete
                  </button>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Analytics Section */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Task Analytics</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-2">Task Completion Rate</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-black h-2.5 rounded-full"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
                <p className="mt-2">
                  {completedTasks} out of {tasks.length} tasks completed ({completionRate}%)
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Task Breakdown</h3>
                <div className="space-y-1">
                  <p className="text-red-600">High Priority: {getTasksByPriority("High")}</p>
                  <p className="text-yellow-600">Medium Priority: {getTasksByPriority("Medium")}</p>
                  <p className="text-green-600">Low Priority: {getTasksByPriority("Low")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default TaskForm;
