import { createContext, useReducer } from 'react'


const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2024-09-30')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2024-09-29')
    },
    {
        id: 'e3',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2024-10-01')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 14.99,
        date: new Date('2024-09-07')
    },
    {
        id: 'e5',
        description: 'Another Book',
        amount: 10.99,
        date: new Date('2024-09-18')
    },
    {
        id: 'e6',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2024-09-15')
    },
    {
        id: 'e7',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2024-09-05')
    },
    {
        id: 'e8',
        description: 'A book',
        amount: 14.99,
        date: new Date('2024-09-27')
    },
    {
        id: 'e9',
        description: 'Another Book',
        amount: 10.99,
        date: new Date('2024-09-30')
    }
]


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { },
});

function expensesReduser(state, action) {       // this is the reducer function 
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state]
        case 'UPDATE':
            const updateableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);

            const updatableExpense = state[updateableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updateableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state;

    }
}


function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReduser, DUMMY_EXPENSES)           // const [state, dispatch] = useReducer(reducer, initialArg, init?)


    // dispatch functions
    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData })
    }
    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id })
    }
    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } })
    }


    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }


    return <ExpensesContext.Provider value={value}>
        {children}
    </ExpensesContext.Provider>
}


export default ExpensesContextProvider;