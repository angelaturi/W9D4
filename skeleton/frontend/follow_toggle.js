const APIUtil = require("./api_util");

class FollowToggle {
    constructor(el) {
        this.$el = $(el);
        this.userId = this.$el.data('user-id');
        this.followState = this.$el.data('initial-follow-state');

        this.render();
        this.$el.on('click', this.handleClick.bind(this));
    }

    render() {
        let state = this.followState === "unfollowed" ? "Follow" : "Unfollow!"
        if (this.followState === "unfollowed" || this.followState === "followed"){
            this.$el.prop("disabled", false);
        } else {
            this.$el.prop("disabled", true);
        }
        this.$el.html(state)
    }

    handleClick(event) {
        event.preventDefault();
        if (this.followState === "unfollowed") {
            APIUtil.followUser(this.userId)
                .then(() => {
                    this.followState = "followed";
                    this.render();
                })
        } else {
            APIUtil.unfollowUser(this.userId)
                .then(() => {
                    this.followState = "unfollowed";
                    this.render();
                })
        }
    }
}

module.exports = FollowToggle;