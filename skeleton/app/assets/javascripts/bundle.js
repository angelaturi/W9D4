/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

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

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search */ "./frontend/users_search.js");

$(function() {
    $('button.follow-toggle').each((index, button) => new FollowToggle(button));

    $('.users-search').each((index, ul) => new UsersSearch(ul));
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map