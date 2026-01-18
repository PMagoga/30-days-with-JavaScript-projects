const names = ["Hole-in-one!", "Eagle", "Birdie", "Par", "Bogey", "Double Bogey", "Go Home!"];

function golfScore(arg1, arg2){
  switch(true){
    case (arg2 === 1):
      return("Hole-in-one")

    case (arg2 <= (arg1 - 2)):
      return("Eagle")

    case (arg2 === (arg1 - 1)):
      return("Birdie")

    case (arg2 === arg1):
      return("Par")
      
    case (arg2 === (arg1 + 1)):
      return("Bogey")

    case (arg2 === (arg1 + 2)):
      return("Double Bogey")

    default:
      return("Go Home!")

  }
}
