<script lang="ts" context="module">
    import type { PageMeta } from '@vitebook/client'
  
    export const __pageMeta: PageMeta = {
      title: 'DiscoursEditor',
      description: 'Редактор',
    }
  </script>
  
  <script>
    import { Variant } from '@vitebook/client';
    import {
      ControlsAddon,
      EventsAddon,
      eventCallback,
    } from '@vitebook/client/addons';
    import DiscoursEditor from '../../components/DiscoursEditor/index.svelte'
  
    let collab = false
    $: normal = !collab
  </script>
  
  <Variant name="Обычный режим" description="Редактирование публикации" on:enter={() => collab = false}>
    <DiscoursEditor body={''} collab={false} />
  </Variant>
  <Variant name="Коллаборативный режим" description="Совместное редактирование" on:enter={() => collab = true}>
    <DiscoursEditor body={''} {collab} />
  </Variant>
  <ControlsAddon>
    <label>
        Обычный режим <input type="checkbox" bind:checked={normal} />
    </label>

    <label>
        Коллаборативный режим <input type="checkbox" bind:checked={collab} />
    </label>
  </ControlsAddon>
  
  <EventsAddon />
  