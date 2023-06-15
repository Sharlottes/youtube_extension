/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************************!*\
  !*** ./src/content_scripts/preview_thumbnail.ts ***!
  \**************************************************/
//@ts-check
/**
 * async delay
 * @param {number} ms delay in miliseconds
 * @returns Promise
 */ function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return(g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g);
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var delay = function(ms) {
    return new Promise(function(res) {
        return setTimeout(res, ms);
    });
};
/**
 * retry N times
 * @param {() => Promise<void>} callback throwable async callback function
 * @param {number} ms interval delay in miliseconds
 * @param {number} [max_try=10] maximize try count, default 10
 * @returns Promise<void>
 */ var retryInterval = function() {
    var _ref = _async_to_generator(function(callback, ms) {
        var max_try, i, e;
        var _arguments = arguments;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    max_try = _arguments.length > 2 && _arguments[2] !== void 0 ? _arguments[2] : 10;
                    i = 0;
                    _state.label = 1;
                case 1:
                    if (!(i < max_try)) return [
                        3,
                        7
                    ];
                    _state.label = 2;
                case 2:
                    _state.trys.push([
                        2,
                        4,
                        ,
                        6
                    ]);
                    return [
                        4,
                        callback()
                    ];
                case 3:
                    _state.sent();
                    return [
                        2
                    ];
                case 4:
                    e = _state.sent();
                    console.error(e);
                    return [
                        4,
                        delay(ms)
                    ];
                case 5:
                    _state.sent();
                    return [
                        3,
                        6
                    ];
                case 6:
                    i++;
                    return [
                        3,
                        1
                    ];
                case 7:
                    console.error("interval try timeout!");
                    return [
                        2
                    ];
            }
        });
    });
    return function retryInterval(callback, ms) {
        return _ref.apply(this, arguments);
    };
}();
function createPreviewCheckbox() {
    /**
   * @type HTMLButtonElement & { checked?: boolean }
   */ var copiedCheckbox = document.createElement("button");
    copiedCheckbox.innerText = "See Thumbnail";
    return copiedCheckbox;
}
function createThumbnailImg() {
    var update = function update() {
        var opened = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        var videoId = document.URL.replace(/.*\?v=(.*)/g, "$1").split("&")[0];
        var thumbnailUrl = "https://i.ytimg.com/vi/".concat(videoId, "/hqdefault.jpg");
        thumbnailImg.setAttribute("src", thumbnailUrl);
        //@ts-ignore
        thumbnailImg.style = "position:absolute;bottom:0;".concat(opened ? "display:block" : "display:none");
    };
    var thumbnailImg = document.createElement("img");
    /**
   * @type HTMLImageElement & { update: (opened: boolean) => void}
   */ var updatefulThumbnailImg = Object.assign(thumbnailImg, {
        update: update
    });
    return updatefulThumbnailImg;
}
retryInterval(/*#__PURE__*/ _async_to_generator(function() {
    var ownerContainer, justAButton, playerContainer, thumbnailImg, checkbox;
    return _ts_generator(this, function(_state) {
        ownerContainer = document.getElementById("owner");
        if (!ownerContainer) throw new Error("failed to get owner element");
        justAButton = ownerContainer.getElementsByTagName("button")[0];
        if (!justAButton) throw new Error("failed to get button in owner element");
        playerContainer = document.querySelector("#ytd-player > #container");
        if (!playerContainer) throw new Error("failed to get button in owner element");
        thumbnailImg = createThumbnailImg();
        playerContainer.appendChild(thumbnailImg);
        checkbox = createPreviewCheckbox();
        //@ts-ignore
        checkbox.style = "margin-left:8px";
        checkbox.className = justAButton.className.replace(/tonal|filled/, "outline");
        checkbox.addEventListener("click", function() {
            checkbox.checked = !checkbox.checked;
            checkbox.className = checkbox.className.replace(/outline|tonal/, checkbox.checked ? "tonal" : "outline");
            thumbnailImg.update(checkbox.checked);
        });
        //@ts-ignore
        ownerContainer.style += ";display:flex;";
        ownerContainer.appendChild(checkbox);
        return [
            2
        ];
    });
}), 1000);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGVudF9zY3JpcHRzL3ByZXZpZXdfdGh1bWJuYWlsLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsV0FBVztBQUVYOzs7O0NBSUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCxJQUFNQSxRQUFRLFNBQUNDO1dBQU8sSUFBSUMsUUFBUSxTQUFDQztlQUFRQyxXQUFXRCxLQUFLRjs7O0FBRTNEOzs7Ozs7Q0FNQyxHQUNELElBQU1JO2VBQWdCLDZCQUFPQyxVQUFVTDtZQUFJTSxTQUNoQ0MsR0FJRUM7Ozs7O29CQUw4QkYsOEVBQVU7b0JBQzFDQyxJQUFJOzs7eUJBQUdBLENBQUFBLElBQUlELE9BQU07Ozs7Ozs7Ozs7OztvQkFFdEI7O3dCQUFNRDs7O29CQUFOO29CQUNBOzs7O29CQUNPRztvQkFDUEMsUUFBUUMsS0FBSyxDQUFDRjtvQkFDZDs7d0JBQU1ULE1BQU1DOzs7b0JBQVo7Ozs7OztvQkFOeUJPOzs7Ozs7b0JBUzdCRSxRQUFRQyxLQUFLLENBQUM7Ozs7OztJQUNoQjtvQkFYTU4sY0FBdUJDLFVBQVVMOzs7O0FBYXZDLFNBQVNXO0lBQ1A7O0dBRUMsR0FDRCxJQUFNQyxpQkFBaUJDLFNBQVNDLGFBQWEsQ0FBQztJQUM5Q0YsZUFBZUcsU0FBUyxHQUFHO0lBQzNCLE9BQU9IO0FBQ1Q7QUFFQSxTQUFTSTtRQUVFQyxTQUFULFNBQVNBO1lBQU9DLFNBQUFBLGlFQUFTO1FBQ3ZCLElBQU1DLFVBQVVOLFNBQVNPLEdBQUcsQ0FBQ0MsT0FBTyxDQUFDLGVBQWUsTUFBTUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3ZFLElBQU1DLGVBQWUsMEJBQWtDLE9BQVJKLFNBQVE7UUFDdkRLLGFBQWFDLFlBQVksQ0FBQyxPQUFPRjtRQUNqQyxZQUFZO1FBQ1pDLGFBQWFFLEtBQUssR0FBRyw4QkFFcEIsT0FEQ1IsU0FBUyxrQkFBa0I7SUFFL0I7SUFUQSxJQUFNTSxlQUFlWCxTQUFTQyxhQUFhLENBQUM7SUFXNUM7O0dBRUMsR0FDRCxJQUFNYSx3QkFBd0JDLE9BQU9DLE1BQU0sQ0FBQ0wsY0FBYztRQUFFUCxRQUFBQTtJQUFPO0lBQ25FLE9BQU9VO0FBQ1Q7QUFFQXZCLDRCQUFjO1FBQ04wQixnQkFFQUMsYUFFQUMsaUJBSUFSLGNBR0FTOztRQVhBSCxpQkFBaUJqQixTQUFTcUIsY0FBYyxDQUFDO1FBQy9DLElBQUksQ0FBQ0osZ0JBQWdCLE1BQU0sSUFBSUssTUFBTTtRQUMvQkosY0FBY0QsZUFBZU0sb0JBQW9CLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDcEUsSUFBSSxDQUFDTCxhQUFhLE1BQU0sSUFBSUksTUFBTTtRQUM1Qkgsa0JBQWtCbkIsU0FBU3dCLGFBQWEsQ0FBQztRQUMvQyxJQUFJLENBQUNMLGlCQUNILE1BQU0sSUFBSUcsTUFBTTtRQUVaWCxlQUFlUjtRQUNyQmdCLGdCQUFnQk0sV0FBVyxDQUFDZDtRQUV0QlMsV0FBV3RCO1FBQ2pCLFlBQVk7UUFDWnNCLFNBQVNQLEtBQUssR0FBRztRQUNqQk8sU0FBU00sU0FBUyxHQUFHUixZQUFZUSxTQUFTLENBQUNsQixPQUFPLENBQUMsZ0JBQWdCO1FBQ25FWSxTQUFTTyxnQkFBZ0IsQ0FBQyxTQUFTO1lBQ2pDUCxTQUFTUSxPQUFPLEdBQUcsQ0FBQ1IsU0FBU1EsT0FBTztZQUNwQ1IsU0FBU00sU0FBUyxHQUFHTixTQUFTTSxTQUFTLENBQUNsQixPQUFPLENBQzdDLGlCQUNBWSxTQUFTUSxPQUFPLEdBQUcsVUFBVTtZQUUvQmpCLGFBQWFQLE1BQU0sQ0FBQ2dCLFNBQVNRLE9BQU87UUFDdEM7UUFDQSxZQUFZO1FBQ1pYLGVBQWVKLEtBQUssSUFBSTtRQUN4QkksZUFBZVEsV0FBVyxDQUFDTDs7Ozs7QUFDN0IsSUFBRyIsInNvdXJjZXMiOlsid2VicGFjazovL3lvdXR1YmVfZXh0ZW5zaW9ucy8uL3NyYy9jb250ZW50X3NjcmlwdHMvcHJldmlld190aHVtYm5haWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9AdHMtY2hlY2tcclxuXHJcbi8qKlxyXG4gKiBhc3luYyBkZWxheVxyXG4gKiBAcGFyYW0ge251bWJlcn0gbXMgZGVsYXkgaW4gbWlsaXNlY29uZHNcclxuICogQHJldHVybnMgUHJvbWlzZVxyXG4gKi9cclxuY29uc3QgZGVsYXkgPSAobXMpID0+IG5ldyBQcm9taXNlKChyZXMpID0+IHNldFRpbWVvdXQocmVzLCBtcykpO1xyXG5cclxuLyoqXHJcbiAqIHJldHJ5IE4gdGltZXNcclxuICogQHBhcmFtIHsoKSA9PiBQcm9taXNlPHZvaWQ+fSBjYWxsYmFjayB0aHJvd2FibGUgYXN5bmMgY2FsbGJhY2sgZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IG1zIGludGVydmFsIGRlbGF5IGluIG1pbGlzZWNvbmRzXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbWF4X3RyeT0xMF0gbWF4aW1pemUgdHJ5IGNvdW50LCBkZWZhdWx0IDEwXHJcbiAqIEByZXR1cm5zIFByb21pc2U8dm9pZD5cclxuICovXHJcbmNvbnN0IHJldHJ5SW50ZXJ2YWwgPSBhc3luYyAoY2FsbGJhY2ssIG1zLCBtYXhfdHJ5ID0gMTApID0+IHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IG1heF90cnk7IGkrKykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgY2FsbGJhY2soKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICBhd2FpdCBkZWxheShtcyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbnNvbGUuZXJyb3IoXCJpbnRlcnZhbCB0cnkgdGltZW91dCFcIik7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQcmV2aWV3Q2hlY2tib3goKSB7XHJcbiAgLyoqXHJcbiAgICogQHR5cGUgSFRNTEJ1dHRvbkVsZW1lbnQgJiB7IGNoZWNrZWQ/OiBib29sZWFuIH1cclxuICAgKi9cclxuICBjb25zdCBjb3BpZWRDaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgY29waWVkQ2hlY2tib3guaW5uZXJUZXh0ID0gXCJTZWUgVGh1bWJuYWlsXCI7XHJcbiAgcmV0dXJuIGNvcGllZENoZWNrYm94O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUaHVtYm5haWxJbWcoKSB7XHJcbiAgY29uc3QgdGh1bWJuYWlsSW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICBmdW5jdGlvbiB1cGRhdGUob3BlbmVkID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IHZpZGVvSWQgPSBkb2N1bWVudC5VUkwucmVwbGFjZSgvLipcXD92PSguKikvZywgXCIkMVwiKS5zcGxpdChcIiZcIilbMF07XHJcbiAgICBjb25zdCB0aHVtYm5haWxVcmwgPSBgaHR0cHM6Ly9pLnl0aW1nLmNvbS92aS8ke3ZpZGVvSWR9L2hxZGVmYXVsdC5qcGdgO1xyXG4gICAgdGh1bWJuYWlsSW1nLnNldEF0dHJpYnV0ZShcInNyY1wiLCB0aHVtYm5haWxVcmwpO1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICB0aHVtYm5haWxJbWcuc3R5bGUgPSBgcG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7JHtcclxuICAgICAgb3BlbmVkID8gXCJkaXNwbGF5OmJsb2NrXCIgOiBcImRpc3BsYXk6bm9uZVwiXHJcbiAgICB9YDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEB0eXBlIEhUTUxJbWFnZUVsZW1lbnQgJiB7IHVwZGF0ZTogKG9wZW5lZDogYm9vbGVhbikgPT4gdm9pZH1cclxuICAgKi9cclxuICBjb25zdCB1cGRhdGVmdWxUaHVtYm5haWxJbWcgPSBPYmplY3QuYXNzaWduKHRodW1ibmFpbEltZywgeyB1cGRhdGUgfSk7XHJcbiAgcmV0dXJuIHVwZGF0ZWZ1bFRodW1ibmFpbEltZztcclxufVxyXG5cclxucmV0cnlJbnRlcnZhbChhc3luYyAoKSA9PiB7XHJcbiAgY29uc3Qgb3duZXJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm93bmVyXCIpO1xyXG4gIGlmICghb3duZXJDb250YWluZXIpIHRocm93IG5ldyBFcnJvcihcImZhaWxlZCB0byBnZXQgb3duZXIgZWxlbWVudFwiKTtcclxuICBjb25zdCBqdXN0QUJ1dHRvbiA9IG93bmVyQ29udGFpbmVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYnV0dG9uXCIpWzBdO1xyXG4gIGlmICghanVzdEFCdXR0b24pIHRocm93IG5ldyBFcnJvcihcImZhaWxlZCB0byBnZXQgYnV0dG9uIGluIG93bmVyIGVsZW1lbnRcIik7XHJcbiAgY29uc3QgcGxheWVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN5dGQtcGxheWVyID4gI2NvbnRhaW5lclwiKTtcclxuICBpZiAoIXBsYXllckNvbnRhaW5lcilcclxuICAgIHRocm93IG5ldyBFcnJvcihcImZhaWxlZCB0byBnZXQgYnV0dG9uIGluIG93bmVyIGVsZW1lbnRcIik7XHJcblxyXG4gIGNvbnN0IHRodW1ibmFpbEltZyA9IGNyZWF0ZVRodW1ibmFpbEltZygpO1xyXG4gIHBsYXllckNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aHVtYm5haWxJbWcpO1xyXG5cclxuICBjb25zdCBjaGVja2JveCA9IGNyZWF0ZVByZXZpZXdDaGVja2JveCgpO1xyXG4gIC8vQHRzLWlnbm9yZVxyXG4gIGNoZWNrYm94LnN0eWxlID0gXCJtYXJnaW4tbGVmdDo4cHhcIjtcclxuICBjaGVja2JveC5jbGFzc05hbWUgPSBqdXN0QUJ1dHRvbi5jbGFzc05hbWUucmVwbGFjZSgvdG9uYWx8ZmlsbGVkLywgXCJvdXRsaW5lXCIpO1xyXG4gIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBjaGVja2JveC5jaGVja2VkID0gIWNoZWNrYm94LmNoZWNrZWQ7XHJcbiAgICBjaGVja2JveC5jbGFzc05hbWUgPSBjaGVja2JveC5jbGFzc05hbWUucmVwbGFjZShcclxuICAgICAgL291dGxpbmV8dG9uYWwvLFxyXG4gICAgICBjaGVja2JveC5jaGVja2VkID8gXCJ0b25hbFwiIDogXCJvdXRsaW5lXCJcclxuICAgICk7XHJcbiAgICB0aHVtYm5haWxJbWcudXBkYXRlKGNoZWNrYm94LmNoZWNrZWQpO1xyXG4gIH0pO1xyXG4gIC8vQHRzLWlnbm9yZVxyXG4gIG93bmVyQ29udGFpbmVyLnN0eWxlICs9IFwiO2Rpc3BsYXk6ZmxleDtcIjtcclxuICBvd25lckNvbnRhaW5lci5hcHBlbmRDaGlsZChjaGVja2JveCk7XHJcbn0sIDEwMDApO1xyXG4iXSwibmFtZXMiOlsiZGVsYXkiLCJtcyIsIlByb21pc2UiLCJyZXMiLCJzZXRUaW1lb3V0IiwicmV0cnlJbnRlcnZhbCIsImNhbGxiYWNrIiwibWF4X3RyeSIsImkiLCJlIiwiY29uc29sZSIsImVycm9yIiwiY3JlYXRlUHJldmlld0NoZWNrYm94IiwiY29waWVkQ2hlY2tib3giLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lclRleHQiLCJjcmVhdGVUaHVtYm5haWxJbWciLCJ1cGRhdGUiLCJvcGVuZWQiLCJ2aWRlb0lkIiwiVVJMIiwicmVwbGFjZSIsInNwbGl0IiwidGh1bWJuYWlsVXJsIiwidGh1bWJuYWlsSW1nIiwic2V0QXR0cmlidXRlIiwic3R5bGUiLCJ1cGRhdGVmdWxUaHVtYm5haWxJbWciLCJPYmplY3QiLCJhc3NpZ24iLCJvd25lckNvbnRhaW5lciIsImp1c3RBQnV0dG9uIiwicGxheWVyQ29udGFpbmVyIiwiY2hlY2tib3giLCJnZXRFbGVtZW50QnlJZCIsIkVycm9yIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJxdWVyeVNlbGVjdG9yIiwiYXBwZW5kQ2hpbGQiLCJjbGFzc05hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwiY2hlY2tlZCJdLCJzb3VyY2VSb290IjoiIn0=