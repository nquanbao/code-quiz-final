var scorelistEl = document.querySelector(".score-list")
var clearEl = document.querySelector(".clear")
var highScore = JSON.parse(localStorage.getItem("UserRecord")) || []
var userscoreEls = document.querySelectorAll("#userscore")

var list = highScore;
console.log(list.length)
for ( var i = 0; i < list.length; i++) {
    var liEl = document.createElement('li')
    liEl.innerHTML = list[i].initial + " - " + list[i].score1;
    document.body.children[0].children[0].children[1].appendChild(liEl)
}

clearEl.addEventListener("click", function(){
    localStorage.clear()
})