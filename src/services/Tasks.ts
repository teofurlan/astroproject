type Task = {
id: string,
description: string,
completed: boolean
}


let tasksList : Task[] =  []


export async function getTasksList() {
    return tasksList
}

export async function createTask(description: string){
    const id = Math.random().toString(36).substring(7);
    const task : Task = {
        id,
        description,
        completed: false
    }
    tasksList.push(task)
    return task
}

export async function deleteCompletedtasksList() {
    tasksList = tasksList.filter(element => !element.completed)
    return tasksList
}

export async function toggleTask(id: string) {
    const task = tasksList.find(element => element.id === id)
    if (!task) {
        return
    }
    task.completed = !task.completed
    return task
}

