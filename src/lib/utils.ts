
	export const capitalize = (s) => s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
	export const plural = (amount, w1,w2,w5) => {
		const x = parseInt(amount.toString().charAt(-1))
		if(x === 1) return w1
		if(x > 1 && x < 5) return w2
		return w5
	}