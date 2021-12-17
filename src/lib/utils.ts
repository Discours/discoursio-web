export const capitalize = (s) =>
	s
		.split(' ')
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(' ')

export const plural = (amount, w1, w2, w5) => {
	const a = amount.toString()
	const x = parseInt(a.charAt(a.length - 1))
	if (x === 1) return w1
	if (x > 1 && x < 5) return w2
	return w5
}

export const shuffle = (items) => {
    var cached = items.slice(0), temp, i = cached.length, rand;
    while(--i) {
        rand = Math.floor(i * Math.random())
        temp = cached[rand]
        cached[rand] = cached[i]
        cached[i] = temp
    }
    return cached
}