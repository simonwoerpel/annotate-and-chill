import { v4 as uuid4 } from 'uuid';

import { fromRefStr } from '~/util/reference';
import { parseCsv, dumpCsv } from '~/util/csv';

// const loadDataRemote = uid => {
//   // const response = await fetch(`http://localhost:8000/api/a/?id=${uid}`);
//   // const response = await fetch('http://localhost:8000/api/a/');
//   // const data = await response.json();
//   // return data
//   return [];
// };

const loadDataLocal = uid => {
  const key = `annotations_${uid}`;
  const storage = window.localStorage;
  const data = storage.getItem(key);
  if (data) {
    return parseCsv(data).map(d => {
      d.reference = fromRefStr(d.reference);
      return d;
    });
  }
  return [];
};

const saveBatchLocal = (uid, data) => {
  const key = `annotations_${uid}`;
  const storage = window.localStorage;
  storage.setItem(key, dumpCsv(data));
};

const createAnnotationLocal = (uid, payload) => {
  const data = loadDataLocal(uid);
  payload.id = uuid4();
  data.push(payload);
  saveBatchLocal(uid, data);
  return data;
};

const deleteAnnotationLocal = (uid, payload) => {
  const data = loadDataLocal(uid).filter(({ id }) => id !== payload.id);
  saveBatchLocal(uid, data);
  return data;
};

export default class Storage {
  constructor(storageClass, options) {
    this.storageClass = storageClass;
    this.isLocal = storageClass === 'local';
    this.options = options;
    this.uid = options.uid;

    this.loadData = this.loadData.bind(this);
    this.saveBatch = this.saveBatch.bind(this);
    this.createAnnotation = this.createAnnotation.bind(this);
    this.deleteAnnotation = this.deleteAnnotation.bind(this);
  }

  loadData() {
    return this.isLocal ? loadDataLocal(this.uid) : [];
  }

  saveBatch(data) {
    return this.isLocal ? saveBatchLocal(this.uid, data) : null;
  }

  createAnnotation(payload) {
    return this.isLocal ? createAnnotationLocal(this.uid, payload) : null;
  }

  deleteAnnotation(payload) {
    return this.isLocal ? deleteAnnotationLocal(this.uid, payload) : null;
  }
}
