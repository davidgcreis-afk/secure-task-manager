   # SecTask 🔐

SecTask is a secure task management application focused on **client-side data protection**.
All task data is encrypted directly in the browser before being stored, ensuring that no sensitive information is ever saved in plaintext.

This project was built as a learning exercise combining **web development fundamentals** with **information security concepts**.

---

## 🚀 Features

- Password-based access
- Client-side encryption using modern cryptography
- Encrypted task storage (LocalStorage)
- No password or encryption key persistence
- Session-based access control
- Clean and minimal user interface

---

## 🛡️ Security Design

SecTask uses modern cryptographic primitives provided by the **Web Crypto API**.

- **Encryption Algorithm:** AES-GCM (256-bit)
- **Key Derivation Function:** PBKDF2 (SHA-256)
- **Salt:** Randomly generated and stored locally
- **IV:** Random per encryption operation
- **Key Storage:** Memory only (never persisted)

### Security Properties

- Task data is encrypted before storage
- Encryption keys are derived from the user password
- Passwords are never stored
- If an incorrect password is provided, encrypted data cannot be decrypted

> ⚠️ **Important:**  
> If the user forgets the password, encrypted data **cannot be recovered by design**.

---

## 🧱 Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Web Crypto API

---

## 📁 Project Structure

secure-todo/
├── index.html # Login page
├── dashboard.html # Task dashboard
├── styles.css # Application styles
├── app.js # Application logic
├── crypto.js # Cryptography utilities
└── README.md


---

## 🧪 How It Works

1. The user enters a password on login
2. A cryptographic key is derived using PBKDF2
3. Tasks are encrypted with AES-GCM before storage
4. Encrypted data is stored in LocalStorage
5. On reload, data is decrypted using the derived key

---

## ⚠️ Limitations

This project is a **proof of concept** and is not intended for production use.

Known limitations:
- No backend or server-side validation
- Single-user only
- Client-side access control
- No recovery mechanism for forgotten passwords

---

## 🧠 What I Learned

- Client-side cryptography fundamentals
- Secure password handling
- Proper use of Web Crypto API
- Trade-offs between usability and security
- Debugging real-world JavaScript and DOM issues

---

## 📸 Screenshots

_Add screenshots or GIFs here_

---

## 📜 License

MIT
