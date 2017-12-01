import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {formatMoment, formatFloor, formatAmount} from '../formatters'

class Transaction extends Component {
    isExpense() {
        return this.props.transaction.type === 'expense'
    }

    isPayment() {
        return this.props.transaction.type === 'payment'
    }

    render() {
        return (
            <tr>
                <td>
                    {formatMoment(this.props.transaction.moment)}
                </td>
                <td align='center'>
                    {formatFloor(this.props.transaction.floor)}
                </td>
                <td>
                    {
                        this.isExpense()
                        &&
                        `${this.props.transaction.expense_type.group.title} ${this.props.transaction.expense_type.title}`
                    }
                </td>
                <td align='right'>
                    {
                        this.isExpense()
                        &&
                        formatAmount(this.props.transaction.amount)
                    }
                </td>
                <td align='right'>
                    {
                        this.isPayment()
                        &&
                        formatAmount(this.props.transaction.amount)
                    }
                </td>
                <td align='right'>
                    {formatAmount(this.props.transaction.amount1)}
                </td>
                <td align='right'>
                    {formatAmount(this.props.transaction.amount2)}
                </td>
                <td>
                    {this.props.transaction.comments && this.props.transaction.comments}
                </td>
            </tr>
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
