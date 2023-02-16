import { defineStore } from "pinia";
import { ref, computed } from "vue";
import words from "../../words.json";

export const useGuessLists = defineStore("guessLists", () => {
  // state
  const word = ref("");
  const guesses = ref(new Array(6).fill(""));
  const currentGuess = ref(0);

  // getters
  const allGuesses = computed(() => {
    const arr = guesses.value.slice(0, currentGuess.value).join("").split("");
    return arr;
  });
  const exactGuesses = computed(() => {
    return word.value.split("").filter((letter, index) => {
      return guesses.value
        .slice(0, currentGuess.value)
        .map((g) => g[index])
        .includes(letter);
    });
  });
  const inexactGuesses = computed(() => {
    return word.value
      .split("")
      .filter((letter) => allGuesses.value.includes(letter));
  });
  const iterableGuesses = computed(() => {
    function lengthCheck(g: string): string {
      if (g.length < 5) {
        const newG: string = g + " ";
        return lengthCheck(newG);
      } else {
        return g;
      }
    }
    const newGuesses: string[] = [];
    guesses.value.forEach((guess) => {
      newGuesses.push(lengthCheck(guess));
    });
    return newGuesses;
  });
  const lost = computed(() => currentGuess.value === 6);
  const won = computed(() => {
    return guesses.value[currentGuess.value - 1] === word.value;
  });

  // actions
  function init() {
    word.value = words[Math.round(Math.random() * words.length)];
    guesses.value = new Array(6).fill("");
    currentGuess.value = 0;
  }

  function submitGuess() {
    if (words.includes(guesses.value[currentGuess.value])) {
      currentGuess.value += 1;
    }
  }

  function handleKeyup(e: KeyboardEvent | { key: string }) {
    if (won.value || lost.value) {
      return;
    }

    if (e.key === "Enter") {
      return submitGuess();
    }
    if (e.key === "Backspace") {
      guesses.value[currentGuess.value] = guesses.value[
        currentGuess.value
      ].slice(0, guesses.value[currentGuess.value].length - 1);
      return;
    }
    if (
      guesses.value[currentGuess.value].length < 5 &&
      e.key.match(/^[A-z]$/)
    ) {
      guesses.value[currentGuess.value] =
        guesses.value[currentGuess.value] + e.key.toLowerCase();
    }
  }

  return {
    word,
    guesses,
    currentGuess,
    iterableGuesses,
    lost,
    init,
    handleKeyup,
    won,
    allGuesses,
    inexactGuesses,
    exactGuesses,
  };
});
