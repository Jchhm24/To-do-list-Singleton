import { ref, type Ref} from 'vue'
import TaskFactory , {type Task} from '@/factories/TaskFactory'

class TaskManager {

    private static instance : TaskManager
    private tasks : Ref<Task[]> = ref([])
    private listeners : Array< () => void> = []

    private constructor() {}

    //Método para obtener la única instancia de la clase TaskManager
    public static getInstance() : TaskManager {
        // Si la instancia no existe entonces lo creamos
        if(!TaskManager.instance) {
            TaskManager.instance = new TaskManager()
        }
        return TaskManager.instance
    }

    public addTask(title: string): void {
        const newTask = TaskFactory.createTask(title)
        this.tasks.value.push(newTask)
        this.notify()

    }

    public deleteTask(taskId: number): void {
        this.tasks.value = this.tasks.value.filter(
            task => task.id !== taskId
        )
        this.notify()
    }

    public checkTask(taskId: number): void {
        this.tasks.value = this.tasks.value.map(
            task => {
                if(task.id === taskId) {
                    task.completed = !task.completed
                }
                return task
            }
        )
    }

    public getTasks() : Ref<Task[]> {
        return this.tasks
    }

    // TODO: Usando los observadores
    // listener para observar los cambios en la lista de tareas
    public subscribe(listener: () => void):  void{
        this.listeners.push(listener)
    }

    // listener para dejar de observar los cambios en la lista de tareas
    public unsubscribe(listener : () => void): void {
        this.listeners =  this.listeners.filter(
            l => l !== listener
        )
    }

    // TODO: Fin de los observadores


    // Este método es para notificar a los listeners que se ha actualizado la lista de tareas
    private notify(): void {
        this.listeners.forEach(listener => listener())
    }

}

export const taskManager = TaskManager.getInstance();
