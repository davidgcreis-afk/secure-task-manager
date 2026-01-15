let criptoKey = null;
async function deriveKey(password, salt) {
    const enc = new TextEncoder();

    const baseKey = await crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        "PBKDF2",
        false,
        ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt,
            iterations: 100000,
            hash: "SHA-256"
        },
        baseKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}
async function encryptData(data) {
    const enc = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encoded = enc.encode(JSON.stringify(data));

    const ciphertext = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        cryptoKey,
        encoded
    );

    return {
        iv: Array.from(iv),
        data: Array.from(new Uint8Array(ciphertext))
    };
}
async function decryptData(payload) {
    const dec = new TextDecoder();

    const iv = new Uint8Array(payload.iv);
    const data = new Uint8Array(payload.data);

    const plaintext = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        cryptoKey,
        data
    );

    return JSON.parse(dec.decode(plaintext));
}
