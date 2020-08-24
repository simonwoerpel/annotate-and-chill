import { persist } from 'easy-peasy';

import AnnotationsModel from './AnnotationsModel';
import DocumentModel from './DocumentModel';
import ReferenceModel from './ReferenceModel';
import UserModel from './UserModel';
import UiStateModel from './UiStateModel';

const persistOptions = {
  storage: 'localStorage',
};

export default {
  annotations: persist(AnnotationsModel, persistOptions),
  document: DocumentModel,
  reference: ReferenceModel,
  ui: UiStateModel,
  user: persist(UserModel, persistOptions),
};
