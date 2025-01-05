<script lang="ts">
	import '../app.css';
	import Icon from '@iconify/svelte';

  import openModal from './Modal.svelte'
  let func = $props()

  
</script>

<ul class="menu menu-horizontal bg-base-200 rounded-box z-50">
    <li>
      <!-- svelte-ignore a11y_missing_attribute -->
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <a class="tooltip" onclick = {()=>{
        openModal.call
      }
      } data-tip="Home">
        <Icon icon = "line-md:file-upload" class = "h-6 w-6"/>
      </a>
    </li>
    <li>
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <!-- svelte-ignore a11y_missing_attribute -->
      <a class="tooltip" data-tip="Details">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </a>
    </li>
    <li>
      <!-- svelte-ignore a11y_missing_attribute -->
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <a class="tooltip" data-tip="Stats">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </a>
    </li>
  </ul>

