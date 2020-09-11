# Lobby

## Properties

- id: number
- hash: string
- name: string
- maxPlayer: number[2-8]
- players: array of [player](./player.md)
- owner: [player](./player.md)

## Actions

### **Server**

`lobby:response`

```
Emit a success or error object.
payload: ObjectLobby
```

`lobby:publish`

```
Emit the actualized state of the Lobby.
```

`lobby:ban`
```
Emit a response with lobby:ban and the reason.
```

### **Client**

`lobby:update`
```
The owner change the current settings.
Send : Objet Lobby, List playerId, userId
```

`lobby:subscribe`
Ask a subscription demand on 'group:lobby' to the server.
The server should emit the 'lobby:response' to the new subscriber.
Send : lobbyId, userId

`lobby:unsubscribe`
Ask an unsubscription demand on 'group:lobby' to the server.
Send : lobbyId, userId
