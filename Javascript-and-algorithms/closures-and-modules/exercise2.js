const Bank = function (){
    let money = 500;

    const DepositCash = function (cash) {
        money += cash;
    }
    const checkBalance = function () {
        console.log(money);
    }

    return {
        deposit : DepositCash,
        showBalance : checkBalance
    }
}


const bank = Bank()
bank.deposit(200)
bank.deposit(250)
bank.showBalance() //should print 950
