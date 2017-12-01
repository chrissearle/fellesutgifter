import moment from 'moment'

function mergeTransactions(payments, expenses) {
    const transactions = []

    let balance = 0.0

    payments.forEach((payment) => {
        const tx = {
            ...payment,
            type: 'payment',
            moment: moment(payment.date)
        }

        if (payment.floor === 1) {
            balance = balance + payment.amount
            tx.amount1 = tx.amount
            tx.amount2 = 0
        }
        if (payment.floor === 2) {
            balance = balance - payment.amount
            tx.amount2 = tx.amount
            tx.amount1 = 0
        }

        transactions.push(tx)
    })

    expenses.forEach((expense) => {

        const tx = {
            ...expense,
            type: 'expense',
            moment: moment(expense.date)
        }

        if (expense.floor === 1) {
            tx.amount1 = (expense.amount * (expense.expense_type.group.first_floor_percent / 100.0))
            tx.amount2 = expense.amount - tx.amount1
            balance = balance + tx.amount2
        }
        if (expense.floor === 2) {
            tx.amount2 = (expense.amount * ((100.0 - expense.expense_type.group.first_floor_percent) / 100.0))
            tx.amount1 = expense.amount - tx.amount2
            balance = balance - tx.amount2
        }

        transactions.push(tx)
    })

    transactions.sort((a, b) => {
        if (a.moment.isBefore(b.moment)) {
            return 1
        }

        if (a.moment.isAfter(b.moment)) {
            return -1
        }

        return 0
    })

    return {
        transactions: transactions,
        balance: balance
    }
}

const TransactionsService = {mergeTransactions}

export default TransactionsService