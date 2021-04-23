const APIUtil = require("./api_util");

class UsersSearch {
    constructor(el){
        this.$el = $(el);
        console.log(this.$el);
        this.$ul = this.$el.data(".users");
        this.$input = this.$el.find("input[username]");
        if (!input === undefined){
            this.$input.on('input', this.handleInput.bind(this, this.$input))
        }
    }

    handleInput(input){
        let result = APIUtil.searchUsers(input);
        this.renderResults(result);
    }

    renderResults(users) {
        this.$ul.empty();
        for(let i = 0; i < users.length; i++) {
            let user = users[i];
            let $a = $("<a>");
            let $li = $("<li>");
            $a.text(`@${user.username}`);
            $a.attr('href', `/users/${user.id}`);
            $li.append($a);
            this.$ul.append($li);
        }
    }

}

module.exports = UsersSearch;