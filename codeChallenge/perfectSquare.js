const perfectSquare = num => {
    let sqrtNum = Math.sqrt(num)
    if (Number.isInteger(sqrtNum)){
        return (sqrtNum+1)**2
    }else {
        return -1
    }
}

// One Liner possiblity 
const perfectOne = num => Number.isInteger(Math.sqrt(num)) ? (Math.sqrt(num)+1)**2 : -1

console.log(perfectOne(25))
console.log(perfectOne(49))
console.log(perfectOne(64))
console.log(perfectOne(289))
console.log(perfectOne(3000))
console.log(perfectOne(8))
console.log(perfectOne(4))