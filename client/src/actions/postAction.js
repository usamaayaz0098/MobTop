import {
  F_P,
  Add,
  DANGER,
  PLUS,
  MINUS,
  LOGGED,
  ID,
  STATUS,
  LOGOUT,
  CART,
} from "./types";

export const fetchPosts = () => (dispatch) => {
  fetch("http://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((posts) =>
      dispatch({
        type: F_P,
        payload: posts,
      })
    );
};

export const dangerPosts = (name) => (dispatch) => {
  dispatch({
    type: DANGER,
    payload: name,
  });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const UserId = (name) => (dispatch) => {
  dispatch({
    type: ID,
    payload: name,
  });
};
export const UserName = (name) => (dispatch) => {
  dispatch({
    type: LOGGED,
    payload: name,
  });
};
export const UserStatus = (name) => (dispatch) => {
  dispatch({
    type: STATUS,
    payload: name,
  });
};

export const getAddition = (id) => (dispatch) => {
  dispatch({
    type: PLUS,
    payload: id,
  });
};

export const AddCart = (id) => (dispatch) => {
  dispatch({
    type: CART,
    payload: id,
  });
};

export const getSub = (id) => (dispatch) => {
  dispatch({
    type: MINUS,
    payload: id,
  });
};

export const printPosts = (data) => (dispatch) => {
  console.log(data + "sss");
  dispatch({
    type: Add,
    payload: data,
  });
};
