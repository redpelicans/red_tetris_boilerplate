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
```

### **Client**

`lobbies:subscribe`

```
Ask a subscription demand on 'group:lobbies' to the server.
The server should emit the 'lobbies:publish' to the new subscriber.
```

`lobbies:unsubscribe`

```
Ask a unsubscription demand on 'group:lobbies' to the server.
```

`lobbies:add`

```
Create a new lobby.
Emit the lobby object.
```

`lobbies:delete`

```
Create a new lobby.
Emit the lobby object.
```
