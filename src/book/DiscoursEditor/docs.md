
# AuDiscoursEditorth

Это описание и документация компонента `<DiscoursEditor />`.

## Использование

```svelte{1}
<DiscoursEditor {body} {collab}>
```
- __collab__ - коллаборативный режим true/false
- __body__ - редактируемое тело публикации plain или html

## Пример

<script>
  import DiscoursEditor from '../../components/DiscoursEditor/index.svelte'
</script>

<DiscoursEditor body={''} collab={false} />
