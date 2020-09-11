# Player

## Properties

- name: string
- id: number
- socketId: string

## Actions

### **Server**

`player:response`

```
Emit a success or error object
payload: Objet Player
```

### **Client**

`player:create`

```
Ask server to create a new player.
Send : name
```

`player:delete`

```
Ask server to delete player.
Send : id
```


