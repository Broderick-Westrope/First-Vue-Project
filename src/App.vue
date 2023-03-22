<template>
    <main>
        <!-- heading -->
        <header>
            <img src="./assets/things3-logo.png" alt="things3 logo">
            <h1>My Tasks</h1>
        </header>

        <!-- new task form -->
        <div class="new-task-form">
            <TaskForm />
        </div>

        <!-- filter  -->
        <nav class="filter">
            <button @click="filter = 'all'">All tasks</button>
            <button @click="filter = 'favs'">Favourite tasks</button>
        </nav>

        <!-- loading -->
        <div class="loading" v-if="isLoading">Loading tasks...</div>

        <!-- task list -->
        <div class="task-list" v-if="filter === 'all'">
            <h2>{{ totalCount }} tasks left</h2>
            <div v-for="task in tasks">
                <TaskDetails :task="task" />
            </div>
        </div>
        <div class="task-list" v-else-if="filter === 'favs'">
            <h2>{{ favCount }} favourite tasks left</h2>
            <div v-for="task in favs">
                <TaskDetails :task="task" />
            </div>
        </div>

        <button @click="taskStore.$reset">reset</button>
    </main>
</template>

<script setup lang="ts">
import { useTaskStore } from './stores/taskStore'
import TaskDetails from './components/TaskDetails.vue'
import TaskForm from './components/TaskForm.vue'
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const taskStore = useTaskStore()

const { tasks, isLoading, favs, totalCount, favCount } = storeToRefs(taskStore)

taskStore.getTasks()

const filter = ref('all')
</script>

<style scoped></style>