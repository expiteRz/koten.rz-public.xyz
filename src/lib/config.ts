import { createEffect } from "solid-js";
import { createStore, SetStoreFunction, Store } from "solid-js/store";

function setCookie(defaultOpen: boolean) {
    const config: SessionConfig = { defaultOpen: defaultOpen };
    document.cookie = JSON.stringify(config);
}

function getCookie() {
    return JSON.parse(document.cookie) as SessionConfig;
}

export function createLocalStore<T extends object>(key: string, initState: T): [Store<T>, SetStoreFunction<T>] {
    const [state, setState] = createStore(initState);

    if (typeof window !== "undefined") {
        console.log("client side");
        if (localStorage[key]) {
            try {
                setState(JSON.parse(localStorage[key]));
            } catch (err) {
                setState(initState);
            }
        }

        createEffect(() => { localStorage[key] = JSON.stringify(state) });
    } else {
        console.log("server side");
    }

    return [state, setState];
}