import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [
            { id: 1, title: "buy milk", isFav: false }
        ]
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
        addTask(task: { id: number; title: string; isFav: boolean; }) {
            this.tasks.push(task);
        },
        deleteTask(id: number) {
            this.tasks = this.tasks.filter(t => {
                return t.id !== id
            })
        },
        toggleFav(id: number) {
            let task = this.tasks.find(t => t.id === id)
            if (!task) throw Error;
            task.isFav = !task.isFav
        }
    }
})