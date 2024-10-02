import { StyleSheet, Text, View, Alert } from 'react-native';
import Input from './Input';
import Button from '../ExpensesOutput/UI/Button';
import { getFomattedDate } from '../../utill/date';
import { useState } from 'react';
import { GlobalStyles } from '../../constants/styles';

function ExpenseForm({ submitButttonLabel, onCancel, onSubmit, defaultValues }) {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValues ? getFomattedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        },
    });
    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true },
            }
        });

    }
    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const discriptionIsValid = expenseData.description.trim().length > 0;
        if (!amountIsValid || !dateIsValid || !discriptionIsValid) {
            // Alert.alert('Inavalid Input!', 'please check your input values')
            setInputs((curInputs) => {
                return {
                    amount: { value: curInputs.amount.value, isValid: amountIsValid },
                    date: { value: curInputs.date.value, isValid: dateIsValid },
                    description: { value: curInputs.description.value, isValid: discriptionIsValid },
                }
            })
            return;
        }

        onSubmit(expenseData)

    }

    const formIsValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.rowInput}
                    label="Amount"
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputs.amount.value
                    }}
                />
                <Input
                    style={styles.rowInput}
                    label="Date"
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputs.date.value
                    }}
                />
            </View>
            <Input
                label="Description"
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    // autoCapitalize: 'none'
                    // autoCorrect: false // default is true
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputs.description.value
                }}
            />
            {formIsValid &&
                <Text style={styles.error}>Invalid Input Values - Plz Check Your Data</Text>}
            <View style={styles.buttons}>
                <Button style={styles.button} mode='flat' onWhenPress={onCancel}>
                    Cancel
                </Button>
                <Button style={styles.button} onWhenPress={submitHandler}>
                    {submitButttonLabel}
                </Button>
            </View>
        </View >
    );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    error: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8

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
});

