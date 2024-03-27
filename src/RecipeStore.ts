import { defineStore } from 'pinia';

type Recipe = {
    name: string,
    temp: string,
    beverage: string,
    creamer: string,
    syrup: string
}

export const useRecipeStore = defineStore('RecipeStore', {
    state: () => {
        return {
            recipes: [] as Recipe[]
        };
    }
})
