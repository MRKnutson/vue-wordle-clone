<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  word: {
    type: String,
    required: true,
  },
  guess: {
    type: String,
    required: true,
  },
  isGuessed: {
    type: Boolean,
    required: true,
  },
});
</script>
<template>
  <div class="guess-grid">
    <div
      v-for="(letter, index) in props.guess"
      :key="index"
      class="letter-box"
      :class="{
        notGuessed: !isGuessed,
        correct: isGuessed && letter === word[index],
        close: isGuessed && word.includes(letter) && letter !== word[index],
        wrong: isGuessed && !word.includes(letter),
      }"
    >
      {{ letter }}
    </div>
  </div>
</template>

<style scoped>
.guess-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.letter-box {
  height: 2.5rem;
  width: 2.5rem;
  border: 1px solid gray;
  margin: 0.15rem;
  color: white;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
}
.notGuessed {
  background-color: black;
}

.correct {
  background-color: green;
}

.close {
  background-color: rgb(185, 185, 39);
}

.wrong {
  background-color: black;
}
</style>
