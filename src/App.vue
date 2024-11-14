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
     
      <div v-for="(task, index) in tasks" :key="index"
        class="p-2 bg-neutral-900 rounded-xl flex flex-row justify-between items-center font-semibold"
      >      
        {{ numberTasks(index) }}.- {{ task.title }}

        <div class="flex flex-row gap-2" >
          <!-- TODO: Botón para marcar completa la tarea -->
          <button @click="checkTask(task.id)"
            class="bg-green-500 p-2 rounded-md"
          >
            <!-- Check -->
            <svg v-if="task.completed" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
              <path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"/>
            </svg>
            <!-- None -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
              <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/>
            </svg>
          </button>
          <!-- TODO: Botón para eliminar la tarea -->
          <button class="bg-red-600 p-2 rounded-md" @click="deleteTask(task.id)" >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z"/>
            </svg>
          </button>
        </div>
      
      </div>

    </section>
    <h3 v-else class="text-4xl font-bold" >
      ¡There are no tasks!
    </h3>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {taskManager} from '@/services/taskManager'
 
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

//Funciones extras para la parte visual, no hacer tanto caso
const thereTask = computed(() => {
  return tasks.value.length > 0
})

const numberTasks = (index: number) => {
  return index + 1
}

const checkTask = (id: number) => {
  taskManager.checkTask(id)
  tasks.value = [...taskManager.getTasks()]
}

</script>
