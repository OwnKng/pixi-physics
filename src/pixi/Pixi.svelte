<script lang="ts">
  import { afterUpdate } from "svelte"
  import { create_app } from "./app"

  let container: HTMLElement

  afterUpdate(async () => {
    const app = await create_app(container)
    container.appendChild(app.view)
  })
</script>

<div class="w-full h-full" bind:this={container} />
