import { createStore } from "redux";
import rootReducer from "./reducers";

const configureStore = () => {
    const store = createStore(rootreducer);
    return store;
}

export default configureStore;