<script lang="ts" setup>
import QwertyBoard from "./components/QwertyBoard.vue";
import GuessLine from "./components/GuessLine.vue";
import { useGuessLists } from "./stores/guessLists";
import { onBeforeMount, onMounted, onUnmounted } from "vue";

const store = useGuessLists();

onBeforeMount(() => {
  store.init();
});

onMounted(() => {
  window.addEventListener("keyup", store.handleKeyup);
});

onUnmounted(() => {
  window.removeEventListener("keyup", store.handleKeyup);
});
</script>

<template>
  <div class="wrapper">
    <h1 class="title">Wordle</h1>
    <GuessLine
      v-for="(guess, index) in store.iterableGuesses"
      :key="index"
      :word="store.word"
      :guess="guess"
      :isGuessed="index < store.currentGuess"
    />
    <QwertyBoard />
    <h1 v-if="store.won">You Won!</h1>
    <h1 v-if="store.lost">You Lost!</h1>
    <button v-if="store.won || store.lost" @click="store.init" class="button">
      Play Again
    </button>
  </div>
</template>

<style>
#app {
  background-color: rgb(89, 95, 114);
  min-width: 100vh;
  min-height: 100vh;
  margin: -1.4rem -0.5rem;
}

.button {
  font-size: 1.25rem;
  margin: 0;
  border-radius: 0.5rem;
  padding: 0.35rem 0.9rem;
  background-color: rgb(51, 51, 239);
  color: whitesmoke;
}

.title {
  margin-bottom: 0;
  font-size: 5rem;
  font-weight: bold;
  text-transform: uppercase;
  background-clip: text;
  background: linear-gradient(
    45deg,
    rgba(3, 65, 172, 1) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.wrapper {
  padding-top: 3vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
