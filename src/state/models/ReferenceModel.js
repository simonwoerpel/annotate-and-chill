import { action, computed, actionOn } from 'easy-peasy';

import { ensureRefStr } from '~/util/reference';

const ReferenceModel = {
  uid: undefined,
  page: 1,
  type: 'rct',
  location: [0, 0, 0, 0],
  refStr: computed(({ uid, page, type, location }) =>
    ensureRefStr({ uid, page, type, location })
  ),
  reference: computed(({ uid, page, type, location }) => ({
    uid,
    page,
    type,
    location,
  })),
  updateRef: action((state, { page, type, location }) => {
    if (page) state.page = page;
    if (type) state.type = type;
    if (location) state.location = location;
  }),
  onDocumentLoaded: actionOn(
    (actions, { document }) => document.loadDocumentSuccess,
    (state, { payload }) => {
      state.uid = payload.uid;
    }
  ),
};

export default ReferenceModel;
