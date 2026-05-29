<script>
  import Welcome from '$lib/components/Welcome.svelte';
  import Quiz from '$lib/components/Quiz.svelte';
  import Result from '$lib/components/Result.svelte';
  import CRT from '$lib/components/CRT.svelte';
  import { questions } from '$lib/questions.js';
  import { characters } from '$lib/characters.js';

  let screen = $state('welcome');
  let answers = $state([]);

  function handleComplete(resultAnswers) {
    answers = resultAnswers;
    screen = 'result';
  }

  function handleRestart() {
    answers = [];
    screen = 'welcome';
  }
</script>

<svelte:head>
  <title>你是哪只猫娘</title>
</svelte:head>

<main>
  {#if screen === 'welcome'}
    <Welcome onStart={() => (screen = 'quiz')} />
  {:else if screen === 'quiz'}
    <Quiz {questions} onComplete={handleComplete} />
  {:else if screen === 'result'}
    <Result {answers} {questions} {characters} onRestart={handleRestart} />
  {/if}
</main>

<CRT />

<style>
  main {
    min-height: 100vh;
    max-width: 640px;
    margin: 0 auto;
    padding: 2rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>