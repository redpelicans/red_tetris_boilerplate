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
```

`lobby:publish`

```
Emit the actualized state of the Lobby.
```

### **Client**

`lobby:delete`

```
The owner ask to delete the current lobby.
```

`lobby:subscribe`

`lobby:unsubscribe`

`lobby:join`

```
A user ask to join an existing lobby.
```
