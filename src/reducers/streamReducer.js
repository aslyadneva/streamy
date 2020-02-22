import _ from 'lodash'; 

import { 
  CREATE_STREAM, 
  FETCH_STREAMS, 
  FETCH_STREAM, 
  EDIT_STREAM, 
  DELETE_STREAM 
} from '../actions/types'; 

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAM: 
      return {...state, [action.payload.id]: action.payload};
    case CREATE_STREAM: 
      return {...state, [action.payload.id]: action.payload};
    case EDIT_STREAM: 
      return {...state, [action.payload.id]: action.payload};
    case DELETE_STREAM: 
      //omit creates a new state object
      //figure out how to do this without lodash
      return _.omit(state, action.payload);
    case FETCH_STREAMS: 
      const newObject = {};
      action.payload.forEach( (item) => newObject[item.id] = item );
      return { ...state, ...newObject};
    default:
      return state; 
  }
}; 