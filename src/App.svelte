<script lang="ts">
  import NFCReader from './lib/NFCReader.svelte';
  import PaymentStatus from './lib/PaymentStatus.svelte';
  import AmountInput from './lib/AmountInput.svelte';
  import UserInfo from './lib/UserInfo.svelte';
  import type { NFCPaymentData } from './lib/types';
  
  let amount = 0;
  let showPaymentStatus = false;
  let paymentStatus: 'processing' | 'success' | 'error' = 'processing';
  let statusMessage = '';
  let detectedUser: NFCPaymentData | null = null;

  function handleAmountChange(event: CustomEvent<number>) {
    amount = event.detail;
  }

  function handleNFCDetected(event: CustomEvent<NFCPaymentData>) {
    detectedUser = event.detail;
    if (amount <= 0) {
      statusMessage = 'Please enter a valid amount';
      return;
    }
    
    showPaymentStatus = true;
    
    // Simulate payment processing
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      paymentStatus = success ? 'success' : 'error';
      statusMessage = success ? '' : 'Transaction declined';
      
      if (success) {
        setTimeout(() => {
          showPaymentStatus = false;
          amount = 0;
          detectedUser = null;
        }, 2000);
      }
    }, 2000);
  }
</script>

<main class="min-h-screen p-4 flex items-center justify-center">
  <div class="w-full max-w-md">
    <div class="glass-effect rounded-2xl shadow-xl p-8 mb-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          NFC Payment
        </h1>
        <p class="text-gray-600 mt-2">Quick, secure, and contactless payments</p>
      </div>
      
      <AmountInput {amount} on:amountChange={handleAmountChange} />
      
      {#if detectedUser}
        <UserInfo user={detectedUser.user} />
      {/if}
      
      <NFCReader 
        on:nfcDetected={handleNFCDetected}
        disabled={amount <= 0} 
      />
    </div>
    
    <div class="text-center">
      <p class="text-sm text-gray-500 glass-effect px-4 py-2 rounded-full inline-block">
        <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Requires NFC support and Chrome for Android
      </p>
    </div>
  </div>
</main>

{#if showPaymentStatus && detectedUser}
  <PaymentStatus 
    {amount} 
    status={paymentStatus} 
    message={statusMessage}
    user={detectedUser.user}
  />
{/if}