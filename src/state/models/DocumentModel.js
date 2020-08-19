import { action, computed, thunk } from 'easy-peasy';

import { getHash } from '~/util';

const DocumentModel = {
  data: {},
  pagesNum: 1,
  renderedPages: 0,
  renderPagesComplete: computed(
    ({ renderedPages, pagesNum }) => renderedPages >= pagesNum
  ),
  error: null,
  isLoading: false,
  loadStart: action(state => {
    state.isLoading = true;
  }),
  loadDocumentSuccess: action((state, payload) => {
    state.data = payload;
    state.isLoading = false;
  }),
  loadDocumentFail: action((state, payload) => {
    state.data = null;
    state.error = payload;
    state.isLoading = false;
  }),
  loadDocument: thunk(async (actions, file) => {
    actions.loadStart();
    try {
      getHash(file).then(uid => actions.loadDocumentSuccess({ file, uid }));
    } catch (err) {
      actions.loadDocumentFail(err);
    }
  }),
  setPagesNum: action((state, pagesNum) => {
    state.pagesNum = pagesNum;
  }),
  incrementRenderedPages: action(state => {
    state.renderedPages += 1;
  }),
  clear: action(state => {
    state.data = {};
    state.renderedPages = 0;
    state.pagesNum = 1;
  }),
};

export default DocumentModel;
