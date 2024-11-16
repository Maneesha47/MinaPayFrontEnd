<script lang="ts">
  import type { NFCUser } from './types';
  
  export let amount: number;
  export let status: 'processing' | 'success' | 'error' = 'processing';
  export let message: string = '';
  export let user: NFCUser;
</script>

<div class="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
  <div class="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl transform transition-all">
    <div class="text-center">
      {#if status === 'processing'}
        <div class="w-24 h-24 mx-auto mb-6">
          <div class="animate-spin rounded-full h-full w-full border-4 border-indigo-500 border-t-transparent"></div>
        </div>
        <h2 class="text-2xl font-bold mb-2">Processing Payment</h2>
        <p class="text-gray-600 mb-1">Please don't remove your device</p>
        <p class="text-indigo-600 font-medium">Processing for {user.name}</p>
      {:else if status === 'success'}
        <div class="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg class="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold mb-2">Payment Successful!</h2>
        <p class="text-gray-600 mb-2">Thank you, {user.name}</p>
        <p class="text-2xl font-bold text-green-600">${amount.toFixed(2)}</p>
      {:else}
        <div class="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg class="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold mb-2">Payment Failed</h2>
        <p class="text-red-500 mb-2">{message}</p>
        <p class="text-gray-600">Card holder: {user.name}</p>
      {/if}
    </div>
  </div>
</div>