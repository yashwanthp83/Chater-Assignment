function getRewardPoints(moneySpent) {
    var rewardPoints = 0;
    if (moneySpent > 50 && moneySpent <=100) {
        rewardPoints = moneySpent - 50;
    } 
    else if (moneySpent > 100) {
        rewardPoints = 50 + (moneySpent - 100) * 2
    }
    return rewardPoints;
}

class Sales {
    constructor() {
        this.salesList = [];
    }

    addSale(price, date) {
        this.salesList.push(new Sale(price, date));
    }

    getAllSales() {
        return this.salesList.sort((a,b) => b.date-a.date);
    }

    getSalesForLastThreeMonths() {
        var date = new Date();
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth();
        const list = this.getLastThreeMonths(currentYear, currentMonth);
        let lastThreeMonthSales = [];
        list.forEach((obj, i) => {
            let filteredList = this.salesList.filter(sale => sale.date.getFullYear() == obj.getFullYear() && sale.date.getMonth() == obj.getMonth())
            lastThreeMonthSales = lastThreeMonthSales.concat(filteredList);
        });
        return lastThreeMonthSales.sort((a,b) => b.date - a.date);
    }

    getRewardsForCurrentMonth() {
        let filteredList = this.salesList.filter(sale => sale.date.getFullYear() == (new Date()).getFullYear() && sale.date.getMonth() == (new Date()).getMonth());
        return filteredList.reduce((acc,key)=>key.rewardPoints+acc,0);
    }

    getRewardPerMonthForLastThreeMonths() {
        var date = new Date();
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth();
        const list = this.getLastThreeMonths(currentYear, currentMonth);
        let lastThreeMonthRewardsInDesc = [];
        list.forEach((obj, i) => {
            let filteredList = this.salesList.filter(sale => sale.date.getFullYear() == obj.getFullYear() && sale.date.getMonth() == obj.getMonth())
            lastThreeMonthRewardsInDesc[i] = filteredList.reduce((acc,key)=>key.rewardPoints+acc,0);
        });
        return lastThreeMonthRewardsInDesc;
    }

    getSalesForCurrentMonth() {
        let currentMonthSales = this.salesList.filter(sale => sale.date.getFullYear() == (new Date()).getFullYear() && sale.date.getMonth() == (new Date()).getMonth());
        return currentMonthSales;
    }
    
    getLastThreeMonths(currentYear, currentMonth) {
        let list;
        if (currentMonth < 3) {
            switch(currentMonth) {
                case 2: 
                    list = [new Date(currentYear, 1), new Date(currentYear, 0), new Date(currentYear-1, 11)];
                    break;
                case 1:
                    list = [new Date(currentYear, 0), new Date(currentYear-1,11), new Date(currentYear-1, 10)];
                    break;
                case 0:
                    list = [new Date(currentYear-1,11), new Date(currentYear-1, 10), new Date(currentYear-1, 9)];
                    break;
            }
        }
        else {
            list = [new Date(currentYear,currentMonth-1), new Date(currentYear, currentMonth-2), new Date(currentYear, currentMonth-3)];
        }
        return list;
    }
}

class Sale {
    constructor(moneySpent, date) {
        this.moneySpent = moneySpent;
        this.rewardPoints = getRewardPoints(moneySpent);
        this.date = date;
    }
}

let sales = new Sales();
sales.addSale(152, new Date());
sales.addSale(92, new Date(2020, 1));
sales.addSale(92, new Date(2020, 0));
sales.addSale(92, new Date(2020, 0));
sales.addSale(152, new Date(2019, 11));
console.log("**************************************")
console.log("*********Rewards For Last 3 Months*************")
console.log(sales.getRewardPerMonthForLastThreeMonths());
console.log("**************************************")
console.log("*********All Sales*************")
console.log(sales.getAllSales());
console.log("**************************************")
console.log("*********All Sales For Last three months*************")
console.log(sales.getSalesForLastThreeMonths());
console.log("**************************************")
console.log("*********All Sales For Current Month*************")
console.log(sales.getSalesForCurrentMonth());
console.log("**************************************")
console.log("*********Rewards For Current Month*************")
console.log(sales.getRewardsForCurrentMonth());
console.log("*********End of Program ***********")
console.log("**************************************")







