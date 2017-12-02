import AppBar from 'material-ui/es/AppBar/AppBar'
import CardContent from 'material-ui/es/Card/CardContent'
import Toolbar from 'material-ui/es/Toolbar/Toolbar'
import Typography from 'material-ui/es/Typography/Typography'
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import React, {Component} from 'react'
import Card from '../../node_modules/material-ui/Card/Card'
import {formatAmount} from '../formatters'
import ExpenseService from '../services/ExpenseService'
import TransactionService from '../services/TransactionService'
import Loading from './Loading'
import Transaction from './Transaction'
import Button from 'material-ui/es/Button/Button'

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
                <AppBar position="static">
                    <Toolbar>
                        <Typography type="title" color="inherit" className="mainToolbarText">
                            Utgifter og innbetalinger
                        </Typography>
                        <Button color="contrast">Legg til utgift</Button>
                        <Button color="contrast">Legg til innbetaling</Button>
                    </Toolbar>
                </AppBar>

                {this.state.balance &&
                <Card>
                    <CardContent>
                        <Typography type="body1">
                            {this.state.balance > 0 &&
                            <span>2. etg skylder: </span>
                            }
                            {this.state.balance < 0 &&
                            <span>1. etg skylder: </span>
                            }
                            {formatAmount(Math.abs(this.state.balance))}
                        </Typography>
                    </CardContent>
                </Card>
                }

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Dato</TableCell>
                            <TableCell>Etasje</TableCell>
                            <TableCell>Beskrivelse</TableCell>
                            <TableCell numeric={true}>Verdi</TableCell>
                            <TableCell numeric={true}>Tilh. 1. etg</TableCell>
                            <TableCell numeric={true}>Tilh. 2. etg</TableCell>
                            <TableCell>Kommentar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.transactions.map((tx) => (
                            <Transaction key={`${tx.date} ${tx.floor} ${tx.type} ${tx.amount}`} transaction={tx}/>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default List
