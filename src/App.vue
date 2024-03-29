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

    <!--
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
-->

<!--I dont understand why recipeName, makeBeverage, recipeStore, and makeBeverage all have errors saying they aren't 
declared but they are declared below-->
<input v-model="recipeName" placeholder="Name">
<button 
  @click="updateRecipeStore({
      temp: currentTemp,
      creamer: currentCreamer,
      syrup: currentSyrup,
      base: currentBase, 
      name: recipeName
    })"
>
  Make Beverage
</button>
<ul class="recipe-ul">
  <li v-for="(recipe, index) in recipeStore.recipes" :key="index" @click="showBeverage(recipe)" :class="{'selected': recipe.name === recipeName}">
    {{ recipe.name }}
  </li>
</ul>

</div>


</template>

<script setup lang="ts">
import { ref } from "vue";
import Beverage from "./components/Beverage.vue";
import {useRecipeStore} from "./RecipeStore";
import {Recipe} from "./RecipeStore"
//import { computed } from "vue";

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

//const recipeStore = useRecipeStore();

// const makeBeverage = () => {
//   const newRecipe: Recipe = {
//     temp: currentTemp.value,
//     creamer: currentCreamer.value,
//     syrup: currentSyrup.value,
//     base: currentBase.value,
//     name: recipeName.value
//   };
//   recipeStore.addRecipe(newRecipe);
//   recipeName.value = ""; // Clear recipe name input
// };

// Display corresponding beverage based on the selected recipe
const showBeverage = (recipe: Recipe) => {
  currentTemp.value = recipe.temp;
  currentCreamer.value = recipe.creamer;
  currentSyrup.value = recipe.syrup;
  currentBase.value = recipe.base;
  recipeName.value = recipe.name;
};




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
.recipe-ul {
  //style as a card
  background-color: #f9f9f9;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-top: 20px;
}
.recipe-ul li {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
}
.selected {
  background-color: #c4c3be;
}
</style>

