import { getTasksList } from "../../services/Tasks";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../../services/database";

export async function GET() {
  // const tasksList = await getTasksList()
  try {
    const tasksList = await getTasks();
    return new Response(JSON.stringify({ tasksList }));
  } catch {
    return new Response(JSON.stringify({ error: Error }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { description, completed } = await req.json();
    const newTask = await addTask(description, completed);
    return new Response(JSON.stringify({ newTask }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// export async function GET() {
//   const tasksList = await getTasksList()
//   return new Response(
//     JSON.stringify({
//       tasksList
//     })
//   )
// }
