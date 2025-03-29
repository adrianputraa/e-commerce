'use client'
import * as React from 'react'

type AuthDialogState = {
  loginDialog: boolean;
  registrationDialog: boolean;
  forgetPasswordDialog: boolean;
};

type AuthDialogAction =
  | { type: "OPEN_LOGIN" }
  | { type: "CLOSE_LOGIN" }
  | { type: "OPEN_REGISTRATION" }
  | { type: "CLOSE_REGISTRATION" }
  | { type: "OPEN_FORGET_PASSWORD" }
  | { type: "CLOSE_FORGET_PASSWORD" }
  | { type: "CLOSE_ALL" };

const initialState: AuthDialogState = {
  loginDialog: false,
  registrationDialog: false,
  forgetPasswordDialog: false,
};
  
const authDialogReducer = (state: AuthDialogState, action: AuthDialogAction): AuthDialogState => {
  switch (action.type) {
    case "OPEN_LOGIN":
      return { ...state, loginDialog: true };
    case "CLOSE_LOGIN":
      return { ...state, loginDialog: false };
    case "OPEN_REGISTRATION":
      return { ...state, registrationDialog: true };
    case "CLOSE_REGISTRATION":
      return { ...state, registrationDialog: false };
    case "OPEN_FORGET_PASSWORD":
      return { ...state, forgetPasswordDialog: true };
    case "CLOSE_FORGET_PASSWORD":
      return { ...state, forgetPasswordDialog: false };
    case "CLOSE_ALL":
      return initialState;
    default:
      return state;
  }
};
  
interface ModalStateContextType {
    state: {
        authDialog: AuthDialogState
    }
    dispatch: {
        authDialog: React.ActionDispatch<[action: AuthDialogAction]>
    }
}

const modalStateContext = React.createContext<ModalStateContextType | null>(null)

interface ModalStateProviderProps {
    children: React.ReactNode
}
export function ModalStateProvider({ children }: ModalStateProviderProps) {
    const [authDialogState, authDialogDispatch] = React.useReducer(authDialogReducer, initialState)


    const providerValue = {
        state: {
            authDialog: authDialogState
        },
        dispatch: {
            authDialog: authDialogDispatch
        }
    }

    return (
        <modalStateContext.Provider value={providerValue}>
            {children}
        </modalStateContext.Provider>
    )
}

export function useModalStateContext() {
    const context = React.use(modalStateContext)
    if (!context) {
        throw new Error("useModalStateContext can only be accessed with ModalStateProvider")
    }

    return context
}