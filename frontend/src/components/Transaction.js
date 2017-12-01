import React, {Component} from 'react'
import PropTypes from 'prop-types'

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
                    {this.props.transaction.date}
                </td>
                <td>
                    {this.props.transaction.floor}.
                </td>
                <td>
                    {
                        this.isExpense()
                        &&
                        `${this.props.transaction.amount} kr`
                    }
                </td>
                <td>
                    {
                        this.isExpense()
                        &&
                        `${this.props.transaction.expense_type.group.title} ${this.props.transaction.expense_type.title}`
                    }
                </td>
                <td>
                    {
                        this.isPayment()
                        &&
                        `${this.props.transaction.amount} kr`
                    }
                </td>
            </tr>
        )
    }
}

Transaction.propTypes = {
    transaction: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        expense_type: PropTypes.string,
        floor: PropTypes.number.isRequired,
        moment: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired
}

export default Transaction
