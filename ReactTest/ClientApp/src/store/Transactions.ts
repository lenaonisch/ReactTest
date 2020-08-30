import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface TransactionsState {
    isLoading: boolean;
    transactions: Transaction[];
    startPageIndex?: number;
    transactionTypeFilters: string[];
    transactionStatusFilters: string[];
    currentType: string;
    currentStatus: string;
}

export interface Transaction {
    transactionId: number;
    transactionStatus: string;
    transactionType: string;
    clientName: string;
    amount: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestTransactionsAction {
    type: 'REQUEST_TRANSACTIONS';
    startPageIndex: number;
}

interface ReceiveTransactionsAction {
    type: 'RECEIVE_TRANSACTIONS';
    transactions: Transaction[];
    startPageIndex: number;
}

interface ChangeTypeFilterAction {
    type: 'TYPE_FILTER';
    transactionType: string;
}

interface ChangeStatusFilterAction {
    type: 'STATUS_FILTER';
    transactionStatus: string;
}

interface ReceiveStatusesAction {
    type: 'RECEIVE_STATUSES';
    transactionStatuses: string[];
}

interface ReceiveTypesAction {
    type: 'RECEIVE_TYPES';
    types: string[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestTransactionsAction | ReceiveTransactionsAction | ReceiveStatusesAction | ReceiveTypesAction | ChangeTypeFilterAction | ChangeStatusFilterAction ;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestTransactions: (startPageIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();

       
        if (appState && appState.transactions && startPageIndex !== appState.transactions.startPageIndex) {
            fetch(`transactions`)
                .then(response => response.json() as Promise<Transaction[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_TRANSACTIONS', startPageIndex: startPageIndex, transactions: data });
                });

            dispatch({ type: 'REQUEST_TRANSACTIONS', startPageIndex: startPageIndex});
        }
    },

    changeTypeFilter: (type: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();

        if (appState && appState.transactions && (type !== appState.transactions.currentType)) {
            dispatch({ type: 'TYPE_FILTER', transactionType: type});
        }
    },

    changeStatusFilter: (status: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();

        if (appState && appState.transactions && (status !== appState.transactions.currentType)) {
            dispatch({ type: 'STATUS_FILTER', transactionStatus: status });
        }
    },

    requestStatuses: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        
        const appState = getState();
        if (appState && appState.transactions && appState.transactions.transactionStatusFilters.length == 0) {
            fetch(`transactions/statuses`)
                .then(response => response.json() as Promise<string[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_STATUSES', transactionStatuses: data });
                });
        }
    },

    requestTypes: (): AppThunkAction<KnownAction> => (dispatch, getState) => {

        const appState = getState();
        if (appState && appState.transactions && appState.transactions.transactionTypeFilters.length == 0) {
            fetch(`transactions/types`)
                .then(response => response.json() as Promise<string[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_TYPES', types: data });
                });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: TransactionsState = { transactions: [], isLoading: false, transactionTypeFilters: [], transactionStatusFilters: [], currentStatus: "", currentType: "" };

export const reducer: Reducer<TransactionsState> = (state: TransactionsState | undefined, incomingAction: Action): TransactionsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_TRANSACTIONS':
            return {
                startPageIndex: action.startPageIndex,
                transactionTypeFilters: state.transactionTypeFilters,
                transactionStatusFilters: state.transactionStatusFilters,
                transactions: state.transactions,
                currentStatus: state.currentStatus,
                currentType: state.currentType,
                isLoading: true
            };
        case 'RECEIVE_TRANSACTIONS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.startPageIndex === state.startPageIndex) {
                return {
                    startPageIndex: action.startPageIndex,
                    transactions: action.transactions,
                    transactionTypeFilters: state.transactionTypeFilters,
                    transactionStatusFilters: state.transactionStatusFilters,
                    currentStatus: state.currentStatus,
                    currentType: state.currentType,
                    isLoading: false
                };
            }
            break;
        case 'RECEIVE_STATUSES':
            return {
                transactions: state.transactions,
                transactionTypeFilters: state.transactionTypeFilters,
                transactionStatusFilters: action.transactionStatuses,
                currentStatus: state.currentStatus,
                currentType: state.currentType,
                isLoading: false
            };
        case 'RECEIVE_TYPES':
            return {
                transactions: state.transactions,
                transactionTypeFilters: action.types,
                transactionStatusFilters: state.transactionStatusFilters,
                currentStatus: state.currentStatus,
                currentType: state.currentType,
                isLoading: false
            };
        case 'TYPE_FILTER':
            if (action.transactionType !== state.currentType) {
                return {
                    startPageIndex: state.startPageIndex,
                    transactions: state.transactions,
                    transactionTypeFilters: state.transactionTypeFilters,
                    transactionStatusFilters: state.transactionStatusFilters,
                    currentStatus: state.currentStatus,
                    currentType: action.transactionType,
                    isLoading: false
                };
            }
            break;
        case 'STATUS_FILTER':
            if (action.transactionStatus !== state.currentStatus) {
                return {
                    startPageIndex: state.startPageIndex,
                    transactions: state.transactions,
                    transactionTypeFilters: state.transactionTypeFilters,
                    transactionStatusFilters: state.transactionStatusFilters,
                    currentStatus: action.transactionStatus,
                    currentType: state.currentType,
                    isLoading: false
                };
            }
            break;
    }

    return state;
};
