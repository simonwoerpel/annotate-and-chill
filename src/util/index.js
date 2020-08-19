import crypto from 'crypto'; // eslint-disable-line

export function getHash(file, algorithm = 'md5', encoding = 'hex') {
  return new Promise(resolve => {
    const hash = crypto.createHash(algorithm);
    file.text().then(txt => {
      hash.update(txt, 'utf8');
      resolve(hash.digest(encoding));
    });
  });
}

export function getRandomColor() {
  const o = Math.round;
  const r = Math.random;
  const s = 255;
  return {
    r: o(r() * s),
    g: o(r() * s),
    b: o(r() * s),
  };
}

export function formatRgba({ r = 0, g = 0, b = 0, a = 1 }) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
