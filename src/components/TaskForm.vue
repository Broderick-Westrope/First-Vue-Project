<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="I need to..." v-model="newTask">
        <button>Add</button>
    </form>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore';
import { ref } from 'vue';

const taskStore = useTaskStore()
const newTask = ref('')

function handleSubmit() {
    //TODO: change to use unique ids (3rd party library or uuid)?
    if (newTask.value.length > 0) {
        taskStore.addTask({ id: Math.floor(Math.random() * 100000), title: newTask.value, isFav: false })
    }
    newTask.value = ''
}
</script>

<style scoped></style>