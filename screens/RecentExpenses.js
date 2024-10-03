import { Text } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect, useState } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../utill/date';
import { fetchExpenses } from '../utill/http';
import LoadingOverlay from '../components/ExpensesOutput/UI/LoadingOverlay';
import ErrorOverlay from '../components/ExpensesOutput/UI/ErrorOverlay';

function RecentExpenses() {
    const expensesCtx = useContext(ExpensesContext);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    // const [fetchedExpenses, setFetchdexpenses] = useState([]);

    useEffect(() => {
        async function getExpense() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpense(expenses)
            } catch (error) {
                setError('could not fetch expenses');
            }

            setIsFetching(false);
            // setFetchdexpenses(expenses)
        }
        getExpense();
    }, []);

    // function errorHandler() {
    //     setError(null);
    // }

    if (error && !isFetching) {
        return <ErrorOverlay message={error} />   //  onConfirm={errorHandler}
    }

    if (isFetching) {
        return <LoadingOverlay />
    }

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return (expense.date >= date7DaysAgo) && (expense.date <= today);

    })
    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod="Last 7 Days"
            fallbackText='No expenses Register for the last 7days' />
    )

};



export default RecentExpenses;