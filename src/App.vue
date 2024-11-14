<template>
  <div class="w-full h-screen p-5 flex flex-col gap-5 items-center">
    <section class="flex flex-col gap-2 items-center w-[540px]">
      <h1 class="text-3xl font-bold" >
        To do list
      </h1>
      <div class="flex flex-row gap-3 w-full">
        <input type="text" placeholder="Write a new task" v-model="task" @keyup.enter="sendTask"
          class="w-full text-black placeholder:text-black/80 font-medium p-2 border-2 border-black/50 rounded-md outline-none" 
        />

        <button @click="sendTask"
          class="w-max bg-green-500 font-bold px-4 py-1 rounded-md ">
          Add
        </button>
      </div>
    </section>

    <!-- Contenedor para ver las tareas -->
    <section v-if="thereTask" class="bg-black/50 p-5 rounded-xl flex flex-col gap-5 w-[540px]" >
     
        <TaskItem v-for="(task, index) in tasks" :key="index" 
        :task="task" 
        :index="index" 
        :checkTask="checkTask" 
        :deleteTask="deleteTask" />

    </section>
    <h3 v-else class="text-4xl font-bold" >
      ¡There are no tasks!
    </h3>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {taskManager} from '@/services/taskManager'
import TaskItem from '@/components/TaskItem.vue'

const tasks = ref([] as Task[])

// Hacemos que el componente se monte y obtenga las tareas guardadas,
// además de que se actualice cada vez que se agrega una nueva tarea
onMounted(() => {
  tasks.value = taskManager.getTasks()
})

const task= ref<string>('')

const sendTask = () => {

  if(task.value === ''){
    window.alert('You must write a task')
    return
  }

  const newTask = {
    id: Date.now(),
    title: task.value,
    completed: false
  }
  taskManager.addTask(newTask)
  tasks.value = [...taskManager.getTasks()]
  task.value = ''
}

const deleteTask = (id:number) => {
  taskManager.deleteTask(id)
  tasks.value = [...taskManager.getTasks()]
}

const checkTask = (id: number) => {
  taskManager.checkTask(id)
  tasks.value = [...taskManager.getTasks()]
}

const thereTask = computed(() => {
  return tasks.value.length > 0
})

</script>
