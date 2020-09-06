import { ADD_YEAR } from "actions/store";

export const initialState = {
  age: 42,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_YEAR:
      return { ...state, age: state.age + action.age };
    default:
      return state;
  }
}
