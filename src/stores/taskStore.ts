import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [{ id: 1, title: "", isFav: false }],
        isLoading: false
    }),
    getters: { 
        //? is it acceptable to declare this as the type? is there some way to have a more specific type that follows the contents of tasks?
        favs(): { id: number; title: string; isFav: boolean; }[]
        {
            return this.tasks.filter(t => t.isFav)
        },
        favCount(): number {
            return this.tasks.reduce((favCount, task) => (task.isFav ? ++favCount : favCount)
            , 0)
        },
        totalCount: (state) => {return state.tasks.length}
    },
    actions: {
        async getTasks() {
            this.isLoading = true;
            const response = await fetch('http://localhost:3000/tasks')
            const data = await response.json()

            this.tasks = data;
            this.isLoading = false;
        },
        async addTask(task: { id: number, title: string, isFav: boolean }) {
            this.tasks.push(task);

            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-Type': 'application/json'}
            })
        },
        async deleteTask(id: number) {
            this.tasks = this.tasks.filter(t => {
                return t.id !== id
            })

            const response = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'DELETE'
            })
        },
        async toggleFav(id: number) {
            let task = this.tasks.find(t => t.id === id)
            if (!task) throw Error;
            task.isFav = !task.isFav

            const response = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'PATCH',
                body: JSON.stringify({isFav: task.isFav}),
                headers: {'Content-Type': 'application/json'}
            })

        }
    }
})