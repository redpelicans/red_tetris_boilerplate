export const CREATE = 'CREATE'

export const isCreating = () => ({
  type: CREATE,
  state: 'CREATING'
})

export const onCreation = () => ({
  handle: CREATE,
  event: 'CREATED',
  state: CREATE
})

export const emitCreate = (form) => ({
  emit: true,
  event: 'JOIN',
  payload: form
})
