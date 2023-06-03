import axios from "axios";

let apiHandle = axios.create({
    baseURL: "http://localhost:5000",
});

let Get = (endPoint) => {
    return apiHandle.get(endPoint);
}
let GetById = (endPoint, id) => {
    return apiHandle.get(`${endPoint}/${id}`)
}
let Post = (endPoint, body) => {
    return apiHandle.post(`${endPoint}`, body);
}
let Put = (endPoint,id, body) => {
    return apiHandle.put(`${endPoint}/${id}`, body);
}
let Delete = (endPoint, id) => {
    return apiHandle.delete(`${endPoint}/${id}`)
}

export  { Get, GetById, Post, Put, Delete };