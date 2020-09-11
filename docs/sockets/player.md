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

`player:restore`

```
Ask server to restore a previous player.
Send : oldSocketId
Serder sends player:response // lobbies:publish // subscribe lobbies
```

`player:delete`

```
Ask server to delete player.
Send : id
```


