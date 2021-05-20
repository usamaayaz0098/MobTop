
  const initialState = {
    
    SearchValue : ""
  };
  
  function red2(state = initialState, action) {
    switch (action.type) {
      case "search" : {
        return {
          ...state,
          SearchValue : action.payload
        }
      }
      default:
        return state;
    }
  }
  
  export default red2;
  