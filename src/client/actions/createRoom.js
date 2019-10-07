export const CREATE = 'CREATE';

export const createRoom = (create) => {
    return {
	type: 'CREATE',
	create
    }
}
