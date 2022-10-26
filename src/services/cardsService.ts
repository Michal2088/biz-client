import axios from "axios";
import { Card } from "../interfaces/Card";

const api: string =process.env.REACT_APP_API || "";
const _ = require("lodash");

export const getAllCards = (): Promise<any> => {
  return axios.get(`${api}cards`, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });
};

export const addCard = (newCard: Card): Promise<any> =>
  axios.post(`${api}cards`, newCard, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });

export const getMyCards = (): Promise<any> => {
  return axios.get(`${api}cards/my-cards`, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });
};

export const getCard = (_id:string): Promise<any> =>{
  return axios.get(`${api}cards/${_id}`, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  })};


export const editCard = (card: Card): Promise<any> =>{
  let body=_.omit(card,["_id","user_id","cardNumber"])
  return axios.put(`${api}cards/${card._id}`, body, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });
}

export const deleteCard = (_id:string): Promise<any> =>{
  return  axios.delete(`${api}cards/${_id}`, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  })};
