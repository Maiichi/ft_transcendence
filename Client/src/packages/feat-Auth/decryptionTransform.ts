import { createTransform } from "redux-persist";

const decryptionTransform = createTransform(
  undefined, // No need for an "inbound" transform
  (outboundState, key) => {
    // if (key === "token" && outboundState) {
    //   const decryptedToken = CryptoJS.AES.decrypt(
    //     outboundState,
    //     SECRET_KEY
    //   ).toString(CryptoJS.enc.Utf8);
    //   return JSON.parse(decryptedToken);
    // }
    return outboundState;
  }
);

export default decryptionTransform;