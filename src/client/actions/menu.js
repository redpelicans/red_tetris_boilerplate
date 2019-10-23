export const INTERFACE = 'INTERFACE';

export const setInterface = (menu) => {
  return {
    type: INTERFACE,
    state: "MENU",
    menu
  }
}
  
export const createRoom = (bool) => {
  return  {
    type: INTERFACE,
    state: "CREATE",
    bool
  }
}
