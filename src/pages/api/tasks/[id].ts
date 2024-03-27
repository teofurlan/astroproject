import type { APIContext, APIRoute } from "astro";
import { toggleTask } from "../../../services/Tasks";
import { updateTask } from "../../../services/database";

export const PATCH: APIRoute = async ({ params }) => {
  const id = params.id;
  console.log(id);
//   const modifiedTask = await toggleTask(id);
  updateTask(id);

  return new Response(
    JSON.stringify({ message: "This was a put at" + params.id })
  );
};
