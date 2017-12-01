import React, {Component} from 'react'
import ExpenseService from '../services/ExpenseService'
import Loading from './Loading'
import Transaction from './Transaction'
import TransactionService from '../services/TransactionService'
import {formatAmount} from '../formatters'

class List extends Component {
    state = {
        loadingExpenses: true,
        loadingPayments: true,
        errorExpenses: false,
        balance: 0
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

        this.setState(TransactionService.mergeTransactions(this.state.payments, this.state.expenses))
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

                {this.state.balance &&
                <div>{formatAmount(this.state.balance)}</div>
                }

                <table>
                    <thead>
                    <tr>
                        <th>Dato</th>
                        <th>Etasje</th>
                        <th>Utgift</th>
                        <th>Beskrivelse</th>
                        <th>Oppgjør</th>
                        <th>Tilh. 1. etg</th>
                        <th>Tilh. 2. etg</th>
                        <th>Kommentar</th>
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
