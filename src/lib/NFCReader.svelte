<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ky from 'ky';
  import type { NFCPaymentData, NFCUser } from './types';
  
  const dispatch = createEventDispatcher<{
    nfcDetected: NFCPaymentData;
  }>();

  export let disabled = false;
  let contentData;
  let isScanning = false;
  let errorMessage = '';

  async function startNFCScan() {
    if (disabled) return;
    
    if (!('NDEFReader' in window)) {
      errorMessage = 'NFC is not supported on this device or browser';
      return;
    }

    try {
      isScanning = true;
      errorMessage = '';
      const ndef = new (window as any).NDEFReader();
      
      await ndef.scan();
      /*
      ndef.addEventListener("reading", async ({ message, serialNumber }) => {
        try {
          let userData: NFCUser;
          
          // Try to read NDEF message if available
          if (message && message.records) {
            const record = message.records[0];
            if (record && record.data) {
              const decoder = new TextDecoder();
              const data = JSON.parse(decoder.decode(record.data));
              userData = {
                name: data.name || 'Unknown User',
                cardId: serialNumber
              };
            }
          } else {
            // Fallback to using serial number only
            userData = {
              name: `User (${serialNumber.slice(-4)})`,
              cardId: serialNumber
            };
          }

          dispatch('nfcDetected', {
            user: userData,
            timestamp: Date.now()
          });
          
          isScanning = false;
        } catch (error) {
          errorMessage = 'Error reading NFC data';
          isScanning = false;
        }
      });
      */
      ndef.addEventListener("reading", async ({ message }: any) => {
        const record = message.records[0];
        const textDecoder = new TextDecoder();
        const content = textDecoder.decode(record.data);

        // contentData = content
        const json = await ky.post('https://yellow-lands-know.loca.lt/api/parsePage', {json: {"apiUrl": content}}).json();
        //https://yellow-lands-know.loca.lt/
        contentData = json

      });



      ndef.addEventListener("readingerror", () => {
        errorMessage = 'Error reading NFC tag';
        isScanning = false;
      });

    } catch (error) {
      errorMessage = 'Error accessing NFC: ' + error;
      isScanning = false;
      
      // Fallback for development/testing
      if (process.env.NODE_ENV === 'development') {
        const mockUser: NFCUser = {
          name: 'Test User',
          cardId: 'TEST-' + Math.random().toString(36).substr(2, 9)
        };
        
        dispatch('nfcDetected', {
          user: mockUser,
          timestamp: Date.now()
        });
      }
    }
  }
</script>

<div class="flex flex-col items-center gap-4">
  {#if errorMessage}
    <p class="text-red-500 bg-red-50 px-4 py-2 rounded-lg">{errorMessage}</p>
  {/if}
  
  <button
    class="relative group"
    on:click={startNFCScan}
    {disabled}
  >
    <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-200"
         class:hidden={disabled}></div>
    <div
      class="relative px-8 py-4 rounded-full w-48 h-48 flex items-center justify-center text-xl font-semibold transition-all duration-200 bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl"
      class:animate-pulse={isScanning}
      class:opacity-50={disabled}
      class:from-gray-400={disabled}
      class:to-gray-500={disabled}
      class:cursor-not-allowed={disabled}
    >
    <div>{contentData}</div>  
    <div class="text-center">
        {#if isScanning}
          <svg class="w-12 h-12 mx-auto mb-2 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="block text-sm">Scanning...</span>
        {:else if disabled}
          <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span class="block text-sm">Enter Amount</span>
        {:else}
          <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span class="block text-sm">Tap to Scan</span>
        {/if}
      </div>
    </div>
  </button>
  
  {#if isScanning}
    <p class="text-gray-600 animate-pulse">Hold your device near the NFC card or tag</p>
  {/if}
</div>