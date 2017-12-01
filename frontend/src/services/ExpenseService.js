function getExpenses(cb) {
    return fetch(`/expenses`, {
        accept: 'application/json',
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb)
}

function getPayments(cb) {
    return fetch(`/payments`, {
        accept: 'application/json',
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb)
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }

    const error = new Error(`HTTP Error ${response.statusText}`)
    error.status = response.statusText
    error.response = response
    throw error
}

function parseJSON(response) {
    return response.json()
}


const ExpenseService = {getExpenses, getPayments}

export default ExpenseService