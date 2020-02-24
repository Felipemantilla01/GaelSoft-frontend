time = new Date
console.log(time)

stringTime = time.setTime(time.getTime()+2)
console.log(stringTime)

timePlus = new Date(stringTime)

console.log(timePlus)
