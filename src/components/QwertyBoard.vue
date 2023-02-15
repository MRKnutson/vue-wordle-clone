<script setup lang="ts">
import { useGuessLists } from "../stores/guessLists";

const store = useGuessLists();
const qwerty = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
const handleClick = (letter: string) => {
  const e = { key: letter };
  store.handleKeyup(e);
};
</script>

<template>
  <div class="container">
    <div v-for="(line, index) in qwerty" :key="index" class="row">
      <button
        v-for="(key, index) in line"
        :key="index"
        @click="handleClick(key)"
        class="key"
        :class="{
          exact: store.exactGuesses.includes(key),
          almost:
            store.inexactGuesses.includes(key) &&
            !store.inexactGuesses.includes(key),
          nope:
            store.allGuesses.includes(key) &&
            !store.exactGuesses.includes(key) &&
            store.inexactGuesses.includes(key),
        }"
      >
        {{ key }}
      </button>
    </div>
    <div class="button-container">
      <button class="fn-button">Delete</button>
      <button class="fn-button">Submit</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.row {
  display: flex;
}
.key {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  margin: 2px;
  border: 1px solid black;
  border-radius: 0.25rem;
  background-color: rgb(207, 220, 220);
  text-transform: uppercase;
}
.key:hover {
  width: 2.1rem;
  height: 2.1rem;
  margin: 1.75px;
}
.exact {
  background-color: green;
}
.almost {
  background-color: yellow;
}
.nope {
  background-color: gray;
}
.button-container {
  display: flex;
}
.fn-button {
  font-size: 1rem;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: aquamarine;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
}
.fn-button:hover {
  font-size: 1.1rem;
}
</style>
