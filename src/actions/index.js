import history from '../history'; 

import { 
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM, 
  FETCH_STREAMS, 
  FETCH_STREAM, 
  EDIT_STREAM, 
  DELETE_STREAM 
} from './types'; 

import streams from '../apis/streams'; 


export const signIn = (userId) => {
  return {
    type: SIGN_IN, 
    payload: userId
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}


export const createStream = (formValues) => {
  return async function (dispatch, getState) {
    
    // getState returns the entire state object 
    // we access the state's auth property and assign it to userId 
    const { userId } = getState().auth; 

    // when a new stream is created, the userId of whoever is logged in is sent to the server 
    const response = await streams.post('/streams', {...formValues, userId}); 

    dispatch({
      type: CREATE_STREAM, 
      payload: response.data
    })

    // Do some programmatic navigation to
    // return the user back to the root route aka the Streams List
    history.push('/');
    
  } 
}

export const fetchStreams = () => {
  return async function (dispatch) {
    
    const response = await streams.get('/streams'); 

    dispatch({
      type: FETCH_STREAMS, 
      payload: response.data
    })
  }
}

export const fetchStream = (id) => {
  return async function (dispatch) {
    
    const response = await streams.get(`/streams/${id}`); 

    dispatch({
      type: FETCH_STREAM, 
      payload: response.data
    })

    
  }
}

export const editStream = (id, formValues) => {
  return async function (dispatch) {
    
    // a PATCH request only updates the specific properties and leaves the others unchanged in the 
    // API records 
    // a PUT request replaces any previous properties with the new ones that are sent 
    // aka if you don't include a propetry on a PUT request, 
    // it will delete it from the previous record 
    const response = await streams.patch(`/streams/${id}`, formValues); 

    dispatch({
      type: EDIT_STREAM, 
      payload: response.data
    })

    history.push('/');
  }
}

export const deleteStream = (id) => {
  return async function (dispatch) {
    
    await streams.delete(`/streams/${id}`); 

    dispatch({
      type: DELETE_STREAM, 
      payload: id
    })

    history.push('/');
  }
}