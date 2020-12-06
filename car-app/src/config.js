import { createGlobalState } from 'react-hooks-global-state';

const config = {
    API_URL: 'http://localhost:3000/',
    globalState: createGlobalState({ model: null, part: null, cart: { items: [], open: false } }),
    jsonCopy: (value) => {
        return JSON.parse(JSON.stringify(value));
    }
}

export default config;