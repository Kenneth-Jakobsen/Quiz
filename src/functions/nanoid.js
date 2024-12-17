export default function nanoid(size = 21) {
    return crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
      byte &= 63;
      if (byte < 36) {
        // `0-9a-z`
        id += byte.toString(36);
      } else if (byte < 62) {
        // `A-Z`
        id += (byte - 26).toString(36).toUpperCase();
      } else if (byte > 62) {
        id += '-';
      } else {
        id += '_';
      }
      return id;
    }, '');
  };