type Task = {
    id : number,
    title : string,
    completed : boolean
}

class TaskManager {

    private static instance : TaskManager
    private tasks : Task[] = []

    private constructor() {}

    // Método para obtener la única instancia de la clase
    public static getInstance() : TaskManager {
        // Si la instancia no existe entonces lo creamos
        if(!TaskManager.instance) {
            TaskManager.instance = new TaskManager()
        }
        return TaskManager.instance
    }

    public addTask(task: Task): void {
        this.tasks.push(task)
    }

    public deleteTask(taskId: number): void {
        this.tasks = this.tasks.filter(
            tasks => tasks.id !== taskId
        )
    }

    public checkTask(taskId: number): void {
        this.tasks = this.tasks.map(
            task => task.id === taskId ? {...task, completed: !task.completed} : task
        )
    }

    public getTasks() : Task[]{
        return this.tasks
    }

}

export const taskManager = TaskManager.getInstance();