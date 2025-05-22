export const API_URL = import.meta.env.PROD
    ? "https://final-project-verow23.onrender.com/api"
    : "http://localhost:3000/api";

export const API_TOKEN = import.meta.env.PROD
    ? "da4482765825d43fd7600e377d6b6fba1e7b5b706caf7ea7b9a630b7c79b1ae89cea49ab4132779131765ddf587d3598c13570bb240cb498fc87e19eeefe27bb45e4b06dff4d1849d914cb34fbf69ea9a9e0980bb20de7ae9ff9049038d2826519fba3a04ac94ec0d34a402e8b124be41ac50e7dcdf6d6966d25cd2c7ea76393"
    : "fb165e03f8dec7d7e3abb37b6a997aa6f7ea8e101727b3c43a8780028115c65aea793dcca2a372a1437b279605335e03cefb9531d51c035c349e628aedc9fb21de40818e01ab3c69dd8d0d60a8d2168d620088211742c5079109ae5af355a5a3c64bc5df05f3af32abc8347b9aba7776ae65a1feee1e8a38bf8bd1c75de211e4";


export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];