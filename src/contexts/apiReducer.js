const apiReducer = (state, action) => {
  switch (action.type) {
    case "GET_CONTAINER_OPTIONS":
      return {
        ...state,
        containerOptions: [...action.payload],
      };
    case "SET_SELECTED_CONTAINER":
      return {
        ...state,
        selectedContainer: action.payload,
      };
    case "REFRESH":
      return {
        ...state,
      };
    case "REMOVE_SNACKBAR":
      return {
        ...state,
        welcomeSnackbar: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: !state.loading,
      };
    case "LOADING_OFF":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default apiReducer;
