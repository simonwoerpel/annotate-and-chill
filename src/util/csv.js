import Papa from 'papaparse';

import { ensureRefStr, fromRefStr } from '~/util/reference';

const hasData = ({ reference, body }) => reference && body;
const load = rows =>
  rows.map(r => ({ ...r, reference: fromRefStr(r.reference) }));

export function loadCsv(file) {
  return new Promise(resolve => {
    const rows = [];
    Papa.parse(file, {
      worker: true,
      header: true,
      step: row => hasData(row.data) && rows.push(row.data),
      complete: () => resolve(load(rows)),
    });
  });
}

export function parseCsv(data) {
  return Papa.parse(data, {
    header: true,
  }).data.filter(hasData);
}

export function dumpCsv(data) {
  return Papa.unparse(
    data
      .filter(hasData)
      .map(d => ({ ...d, reference: ensureRefStr(d.reference) }))
  );
}
