const fs = require('fs')
const util = require('util')

const fileContents = fs.readFileSync('./sample-1.txt').toString()

const allLines = fileContents.split("\n")

const order = {
	items: [],
	total: null,
}

for( const line of allLines ) {
	{
		const productLineMatcher =
			/^(.+)\s+(\d+)\s?(\w+)\s+(?:(?:(\$|USD)\s*(\d+(?:\.\d+)?))|(?:(\d+(?:\.\d+)?)\s*(\$|USD)))\s+(?:(?:(\$|USD)\s*(\d+(?:\.\d+)?))|(?:(\d+(?:\.\d+)?)\s*(\$|USD)))\s*$/i

		const match = productLineMatcher.exec( line )

		if( match !== null ) {
			const productName = match[1]

			const quantity = {
				amount: parseInt( match[2] ),
				units: match[3],
			}

			const price = {
				amount: parseFloat( match[5] || match[6] ),
				currency: match[4] || match[7],
			}

			const subtotal = {
				amount: parseFloat( match[9] || match[10] ),
				currency: match[8] || match[11],
			}

			const product = {
				product: productName,
				quantity: quantity,
				price: price,
				subtotal: subtotal,
			}

			order.items.push( product )
		}
	}

	{
		const totalLineMatcher =
			/^Total:?\s*(?:(\$|USD)\s*(\d+(?:\.\d+)?))|(?:(\d+(?:\.\d+)?)\s*(\$|USD))$/i

		const match = totalLineMatcher.exec( line )

		if( match !== null ) {
			const amount1 = match[2]
			const amount2 = match[3]

			const currency1 = match[1]
			const currency2 = match[4]

			order.total = {
				amount: parseFloat( amount1 || amount2 ),
				currency: currency1 || currency2
			}
		}
	}
}

console.log( util.inspect(order, false, null, true) )

