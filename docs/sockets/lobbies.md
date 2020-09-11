# Lobbies

## Properties

This is just a key value array of objects [Lobby](./lobby.md).
key value : lobby id

## Actions

### **Server**

`lobbies:publish`
```
Send the actual state of lobbies to all subscribers of group 'group:lobbies'.
Send an array of objects [Lobby]
```

`lobbies:response`

```
Emit a success or error object
payload: Lobby "full"
```

### **Client**

`lobbies:subscribe`

```
Ask a subscription demand on 'group:lobbies' to the server.
Send : userId ?
Server will : add the playter to the groupe "lobbies:group" and emit a lobbies:response
```

`lobbies:unsubscribe`

```
Ask a unsubscription demand on 'group:lobbies' to the server.
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
