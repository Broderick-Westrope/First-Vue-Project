
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

        <!-- task list -->
        <div class="task-list" v-if="filter === 'all'">
            <h2>{{ taskStore.totalCount }} tasks left</h2>
            <div v-for="task in taskStore.tasks">
                <TaskDetails :task="task" />
            </div>
        </div>
        <div class="task-list" v-else-if="filter === 'favs'">
            <h2>{{ taskStore.favCount }} favourite tasks left</h2>
            <div v-for="task in taskStore.favs">
                <TaskDetails :task="task" />
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useTaskStore } from './stores/taskStore'
import TaskDetails from './components/TaskDetails.vue'
import TaskForm from './components/TaskForm.vue'
import { ref } from 'vue';

const taskStore = useTaskStore()

const filter = ref('all')
</script>

<style scoped></style>