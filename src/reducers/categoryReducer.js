 import { ALL_CATEGORY, CURRENT_CATEGORY } from "../actions/types";

const initialState = {
  allCategories: [],
  currentCategory: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ALL_CATEGORY:
      return {
        ...state,
        allCategories: action.payload,
      };
    case CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload,
      }
    default:
      return state;
  }
}
