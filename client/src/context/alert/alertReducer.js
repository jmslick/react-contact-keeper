import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      // for each alert where id is not in the payload
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
};
