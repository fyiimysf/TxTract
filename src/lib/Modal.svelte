<script lang="ts">

	import Icon from '@iconify/svelte';

	import { fade, fly } from 'svelte/transition';
	import { page } from '$app/state';
		
	
	const openModal = () => {
		const my_modal_5 = document.getElementById('my_modal_5');
		if (my_modal_5 ) {
			(my_modal_5 as HTMLDialogElement).showModal();
		}
	}




</script>

<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <center>
      <h3 class="text-lg font-bold">Upload an Image</h3>
      <p class="py-4">Select an image to extract text from</p>
      <input type="file" class="file-input w-full max-w-xs" />
      <div class="modal-action">
        <form method="dialog" >
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          
          <button class="btn btn-block bg-success text-green-400">Upload</button>
          <!-- if there is a button in form, it will close the modal -->
        </form>
      </div>
      <br />
      <br />
    </center>
  </div>
</dialog>


