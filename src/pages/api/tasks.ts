import type { APIContext } from "astro";
// import { getTasksList } from "../../services/Tasks";
import {
  addTask,
  getTasks,
  updateTask,
  deleteCompletedTasks,
} from "../../services/database";
import Datastore from "nedb-promises";

export async function GET() {
  // const tasksList = await getTasksList()
  try {
    const tasksList = await getTasks();
    return new Response(JSON.stringify({ tasksList }));
  } catch {
    return new Response(JSON.stringify({ error: Error }), { status: 500 });
  }
}

export async function POST(context: APIContext) {
  try {
    const { description, completed } = await context.request.json();
    const newTask = await addTask(description, completed);
    return new Response(JSON.stringify({ newTask }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(context: APIContext) {
  deleteCompletedTasks()
  return new Response(JSON.stringify({}))
}

// export async function GET() {
//   const tasksList = await getTasksList()
//   return new Response(
//     JSON.stringify({
//       tasksList
//     })
//   )
// }
