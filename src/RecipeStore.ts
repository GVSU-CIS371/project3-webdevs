/*import { defineStore } from 'pinia';

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
*/
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
    },
    actions: {
        addRecipe(recipe: Recipe) {
            this.recipes.push(recipe);
        },
        removeRecipe(index: number) {
            this.recipes.splice(index, 1);
        }
    }
});
