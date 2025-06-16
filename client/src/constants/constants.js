export const API_URL = import.meta.env.PROD
  ? "https://final-project-verow23.onrender.com/api"
  : "http://localhost:3000/api";

export const API_TOKEN = import.meta.env.PROD
  ? "dd5f3644e1f2db9617cbcab7fab814e189c58a97b7aa78600922b892f403224efbe3e3392376d549d8a91db0f47d45014861ffc59b74560db45d6f9b7759ebb0f1dc3e4b59c5a3652ee5bd7c1bfff3bb667fcd4964ce4310fc811643083e484bc7acf92aab71ec6468c12d86e910e5fe5e795310c81e92a79c1b498162f2ed62"
  : "fb165e03f8dec7d7e3abb37b6a997aa6f7ea8e101727b3c43a8780028115c65aea793dcca2a372a1437b279605335e03cefb9531d51c035c349e628aedc9fb21de40818e01ab3c69dd8d0d60a8d2168d620088211742c5079109ae5af355a5a3c64bc5df05f3af32abc8347b9aba7776ae65a1feee1e8a38bf8bd1c75de211e4";

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
