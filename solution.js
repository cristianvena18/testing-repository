const fs = require('fs')
const util = require('util')

const fileContents = fs.readFileSync('./sample-1.txt').toString()


const parser = new ExpressionParser()

const order = parser.parse( fileContents )

console.log( util.inspect(order, false, null, true) )

