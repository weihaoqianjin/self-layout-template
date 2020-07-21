// 银行卡校验
function luhnCheck (bankno) {
    let reg = /^\d*$/
    if (!bankno || !reg.test(bankno) || (bankno.length < 16 && bankno.length > 19)) return false
    let lastNum = bankno.substr(bankno.length - 1, 1)// 取出最后一位（与luhn进行比较）
    let first15Num = bankno.substr(0, bankno.length - 1)// 前15或18位
    let newArr = []
    for (let i = first15Num.length - 1; i > -1; i--) { // 前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1))
    }
    let arrJiShu = [] // 奇数位*2的积 <9
    let arrJiShu2 = [] // 奇数位*2的积 >9

    let arrOuShu = [] // 偶数位数组
    for (let j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 === 1) { // 奇数位
            if (parseInt(newArr[j]) * 2 < 9) { arrJiShu.push(parseInt(newArr[j]) * 2) } else { arrJiShu2.push(parseInt(newArr[j]) * 2) }
        } else { // 偶数位
            arrOuShu.push(newArr[j])
        }
    }

    let jishuChild1 = []// 奇数位*2 >9 的分割之后的数组个位数
    let jishuChild2 = []// 奇数位*2 >9 的分割之后的数组十位数
    for (let h = 0; h < arrJiShu2.length; h++) {
        jishuChild1.push(parseInt(arrJiShu2[h]) % 10)
        jishuChild2.push(parseInt(arrJiShu2[h]) / 10)
    }

    let sumJiShu = 0 // 奇数位*2 < 9 的数组之和
    let sumOuShu = 0 // 偶数位数组之和
    let sumJiShuChild1 = 0 // 奇数位*2 >9 的分割之后的数组个位数之和
    let sumJiShuChild2 = 0 // 奇数位*2 >9 的分割之后的数组十位数之和
    let sumTotal = 0
    for (let m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m])
    }

    for (let n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n])
    }

    for (let p = 0; p < jishuChild1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishuChild1[p])
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishuChild2[p])
    }
    // 计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2)

    // 计算luhn值

    let k = parseInt(sumTotal) % 10 === 0 ? 10 : parseInt(sumTotal) % 10
    let luhn = 10 - k
    if (Number(lastNum) === luhn) {
        return true
    } else {
        return false
    }
}
// 手机号码校验
function phoneCheck (phone) {
    let reg = /^1[0-9]{10}$/
    return reg.test(phone)
}
// 身份证号校验
function idCardCheck (id) {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    return reg.test(id)
}
export {luhnCheck, phoneCheck, idCardCheck}
