const APIUtil = require("./api_util");

class TweetCompose {
    constructor(el) {
        this.$el = $(el);

        this.$el.on('submit', this.submit.bind(this));
    }

    clearInput() {
        this.input
    }

    submit(event) {
        event.preventDefault();
        const data = this.$el.serializeJSON();

        this.$el.find(':input').prop('disabled', true;

        APIUtil.createTweet(data).then(tweet => this.handleSuccess(tweet));
    }
}

module.exports = TweetCompose;