# Auth

Это описание и документация компонента `<Auth />`.

## Использование

```svelte{1}
<Auth {mode} {warnings}>
```

- __mode__ - строка, ождающая значений
    1. login 
    2. register
    3. forget
    4. reset
    5. resend
    6. renew 

- __warnings__ - список строк, предупреждения и уведомления

## Пример

<script>
  import Auth from '../../components/Auth.svelte'
</script>

<Auth />
