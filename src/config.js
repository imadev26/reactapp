// src/config.js
// Use a relative base so the Create React App dev server can proxy requests
// (this avoids CORS during development). The package.json proxy points to
// http://localhost:8082.
const API_BASE_URL = "/banque";

export default API_BASE_URL;
