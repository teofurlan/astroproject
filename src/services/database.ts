import Datastore from "nedb-promises";

// Define the schema for the tasks. An interface in TypeScript is a way to define the shape or structure of an object. It specifies what properties an object of this type should have
interface Task {
  id: string;
  description: string;
  completed: boolean;
}

// Create and load the NeDB database
const db = Datastore.create({ filename: "src/db/database.db", autoload: true });

// Function to add a new task
export async function addTask(
  description: string,
  completed: boolean
): Promise<Task> {
  const id = Math.random().toString(36).substring(7);
  const newTask: Task = { id, description, completed };
  return db.insert(newTask);
}

// Function to retrieve all tasks
export async function getTasks(): Promise<Task[]> {
  return await db.find({});
}

// Function to update a task
export async function updateTask(
  id: string,
  updates: Partial<Task>
): Promise<Task | null> {
  return db.update({ id: id }, { $set: updates }, { returnUpdatedDocs: true });
}

// Function to delete a task
export async function deleteTask(id: string): Promise<number> {
  return db.remove({ id: id }, { multi: false });
}
