import axios from "axios";
import {requestErrorAction} from "./networkActionCreators";
import store from "../reducers/store";

// TODO how can we test this?
axios.interceptors.response.use(response => response, (error) => {
    // log the error
    console.dir(error); // eslint-disable-line no-console
    // pretty print display the error
    store.dispatch(requestErrorAction("axiosInterceptor", JSON.stringify(error.response.data, null, 4)));
    return Promise.reject(error);
});

export function get(path, params) {
    return axios.get(path, {params});
}

export function post(path, data) {
    return axios.post(path, data);
}

export function put(path, data) {
    return axios.put(path, data);
}
