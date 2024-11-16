<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher<{
    amountChange: number;
  }>();
  
  export let amount: number;
  
  function handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    if (!isNaN(value) && value >= 0) {
      dispatch('amountChange', value);
    }
  }
</script>

<div class="w-full mb-8">
  <label for="amount" class="block text-sm font-medium text-gray-700 mb-2">
    Payment Amount
  </label>
  <div class="relative rounded-xl overflow-hidden shadow-sm">
    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <span class="text-gray-500 text-lg font-medium">$</span>
    </div>
    <input
      type="number"
      name="amount"
      id="amount"
      class="block w-full pl-10 pr-20 py-4 text-lg border-0 focus:ring-2 focus:ring-indigo-500 bg-white bg-opacity-50 backdrop-blur-sm"
      placeholder="0.00"
      min="0"
      step="0.01"
      value={amount}
      on:input={handleInput}
    />
    <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
      <span class="text-gray-500 font-medium">USD</span>
    </div>
  </div>
</div>