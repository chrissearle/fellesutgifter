import React, {Component} from 'react'
import ExpenseService from '../services/ExpenseService'
import Loading from './Loading'
import moment from 'moment'
import Transaction from './Transaction'

class List extends Component {
    state = {
        loadingExpenses: true,
        loadingPayments: true,
        errorExpenses: false
    };

    componentDidMount() {
        ExpenseService.getExpenses(expenses => {
            this.setState({
                expenses: expenses,
                loadingExpenses: false
            })

            this.mergeTransactions()
        }).catch(() => {
            this.setState({
                expenses: undefined,
                loadingExpenses: false,
                errorExpenses: true
            })
        })

        ExpenseService.getPayments(payments => {
            this.setState({
                payments: payments,
                loadingPayments: false
            })

            this.mergeTransactions()
        }).catch(() => {
            this.setState({
                payments: undefined,
                loadingPayments: false,
                errorPayments: true
            })
        })
    }

    mergeTransactions() {
        if (this.state.errorExpenses || this.state.errorPayments) {
            return
        }

        if (this.state.loadingExpenses || this.state.loadingPayments) {
            return
        }

        const transactions = []

        this.state.payments.forEach((payment) => {
            transactions.push(
                {
                    ...payment,
                    type: 'payment',
                    moment: moment(payment.date)
                }
            )
        })

        this.state.expenses.forEach((expense) => {
            transactions.push(
                {
                    ...expense,
                    type: 'expense',
                    moment: moment(expense.date)
                }
            )
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

        this.setState({
            transactions: transactions
        })
    }

    render() {
        if (this.state.errorExpenses || this.state.errorPayments) {
            return (
                <span>Error</span>
            )
        }

        if (this.state.loadingExpenses || this.state.loadingPayments || !this.state.transactions) {
            return (
                <Loading/>
            )
        }

        return (
            <div>
                <h1>Transactions</h1>

                <table>
                    <thead>
                    <tr>
                        <th>Dato</th>
                        <th>Etasje</th>
                        <th>Utgift</th>
                        <th>Beskrivelse</th>
                        <th>Oppgjør</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.transactions.map((tx) => (
                        <Transaction transaction={tx}/>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default List
