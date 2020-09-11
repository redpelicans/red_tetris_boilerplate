# Lobbies

## Properties

This is just a key value array of objects [Lobby](./lobby.md).
key value : lobby id

## Actions

### **Server**

`lobbies:publish`
```
Send the actual state of lobbies to all subscribers of group 'group:lobbies'.
```

`lobbies:response`

```
Emit a success or error object
payload: Lobbies
```

### **Client**

`lobbies:subscribe`

```
Ask a subscription demand on 'group:lobbies' to the server.
Send : userId ?
Server will : add the player to the group "group:lobbies" and emit a lobbies:response
```

`lobbies:unsubscribe`

```
Ask a unsubscription demand on 'group:lobbies' to the server.
Send : userId ?
Server will : remove the player from the group "group:lobbies"
```

`lobbies:add`

```
Create a new lobby.
Send : Object Lobby without id
Server will : create an Object Lobby and emit a lobbies:response
```

`lobbies:delete`

```
Delete a lobby.
Send : lobbyId and userId 
```
