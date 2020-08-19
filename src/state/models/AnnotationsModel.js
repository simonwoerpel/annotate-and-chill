import { v4 as uuid4 } from 'uuid';
import { action, actionOn, computed, thunk } from 'easy-peasy';
import { loadCsv } from '~/util/csv';

const AnnotationsModel = {
  uid: undefined,
  current: computed(s => s.data[s.uid] || []),
  user: {},
  data: {},
  error: false,
  isLoadingCsv: false,
  loadCsvStart: action(state => {
    state.isLoadingCsv = true;
  }),
  // loadCsvSuccess: action((state, { data, replace }) => {
  loadCsvSuccess: action((state, { data }) => {
    // if (replace) {
    data = data.map(d => ({ ...state.user, ...d }));
    state.data[state.uid] = data;
    // } else {
    //   state.data[state.uid] = [...state.data[state.uid], ...data].filter(
    //     (v, i, a) => a.indexOf(v) === i
    //   );
    // }
    state.isLoadingCsv = false;
  }),
  loadDataFail: action((state, payload) => {
    state.data[state.uid] = [];
    state.error = payload;
    state.isLoadingCsv = false;
    throw Error(payload);
  }),
  importCsv: thunk(async (actions, { file, replace }) => {
    actions.loadCsvStart();
    loadCsv(file).then(data => actions.loadCsvSuccess({ data, replace }));
  }),
  createAnnotation: action((state, payload) => {
    payload = {
      id: uuid4(),
      date: new Date(),
      ...state.user,
      ...payload,
    };
    state.data[state.uid].push(payload);
  }),
  deleteAnnotation: action((state, { id }) => {
    state.data[state.uid] = state.data[state.uid].filter(a => a.id !== id);
  }),
  onDocumentLoaded: actionOn(
    (_, { document }) => document.loadDocumentSuccess,
    (state, { payload }) => {
      state.uid = payload.uid;
      state.data[state.uid] = state.data[state.uid] || [];
    }
  ),
  onUserLogin: actionOn(
    (_, { user }) => user.update,
    (state, { payload }) => {
      const { email, firstName, lastName } = payload;
      state.user = { email, firstName, lastName };
    }
  ),
};

export default AnnotationsModel;
