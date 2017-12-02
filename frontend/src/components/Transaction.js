import {TableCell, TableRow} from 'material-ui/Table';
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {formatAmount, formatFloor, formatMoment} from '../formatters'


class Transaction extends Component {
    isExpense() {
        return this.props.transaction.type === 'expense'
    }

    isPayment() {
        return this.props.transaction.type === 'payment'
    }

    render() {
        return (
            <TableRow className={this.props.transaction.type}>
                <TableCell>
                    {formatMoment(this.props.transaction.moment)}
                </TableCell>
                <TableCell>
                    {formatFloor(this.props.transaction.floor)}
                </TableCell>
                <TableCell>
                    {
                        this.isExpense()
                        &&
                        `${this.props.transaction.expense_type.group.title} ${this.props.transaction.expense_type.title}`
                    }
                    {
                        this.isPayment()
                        &&
                        `Innbetaling`
                    }
                </TableCell>
                <TableCell numeric={true}>
                    {formatAmount(this.props.transaction.amount)}
                </TableCell>
                <TableCell numeric={true}>
                    {formatAmount(this.props.transaction.amount1)}
                </TableCell>
                <TableCell numeric={true}>
                    {formatAmount(this.props.transaction.amount2)}
                </TableCell>
                <TableCell>
                    {this.props.transaction.comments && this.props.transaction.comments}
                </TableCell>
            </TableRow>
        )
    }
}

Transaction.propTypes = {
    transaction: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        expense_type: PropTypes.object,
        floor: PropTypes.number.isRequired,
        moment: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired,
        comments: PropTypes.string
    }).isRequired
}

export default Transaction
