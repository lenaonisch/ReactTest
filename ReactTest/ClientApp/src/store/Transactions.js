"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = void 0;
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
exports.actionCreators = {
    requestTransactions: function (startPageIndex) { return function (dispatch, getState) {
        // Only load data if it's something we don't already have (and are not already loading)
        var appState = getState();
        if (appState && appState.transactions && startPageIndex !== appState.transactions.startPageIndex) {
            fetch("transactions")
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_TRANSACTIONS', startPageIndex: startPageIndex, transactions: data });
            });
            dispatch({ type: 'REQUEST_TRANSACTIONS', startPageIndex: startPageIndex });
        }
    }; },
    changeTypeFilter: function (type) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.transactions && (type !== appState.transactions.currentType)) {
            dispatch({ type: 'TYPE_FILTER', transactionType: type });
        }
    }; },
    changeStatusFilter: function (newStatus) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.transactions && (newStatus !== appState.transactions.currentType)) {
            dispatch({ type: 'STATUS_FILTER', transactionStatus: newStatus });
        }
    }; },
    exportCSV: function () { return function (dispatch, getState) {
        var appState = getState();
        var data = {
            "TransactionStatus": 1,
            "TransactionType": 1
        };
        fetch("transactions/export")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            dispatch({ type: 'RECEIVE_FILE_URL', fileURL: data });
        });
    }; },
    requestStatuses: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.transactions && appState.transactions.transactionStatusFilters.length == 0) {
            fetch("transactions/statuses")
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_STATUSES', transactionStatuses: data });
            });
        }
    }; },
    requestTypes: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.transactions && appState.transactions.transactionTypeFilters.length == 0) {
            fetch("transactions/types")
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_TYPES', types: data });
            });
        }
    }; }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = { transactions: [], isLoading: false, transactionTypeFilters: [], transactionStatusFilters: [], currentStatus: "", currentType: "", fileURL: "public/resources/090120201709.csv" };
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
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
        case 'RECEIVE_FILE_URL':
            if (action.fileURL != '') {
                return {
                    startPageIndex: state.startPageIndex,
                    transactions: state.transactions,
                    transactionTypeFilters: state.transactionTypeFilters,
                    transactionStatusFilters: state.transactionStatusFilters,
                    currentStatus: state.currentStatus,
                    currentType: state.currentType,
                    fileURL: action.fileURL,
                    isLoading: false
                };
            }
            break;
    }
    return state;
};
//# sourceMappingURL=Transactions.js.map