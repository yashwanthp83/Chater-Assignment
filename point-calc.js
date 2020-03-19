function getRewardPoints() {
    var moneySpent = document.getElementById("moneySpent").value;
    var points = 0;
    if (moneySpent > 50 && moneySpent <=100) {
        points = moneySpent - 50;
    } 
    else if (moneySpent > 100) {
        points = 50 + (moneySpent - 100) * 2
    }
    document.getElementById("points").innerHTML = points;
}