const APIUtil = {
    followUser: id => {
        return $.ajax({
            method: "Post",
            url: `/users/${id}/follow`,
            dataType: 'JSON'
        })
    },

    unfollowUser: id => {
        return $.ajax({
            method: "Delete",
            url: `/users/${id}/follow`,
            dataType: 'JSON'
        })
    },

    searchUsers: queryVal => {
        return $.ajax({
            method: "Get",
            url: `/users/search`,
            dataType: 'JSON',
            data: {queryVal: queryVal}

        })
    },

    createTweet: data => {
        return $.ajax({
            method: "Get",
            url: '/tweets',
            dataType: 'json'
        })
    }
}

module.exports = APIUtil;