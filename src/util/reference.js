export function ensureRefStr(ref, uid) {
  if (typeof ref === 'object') {
    if (typeof uid !== 'undefined') {
      ref.uid = uid;
    }
    const location = ref.type === 'rct' ? ref.location.join(',') : ref.location;
    return `${ref.uid}:${ref.page}:${ref.type}:${location}`;
  }
  if (typeof uid !== 'undefined') {
    const oldUid = ref.split(':', 1);
    return ref.replace(oldUid, uid);
  }
  return ref;
}

export function fromRefStr(refStr) {
  if (refStr) {
    const [uid, page, type, location] = refStr.split(':');
    return {
      uid,
      page: parseInt(page, 10),
      type,
      location:
        type === 'rct' ? location.split(',').map(l => parseFloat(l)) : location,
    };
  }
  return {};
}
