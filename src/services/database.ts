import Datastore from "nedb-promises";

// Define the schema for the tasks. An interface in TypeScript is a way to define the shape or structure of an object. It specifies what properties an object of this type should have.
type Task = {
  _id?: string;
  description: string;
  completed: boolean;
};

// Create and load the NeDB database
const db = Datastore.create({ filename: "src/db/database.db", autoload: true });

// Function to add a new task
export async function addTask(
  description: string,
  completed: boolean
): Promise<Task> {
  const newTask: Task = { description, completed };
  return db.insert(newTask);
}

// Function to retrieve all tasks
export async function getTasks(): Promise<Task[]> {
  return await db.find({});
}

// Function to update a task
export async function updateTask(id: string): Promise<void> {
  // const task = await db.findOne({ _id: id });
  const task: Task | null = await db.findOne({ _id: id });
  if (task) {
    await db.update(
      { _id: id },
      { $set: {completed: !task.completed} },
    );
  }
}

// Function to delete a task
export async function deleteCompletedTasks(): Promise<number> {
  return db.remove({ completed: true }, { multi: true });
}
