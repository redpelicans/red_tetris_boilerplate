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
Server will : create an Object Player and emit a player:response
```

`player:restore`

```
Ask server to restore a previous player.
Send : oldSocketId
Serder will : update the socketId and send player:response / subscribe the player to lobbies / send lobbies:publish
```

`player:delete`

```
Ask server to delete player.
Send : id
Server will : delete the Object Player in players
```


