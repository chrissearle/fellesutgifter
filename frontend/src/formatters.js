import moment from 'moment'
import 'moment/locale/nb'

moment.locale('nb')

export function formatMoment(mom) {
    return mom.local().format('DD. MMM YYYY')
}

export function formatDate(date) {
    return formatMoment(moment(date))
}

export function formatFloor(floor) {
    return `${floor}.`
}

export function formatAmount(amount) {
    if (Math.abs(amount) > 0) {
        return new Intl.NumberFormat('nb-NO', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount) + ' kr'
    } else {
        return ''
    }
}

