export type Task = {
    id : number,
    title : string,
    completed : boolean
}

class TaskFactory {

    public static createTask(title: string): Task {
        const id = Date.now()
        
        return {
            id,
            title,
            completed: false
        }
    }
}

export default TaskFactory