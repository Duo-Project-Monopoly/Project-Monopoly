var dice1=$("#dice_player1")
var dice2=$("#dice_player2")
var position1=1
var position2=1
var IDs=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32"]
// Function to apply style to passed positions
function highlightPassedPositions(current, target) {
    document.querySelectorAll('.cell').forEach(cell => {
    cell.classList.remove('passed-position');
    });
  for (var i = current ; i <=target; i++) {
    var cell = $(`.cell[id="${i}"]`)
    var preCell = $(`.cell[id="${i-1}"]`)
    preCell.removeClass("passed-position")
    console.log(cell)
      cell.addClass("passed-position")
  }
}
$(dice1).on("click",function(){
    var Random1=Math.floor((Math.random()*7))
    console.log(Random1)
    console.log(position1)
    highlightPassedPositions(position1,position1+Random1)
    position1=position1+Random1
})
$(dice2).on("click",function(){
    var Random1=Math.floor((Math.random()*7))
    highlightPassedPositions(position1,position1+Random1)

})




