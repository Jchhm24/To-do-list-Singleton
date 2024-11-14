<template>
    <div class=" p-2 bg-neutral-900 rounded-xl flex flex-row justify-between items-center font-semibold">
    {{ numberTasks(index) }}.- {{ task.title }}

    <div class="flex flex-row gap-2">
      <!-- Botón para marcar completa la tarea -->
      <button @click="checkTask(task.id)" class="bg-green-500 p-2 rounded-md">
        <!-- Check -->
        <svg v-if="task.completed" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
          <path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"/>
        </svg>
        <!-- None -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
          <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/>
        </svg>
      </button>
      <!-- Botón para eliminar la tarea -->
      <button class="bg-red-600 p-2 rounded-md" @click="deleteTask(task.id)">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z"/>
        </svg>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

interface Task {
  id: number
  title: string
  completed: boolean
}

const props = defineProps<{
  task: Task
  index: number
  checkTask: (id: number) => void
  deleteTask: (id: number) => void
}>()


// Funciones para el diseño
const numberTasks = (index: number) => {
  return index + 1
}
</script>