export type Currency = 'USD' | 'EUR' | 'GBP'

export const numberRegex = /^(\d*)(?:\.(\d{0,2}))?$/

export function format(n: number): string {
	if (n >= 5) {
		return n.toFixed(0)
	} else if (n >= 1) {
		return `${parseFloat(n.toFixed(1))}`
	} else {
		const str = n.toPrecision(1)
		if (str.includes('e')) {
			const [a, b] = str.split('e')
			return `${parseFloat(a) * Math.pow(10, parseInt(b, 10))}`
		} else {
			return str
		}
	}
}

const factorials = [
	1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600,
	6227020800, 87178291200, 1307674368000, 20922789888000, 355687428096000,
	6402373705728000,
]
const factorial = (n: number): number => factorials[n] || Infinity
const poisson = (lambda: number, n: number): number =>
	(Math.pow(Math.E, -lambda) * Math.pow(lambda, n)) / factorial(n)

// taken from latest data from givewell.org
export const currentUsdPerLifeSaved = 4106
export const currentUsdNetPrice = 2

export const usdPer: Record<Currency, number> = {
	USD: 1,
	EUR: 1.18,
	GBP: 1.37,
}

export const donateLinks: Record<Currency, string> = {
	USD: 'https://www.paypal.com/us/fundraiser/charity/113632',
	EUR: 'https://www.againstmalaria.com/donate.aspx',
	GBP: 'https://www.paypal.com/gb/fundraiser/charity/3181936',
}

export const formatters: Record<Currency, Intl.NumberFormat> = {
	USD: new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}),
	EUR: new Intl.NumberFormat('en-DK', {
		style: 'currency',
		currency: 'EUR',
	}),
	GBP: new Intl.NumberFormat('en-GB', {
		style: 'currency',
		currency: 'GBP',
	}),
}

export function numberFromValue(value: string): number {
	return parseFloat(parseFloat(`0${value || '100'}`).toFixed(2))
}

export function usdEquivalent(number: number, currency: Currency): number {
	return number * usdPer[currency]
}

export function probabilityLifeSaved(usdEquiv: number): number {
	const numberOfNets = usdEquiv / currentUsdNetPrice
	return 1 - poisson(numberOfNets / (currentUsdPerLifeSaved / currentUsdNetPrice), 0)
}
