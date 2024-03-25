import { getTasksList } from "../../services/Tasks"

export async function GET() {
  const tasksList = await getTasksList()
  return new Response(
    JSON.stringify({
      tasksList
    })
  )
}