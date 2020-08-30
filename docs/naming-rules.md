# Naming rules

## Socket Events

A socket event should be described as follow:

`<class>:<action>`

Examples:

```js
// When a player join a lobby
{ action: 'lobby:join', payload: ... };

// When the game start
{ action: 'game:start', payload: ... };
```
