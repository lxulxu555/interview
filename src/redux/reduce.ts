import { createContext, Dispatch } from "react";
import { DemoState, initialState } from "./state";

export type demoAction = { type: 'UpdateState'; update: Partial<DemoState> };
export type Dispatcher = (action: demoAction) => any;
export interface DemoContext {
    state: DemoState;
    dispatch: Dispatcher;
}
export const demoContext = createContext<DemoContext>({ state: initialState, dispatch: () => { } });

export function dispatchMiddleware(next: Dispatch<demoAction>): Dispatcher {
    return async (action: demoAction) => {
        switch (action.type) {
            default:
                next(action);
        }
    }
}

export const demoReducer = (state: DemoState, action: demoAction) => {
    switch (action.type) {
        case 'UpdateState':
            return { ...state, ...action.update };
        default:
            return state;
    }
}