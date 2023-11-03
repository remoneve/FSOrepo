const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    if (blogs.length < 1) return 0

    const likes = blogs.map(blog => blog.likes)

    const sumOfLikes = (sum, item) => {
        return sum + item
    }

    return likes.reduce(sumOfLikes, 0)
}

const favoriteBlog = (blogs) => {
    const likesInArray = blogs.map(blog => blog.likes)

    const getMostLikes = (biggest, current) => {
        return (current > biggest ? current : biggest)
    }

    const biggestAmountOfLikes = likesInArray.reduce(getMostLikes, 0)

    const bestBlog = blogs.find(({likes}) => likes === biggestAmountOfLikes)

    return (
        {
            title: bestBlog.title,
            author: bestBlog.author,
            likes: bestBlog.likes
        }
    )
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    var freq = {} //frequency of authors appereance
    var most = 0 //most appereances by one author (in list)
    var theAuth = "" //the author with most blogs

    for (var key in authors) {
        freq[authors[key]] = (freq[authors[key]] || 0) + 1 //use author as a key and add one each time as a value

        if (freq[authors[key]] > most) {
            most = freq[authors[key]]
            theAuth = authors[key]
        }
    }

    return (
        {
            author: theAuth,
            blogs: most
        }
    )
}

const mostLikes = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    const likes = blogs.map(blog => blog.likes)

    var freq = {}
    var mostLikes = 0 
    var theAuth = "" 

    for (var key in authors) {
        freq[authors[key]] = (freq[authors[key]] || 0) + likes[key] //use author as a key and add likes from the same index as a value

        if (freq[authors[key]] > mostLikes) {
            mostLikes = freq[authors[key]]
            theAuth = authors[key]
        }
    }
    
    return (
        {
            author: theAuth,
            likes: mostLikes
        }
    )
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }