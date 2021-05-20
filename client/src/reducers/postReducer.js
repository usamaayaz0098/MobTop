import {
  F_P,
  flag,
  Add,
  DANGER,
  PLUS,
  MINUS,
  LOGGED,
  ID,
  STATUS,
  LOGOUT,
  CART,
  REMOVE_CART,
} from "../actions/types";

const initialState = {
  items: [],
  item: {},
  new: "",
  result: 0,
  logged: "",
  status: "",
  id: "",
  cartItem: [],
  OffItems: [],
  admin: "",

};

function red(state = initialState, action) {
  switch (action.type) {
    case F_P: {
      return {
        ...state,
        items: action.payload,
      };
    }
    case PLUS: {
      return {
        ...state,
        result: state.result + 1,
      };
    }

    case MINUS: {
      return {
        ...state,
        result: state.result - 1,
      };
    }

    case flag: {
      return {
        ...state,
        items: action.payload,
      };
    }

    case DANGER: {
      return {
        ...state,
        new: action.payload,
      };
    }

    case Add: {
      console.log("add");
      return {
        ...state,
        items: action.payload,
      };
    }

    case CART: {
      return {
        ...state,
        cartItem: action.payload,
      };
    }

    case LOGGED: {
      return {
        ...state,
        logged: action.payload,
      };
    }
    case ID: {
      return {
        ...state,
        id: action.payload,
      };
    }
    case STATUS: {
      return {
        ...state,
        status: action.payload,
      };
    }

 

    case "ADMIN_LOGOUT":{
      return {
        ...state,
        admin : undefined
      }
    }
    case "ADMIN": {
      return {
        ...state,
        admin: action.payload,
      };
    }

    case LOGOUT: {
      return {
        ...state,
        id: undefined,
        status: undefined,
        logged: undefined,
      };
    }

    case REMOVE_CART: {
      return {
        ...state,
        cartItem: [],
      };
    }

    case "OFF": {
      return {
        ...state,
        OffItems: [...state.OffItems, action.payload],
      };
    }

    default:
      return state;
  }
}

export default red;
