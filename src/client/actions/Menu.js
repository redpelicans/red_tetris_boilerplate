export const MENU = 'MENU';

export const setMenu = (menu, bool) => {
  console.log("value of:", menu, bool)
  return {
    type: MENU,
    menu,
    bool
  }
}
  
