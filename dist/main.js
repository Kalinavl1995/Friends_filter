/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _module_friendsFilter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/friendsFilter.js */ \"./src/js/module/friendsFilter.js\");\n\n\nnew _module_friendsFilter_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n  document.querySelector('.list.all-friends'),\n  document.querySelector('.list.best-friends')\n);\n\n\n//# sourceURL=webpack://vk_api/./src/js/index.js?");

/***/ }),

/***/ "./src/js/module/friendsFilter.js":
/*!****************************************!*\
  !*** ./src/js/module/friendsFilter.js ***!
  \****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ FriendsFilter; }\n/* harmony export */ });\n/* harmony import */ var _vkAPI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vkAPI.js */ \"./src/js/module/vkAPI.js\");\n/* harmony import */ var _friendsList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./friendsList.js */ \"./src/js/module/friendsList.js\");\n/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage.js */ \"./src/js/module/storage.js\");\n\n\n\n\nclass FriendsFilter {\n  constructor() {\n    this.lsKey = 'LS_FRIENDS_FILTER';\n    this.allFriendsDOMFilter = document.querySelector(\n      '[data-role=filter-input][data-list=all]'\n    );\n    this.allFriendsDOMList = document.querySelector(\n      '[data-role=list-items][data-list=all]'\n    );\n    this.bestFriendsDOMFilter = document.querySelector(\n      '[data-role=filter-input][data-list=best]'\n    );\n    this.bestFriendsDOMList = document.querySelector(\n      '[data-role=list-items][data-list=best]'\n    );\n\n    this.api = new _vkAPI_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](51468164, 2);\n    this.allFriends = new _friendsList_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](new _storage_js__WEBPACK_IMPORTED_MODULE_2__.VKStorage(this.api));\n    this.bestFriends = new _friendsList_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](new _storage_js__WEBPACK_IMPORTED_MODULE_2__.LocalStorage(this.api, this.lsKey));\n\n    this.init();\n  }\n\n  async init() {\n    await this.api.init();\n    await this.api.login();\n    await this.allFriends.load();\n    await this.bestFriends.load();\n\n    for (const item of this.bestFriends.valuesIterable()) {\n      await this.allFriends.delete(item.id);\n    }\n\n    this.reloadList(this.allFriendsDOMList, this.allFriends);\n    this.reloadList(this.bestFriendsDOMList, this.bestFriends);\n\n    document.addEventListener('mousedown', this.onMouseDown.bind(this));\n    document.addEventListener('mousemove', this.onMouseMove.bind(this));\n    document.addEventListener('mouseup', this.onMouseUp.bind(this));\n    document.addEventListener('click', this.onClick.bind(this));\n\n    this.allFriendsDOMFilter.addEventListener('input', (e) => {\n      this.allFriendsFilter = e.target.value;\n      this.reloadList(this.allFriendsDOMList, this.allFriends, this.allFriendsFilter);\n    });\n    this.bestFriendsDOMFilter.addEventListener('input', (e) => {\n      this.bestFriendsFilter = e.target.value;\n      this.reloadList(this.bestFriendsDOMList, this.bestFriends, this.bestFriendsFilter);\n    });\n  }\n\n  isMatchingFilter(source, filter) {\n    return source.toLowerCase().includes(filter.toLowerCase());\n  }\n\n  reloadList(listDOM, friendsList, filter) {\n    const fragment = document.createDocumentFragment();\n\n    listDOM.innerHTML = '';\n\n    for (const friend of friendsList.valuesIterable()) {\n      const fullName = `${friend.first_name} ${friend.last_name}`;\n\n      if (!filter || this.isMatchingFilter(fullName, filter)) {\n        const friendDOM = this.createFriendDOM(friend);\n        fragment.append(friendDOM);\n      }\n    }\n\n    listDOM.append(fragment);\n  }\n\n  createFriendDOM(data) {\n    const root = document.createElement('div');\n\n    root.dataset.role = 'list-item';\n    root.dataset.friendId = data.id;\n    root.classList.add('list-item');\n    root.innerHTML = `\n    <img class=\"list-item-photo\" src=\"${data.photo_50}\"/>\n    <div class=\"list-item-name\">${data.first_name} ${data.last_name}</div>\n    <div class=\"list-item-swap\" data-role=\"list-item-swap\" data-friend-id=\"${data.id}\"></div>\n    `;\n\n    return root;\n  }\n\n  move(friendId, from, to) {\n    if (from === 'all' && to === 'best') {\n      const friend = this.allFriends.delete(friendId);\n      this.bestFriends.add(friend);\n    } else if (from === 'best' && to === 'all') {\n      const friend = this.bestFriends.delete(friendId);\n      this.allFriends.add(friend);\n    }\n\n    this.bestFriends.save();\n    this.reloadList(this.allFriendsDOMList, this.allFriends, this.allFriendsFilter);\n    this.reloadList(this.bestFriendsDOMList, this.bestFriends, this.bestFriendsFilter);\n  }\n\n  onMouseDown(e) {\n    const sourceItem = e.target.closest('[data-role=list-item]');\n\n    if (!sourceItem) {\n      return;\n    }\n\n    const friendId = sourceItem.dataset.friendId;\n    const sourceList = e.target.closest('[data-role=list-items]').dataset.list;\n\n    this.dragging = {\n      offsetX: e.offsetX,\n      offsetY: e.offsetY,\n      sourceItem,\n      friendId,\n      sourceList,\n      pending: true,\n    };\n  }\n\n  onMouseMove(e) {\n    if (!this.dragging) {\n      return;\n    }\n\n    e.preventDefault();\n\n    if (this.dragging.pending) {\n      const rect = this.dragging.sourceItem.getBoundingClientRect();\n      const clone = this.dragging.sourceItem.cloneNode(true);\n      clone.classList.add('list-item-clone');\n      clone.style.width = `${rect.width}px`;\n      clone.style.height = `${rect.height}px`;\n      document.body.append(clone);\n      this.dragging.pending = false;\n      this.dragging.clone = clone;\n    }\n\n    this.dragging.clone.style.left = `${e.clientX - this.dragging.offsetX}px`;\n    this.dragging.clone.style.top = `${e.clientY - this.dragging.offsetY}px`;\n  }\n\n  onMouseUp(e) {\n    if (!this.dragging || this.dragging.pending) {\n      this.dragging = null;\n      return;\n    }\n\n    const targetList = e.target.closest('[data-role=list-items]');\n\n    if (targetList) {\n      const moveTo = targetList.dataset.list;\n      this.move(this.dragging.friendId, this.dragging.sourceList, moveTo);\n    }\n\n    this.dragging.clone.remove();\n    this.dragging = null;\n  }\n\n  onClick(e) {\n    if (e.target.dataset.role === 'list-item-swap') {\n      const sourceList = e.target.closest('[data-role=list-items]').dataset.list;\n      const friendId = e.target.dataset.friendId;\n\n      this.move(friendId, sourceList, sourceList === 'all' ? 'best' : 'all');\n    }\n  }\n}\n\n\n//# sourceURL=webpack://vk_api/./src/js/module/friendsFilter.js?");

