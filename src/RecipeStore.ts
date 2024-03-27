import { defineStore } from 'pinia';

export type Recipe = {
    temp: string,
    creamer: string,
    syrup: string,
    base: string,
    name: string,
}

export const useRecipeStore = defineStore('RecipeStore', {
    state: () => {
        return {
            recipes: [] as Recipe[]
        };
    }
});
