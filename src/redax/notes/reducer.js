const DEFAULT_STATE = {
  data: [],
  loading: false,
  error: null,
}
 const notesReducer = (state  = DEFAULT_STATE, action) => {
    switch (action.type) {
      case 'NOTES/LOADING':
        return { 
          ...state,
          loading: true,
          error: null,
        }
      case 'NOTES/SET':
        return { 
          ...state,
          data:  action.payload,
          loading: false,
          error: null,
        }
      case 'NOTES/ERROR':
          return { 
            ...state,
            loading: false,
            error: action.payload,
          } 
      default: 
        return state
    }
  }
  export default notesReducer