/***/ }),

/***/ "./src/js/module/friendsList.js":
/*!**************************************!*\
  !*** ./src/js/module/friendsList.js ***!
  \**************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ FriendsList; }\n/* harmony export */ });\nclass FriendsList {\n  constructor(storage) {\n    this.storage = storage;\n    this.data = new Map();\n  }\n\n  async load() {\n    this.data.clear();\n    const list = await this.storage.load();\n\n    for (const item of list) {\n      this.add(item);\n    }\n  }\n\n  save() {\n    this.storage.save([...this.data.values()]);\n  }\n\n  add(friend) {\n    if (!this.data.has(friend.id)) {\n      this.data.set(friend.id, friend);\n    }\n  }\n\n  delete(friendId) {\n    friendId = Number(friendId);\n    const friend = this.data.get(friendId);\n\n    if (friend) {\n      this.data.delete(friendId);\n    }\n\n    return friend;\n  }\n\n  valuesIterable() {\n    return this.data.values();\n  }\n}\n\n\n//# sourceURL=webpack://vk_api/./src/js/module/friendsList.js?");

/***/ }),

/***/ "./src/js/module/storage.js":
/*!**********************************!*\
  !*** ./src/js/module/storage.js ***!
  \**********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"LocalStorage\": function() { return /* binding */ LocalStorage; },\n/* harmony export */   \"VKStorage\": function() { return /* binding */ VKStorage; }\n/* harmony export */ });\nclass LocalStorage {\n  constructor(api, key) {\n    this.api = api;\n    this.key = key;\n  }\n\n  async load() {\n    const friendsIds = JSON.parse(localStorage.getItem(this.key) || '[]');\n    return await this.api.getUsers(friendsIds);\n  }\n\n  save(data) {\n    localStorage.setItem(this.key, JSON.stringify(data.map((item) => item.id)));\n  }\n}\n\nclass VKStorage {\n  constructor(api) {\n    this.api = api;\n  }\n\n  async load() {\n    const response = await this.api.getFriends();\n    return response.items;\n  }\n\n  save() {\n    throw new Error('not supported');\n  }\n}\n\n\n//# sourceURL=webpack://vk_api/./src/js/module/storage.js?");

/***/ }),

/***/ "./src/js/module/vkAPI.js":
/*!********************************!*\
  !*** ./src/js/module/vkAPI.js ***!
  \********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ VKAPI; }\n/* harmony export */ });\n/* global VK */\n\nclass VKAPI {\n  constructor(appId, perms) {\n    this.appId = appId;\n    this.perms = perms;\n  }\n\n  init() {\n    return new Promise((resolve) => {\n      const script = document.createElement('script');\n      script.src = \"https://vk.com/js/api/openapi.js?169\";\n      script.type = \"text/javascript\";\n      document.body.appendChild(script);\n      script.addEventListener('load', resolve);\n    });\n  }\n\n  login() {\n    return new Promise((resolve, reject) => {\n      VK.init({\n        apiId: this.appId,\n      });\n\n      VK.Auth.login((response) => {\n        if (response.session) {\n          resolve(response);\n        } else {\n          reject(new Error('Не удалось авторизоваться'));\n        }\n      }, this.perms);\n    });\n  }\n\n  callApi(method, params) {\n    params.v = params.v || '5.131';\n\n    return new Promise((resolve, reject) => {\n      VK.api(method, params, (response) => {\n        if (response.error) {\n          reject(new Error(response.error.error_msg));\n        } else {\n          resolve(response.response);\n        }\n      });\n    });\n  }\n\n  getFriends() {\n    const params = {\n      fields: ['photo_50'],\n    };\n\n    return this.callApi('friends.get', params);\n  }\n\n  getUsers(ids) {\n    const params = {\n      fields: ['photo_50'],\n      user_ids: ids,\n    };\n\n    return this.callApi('users.get', params);\n  }\n}\n\n\n//# sourceURL=webpack://vk_api/./src/js/module/vkAPI.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;