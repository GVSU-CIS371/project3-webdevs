<template>
  <div>
    <Beverage :isIced="currentTemp === 'Cold'" :beverage="currentBase" :creamer="currentCreamer" :syrup="currentSyrup"/>
    <ul>
      <li>
        <span>Temperature: </span>
        <template v-for="temp in temps" :key="temp">
          <label>
            <input
              type="radio"
              name="temperature"
              :id="`r${temp}`"
              :value="temp"
              v-model="currentTemp"
            />
            {{ temp }}
          </label>
        </template>
      </li>
      <li>
        <span>Creamer: </span>
        <template v-for="creamer in creamers" :key="creamer">
          <label>
            <input
              type="radio"
              name="creamer"
              :id="`r${creamer}`"
              :value="creamer"
              v-model="currentCreamer"
            />
            {{ creamer }}
          </label>
        </template>
      </li>
      <li>
        <span>Syrup: </span>
        <template v-for="syrup in syrups" :key="syrup">
          <label>
            <input
              type="radio"
              name="syrup"
              :id="`r${syrup}`"
              :value="syrup"
              v-model="currentSyrup"
            />
            {{ syrup }}
          </label>
        </template>
      </li>
      <li>
        <span>Base: </span>
        <template v-for="base in bases" :key="base">
          <label>
            <input
              type="radio"
              name="base"
              :id="`r${base}`"
              :value="base"
              v-model="currentBase"
            />
            {{ base }}
          </label>
        </template>
      </li>
    </ul>

    
  </div>
  <input v-model="recipeName" placeholder="Recipe name">
  <button @click="updateRecipeStore({
    temp: currentTemp,
    creamer: currentCreamer,
    syrup: currentSyrup,
    base: currentBase, 
    name: recipeName
  })">
    Make beverage
  </button>

  <ul>
    <li v-for="recipe in recipeStore.recipes" :key="recipe.name">
      <div 
        class="bev-li" 
        @click="() => {
          currentTemp = recipe.temp;
          currentCreamer = recipe.creamer;
          currentSyrup = recipe.syrup;
          currentBase = recipe.base;
          recipeName = recipe.name;
        }"
      >
        {{ recipe.name }}
      </div>
    </li>
  </ul>



</template>

<script setup lang="ts">
import { ref } from "vue";
import Beverage from "./components/Beverage.vue";
import {useRecipeStore} from "./RecipeStore";
import {Recipe} from "./RecipeStore"

// Define reactive data
const temps = ref(["Hot", "Cold"]);
const creamers = ref(["None", "Milk", "Cream", "Half & Half"]);
const syrups = ref(["None", "Vanilla", "Caramel", "Hazelnut"]);
const bases = ref(["Coffee", "Green Tea", "Black Tea"]);

const currentTemp = ref("Hot");
const currentCreamer = ref("None");
const currentSyrup = ref("None");
const currentBase = ref("Coffee");
const recipeName = ref(""); // for name textbox

const recipeStore = useRecipeStore();
const updateRecipeStore = (recipe: Recipe) => {
  recipeStore.$patch((state) => state.recipes.push(recipe));
  recipeName.value = "";
}
</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}
ul {
  list-style: none;
}
span {
  font-weight: bold
}
.recipe-li {
  
}
</style>

