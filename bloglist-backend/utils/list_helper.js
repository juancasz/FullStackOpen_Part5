const dummy = (blogs) => {
    return 1    
}

const totalLikes = (blogs) => {
    const reducer = (sum,blog) =>{
        return sum + blog.likes
    }

    return blogs.length === 0? 0 : blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
    const reducer = (favorite,blog) => {
        if(blog.likes>favorite.likes){
            return {title:blog.title,author:blog.author,likes:blog.likes}
        }
        return {title:favorite.title,author:favorite.author,likes:favorite.likes}
    }

    return blogs.length === 0? 0 : blogs.reduce(reducer,blogs[0])
}

const mostBlogs = (blogs) => {
    const blogsPerAuthor = {}
    blogs.forEach(blog => {
        if(Object.keys(blogsPerAuthor).includes(blog.author)){
            blogsPerAuthor[blog.author]++    
        }else{
            blogsPerAuthor[blog.author] = 1
        }
    })
    const reducer = (mostPosts,author) =>{
        if(author[1]>mostPosts[1]){
            return author
        }
        return mostPosts
    }

    const dataMostBlogs = Object.entries(blogsPerAuthor).reduce(reducer,Object.entries(blogsPerAuthor)[0])

    return blogs.length ===0?
        0: {author:dataMostBlogs[0],blogs:dataMostBlogs[1]}
}

const mostLikes = (blogs) => {
    const likesPerAuthor = {}
    blogs.forEach(blog => {
        if(Object.keys(likesPerAuthor).includes(blog.author)){
            likesPerAuthor[blog.author] += blog.likes
        }else{
            likesPerAuthor[blog.author] = blog.likes
        }
    }) 
    const reducer = (mostLikes,author) =>{
        if(author[1]>mostLikes[1]){
            return author
        }
        return mostLikes
    }

    const dataMostLikes = Object.entries(likesPerAuthor).reduce(reducer,Object.entries(likesPerAuthor)[0])

    return blogs.length ===0?
        0: {author:dataMostLikes[0],likes:dataMostLikes[1]}
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}