const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('dummy',()=>{
  test('dummy returns one', () => {
  
    const result = listHelper.dummy(helper.blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {

  test('total likes for many blogs', () => {
    const result = listHelper.totalLikes(helper.blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog',()=>{
  test('favorite blog',()=>{
    const result = listHelper.favoriteBlog(helper.blogs)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })
})

describe('most blogs',()=>{
  test('most blogs',()=>{
    const result = listHelper.mostBlogs(helper.blogs)
    expect(result).toEqual({
        author: "Robert C. Martin",
        blogs: 3
    })
  })
})

describe('most likes',()=>{
  test('most likes',()=>{
    const result = listHelper.mostLikes(helper.blogs)
    expect(result).toEqual({
        author: "Edsger W. Dijkstra",
        likes: 17
    })
  })
})