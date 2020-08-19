// import { createStore, persist } from 'easy-peasy';
import { createStore } from 'easy-peasy';

import StoreModel from './models';

// const Store = createStore(persist(StoreModel));
const Store = createStore(StoreModel);

export default Store;
