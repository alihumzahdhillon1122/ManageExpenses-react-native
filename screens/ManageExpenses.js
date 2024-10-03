import { View, StyleSheet } from 'react-native';
import { useContext, useLayoutEffect, useState } from 'react';
import IconButton from '../components/ExpensesOutput/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storExpense, updateExpense } from '../utill/http';
import LoadingOverlay from '../components/ExpensesOutput/UI/LoadingOverlay';
import ErrorOverlay from '../components/ExpensesOutput/UI/ErrorOverlay';

function ManageExpenses({ route, navigation }) {
    const [isSubmitting, setIssubmitting] = useState(false)
    const [error, setError] = useState();
    const expenseCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;


    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId)
    async function deleteExpenseHandler() {
        setIssubmitting(true);
        try {
            await deleteExpense(editedExpenseId);
            expenseCtx.deleteExpense(editedExpenseId);
            navigation.goBack()
        } catch (error) {
            setError('could not delete expense - plz try again later')
            setIssubmitting(false);
        }
    }

    function cancelHandler() {
        navigation.goBack()
    }

    async function confirmHandler(expenseData) {
        setIssubmitting(true);
        try {
            if (isEditing) {
                expenseCtx.updateExpense(editedExpenseId, expenseData)
                await updateExpense(editedExpenseId, expenseData);
            } else {
                const id = await storExpense(expenseData);
                expenseCtx.addExpense({ ...expenseData, id: id });

            }
            navigation.goBack()
        } catch (error) {
            setError('could not save data - plz try agin later')
            setIssubmitting(false);
        }

    }


    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    // function errorHandler() {
    //     setError(null);
    // }
    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} />  // onConfirm={errorHandler}
    }

    if (isSubmitting) {
        return <LoadingOverlay />;
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                submitButttonLabel={isEditing ? 'update' : 'Add'}
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                defaultValues={selectedExpense}
            />

            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon='trash'
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onWhenPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    );
}

export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,

    },


    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },

});
