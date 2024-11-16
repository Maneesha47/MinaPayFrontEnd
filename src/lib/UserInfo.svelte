<script lang="ts">
  import type { NFCUser } from './types';
  
  export let user: NFCUser;
</script>

<div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8 border border-green-100 shadow-sm">
  <div class="flex items-center">
    <div class="flex-shrink-0">
      <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    </div>
    <div class="ml-6">
      <div class="flex items-center">
        <h3 class="text-xl font-semibold text-gray-900">Welcome, {user.name}</h3>
        <div class="ml-4 flex-shrink-0">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Verified
          </span>
        </div>
      </div>
      <p class="mt-1 text-sm text-gray-600">Card ID: {user.cardId}</p>
      <p class="mt-2 text-sm text-emerald-600">Ready to process payment</p>
    </div>
  </div>
</div>