export function getRatingColor(movieRating) {
    if (!movieRating) {
        return "blue"
    }
    if (movieRating <= 40) {
        return "red"
    }
    if (movieRating > 40 && movieRating < 75) {
        return "orange"
    }
    return "greenyellow" //only if should not be used ,else also to be used 
}


// 2012/03/02
// 2nd March, 2012
// 2nd Mar, 2012

//login logout
//fav pages - protected routes (separate list)
//please login 
