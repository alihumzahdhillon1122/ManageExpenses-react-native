import { View, StyleSheet } from 'react-native';
import { useLayoutEffect } from 'react';
import IconButton from '../components/ExpensesOutput/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/ExpensesOutput/UI/Button';

function ManageExpenses({ route, navigation }) {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    function deleteExpenseHandler() {
        // Implement deletion logic here
        navigation.goBack()

    }

    function cancelHandler() {
        navigation.goBack()
     }

    function confirmHandler() { 
        navigation.goBack()

    }


    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button style={styles.button} mode='flat' onWhenPress={cancelHandler}>
                    Cancel
                </Button>
                <Button style={styles.button} onWhenPress={confirmHandler}>
                    {isEditing ? 'update' : 'Add'}
                </Button>
            </View>
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

    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
        

    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },

});
