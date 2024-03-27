
type Task = {
  id: string;
  description: string;
  completed: boolean;
};

let tasksList:Task[]
// let tasksList: Task[] = [
//   { id: "93u66", description: "Go Shoping", completed: false },
//   { id: "6082mf", description: "Refactor Backend", completed: false },
//   { id: "atbqg", description: "Add new feature to app", completed: false },
//   { id: "fasdg", description: "Add a database", completed: false },
// ];


export async function getTasksList() {
  return tasksList;
}

export async function createTask(description: string) {
  const id = Math.random().toString(36).substring(7);
  const task: Task = {
    id,
    description,
    completed: false,
  };
  tasksList.push(task);
  return task;
}

export async function deleteCompletedtasksList() {
  tasksList = tasksList.filter((element) => !element.completed);
  return tasksList;
}

export async function toggleTask(id: string) {
  const task = tasksList.find((element) => element.id === id);
  if (!task) {
    return;
  }
  task.completed = !task.completed;
  return task;
}

export async function showServerList() {
  for (let i in tasksList) {
    console.log(tasksList[i]);
  }
}
