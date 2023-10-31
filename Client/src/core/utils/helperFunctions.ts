export const getToken = () => {
  return localStorage.getItem("secT7");
};
export const removeToken = () => {
  localStorage.removeItem("secT7");
};
export const setToken = (val: string) => {
  localStorage.setItem("secT7", val);
};

export const decryptToken = async (encryptedToken: string): Promise<string> => {
  const password = process.env.ENCRYPTION_SECRET;
  const salt = process.env.ENCRYPTION_SALT;
  const keyLength = 32;

  const encryptedBuffer = new Uint8Array(
    atob(encryptedToken)
      .split("")
      .map((char) => char.charCodeAt(0))
  );

  const iv = encryptedBuffer.slice(0, 16);

  try {
    const key = await window.crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );

    const derivedKey = await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: new TextEncoder().encode(salt),
        iterations: 100000,
        hash: "SHA-256",
      },
      key,
      { name: "AES-CTR", length: keyLength * 8 },
      false,
      ["decrypt"]
    );

    const decryptedData = await window.crypto.subtle.decrypt(
      { name: "AES-CTR", iv },
      derivedKey,
      encryptedBuffer.slice(16)
    );

    const decryptedToken = new TextDecoder().decode(decryptedData);
    return decryptedToken;
  } catch (error) {
    console.error("Token decryption failed:", error);
    throw error;
  }
};

export const isConnectedUser = (intraId: number, userID: number) => {
  if (userID === intraId) return true;
  return false;
};
