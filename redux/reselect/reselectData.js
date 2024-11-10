import { createSelector } from 'reselect';

// Define base selector for datas
const selectExpenses = (state) => state.expenses;
const selectUser = (state) => state.auth;

//! Create a combined memoized selector
export const selectExpenseDetails = createSelector(
    [selectExpenses],
    (expenses) => ({
        expenseData: expenses?.expenseData,
        loadingStatus: expenses?.loadingStatus,
        loadingModal: expenses?.loadingModal,
    })
);

export const selectUserDetails = createSelector(
    [selectUser],
    (userDetails) => ({
        userData: userDetails?.userData,
        loadingStatus: userDetails?.loadingStatus,
        loadingModal: userDetails?.loadingModal,
    })
);
