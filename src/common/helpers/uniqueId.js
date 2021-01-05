const uniqueIdBlogThumb = () => {
    return Date.now()
}

const uniqueIdProfilePic = (id) => {
    const uniqueId = id + Date.now()
    return uniqueId
}

module.exports = {
    uniqueIdBlogThumb,
    uniqueIdProfilePic
}
