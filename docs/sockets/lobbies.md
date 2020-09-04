# Lobbies

## Properties

This is just an array of [Lobby](./lobby.md).

## Actions

### **Server**

`lobbies:publish`

```
Send the actual state of lobbies to all subscribers of group 'group:lobbies'.
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
