function __swcpack_require__(mod) {
    function interop(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};
            if (obj != null) {
                for(var key in obj){
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                        if (desc.get || desc.set) {
                            Object.defineProperty(newObj, key, desc);
                        } else {
                            newObj[key] = obj[key];
                        }
                    }
                }
            }
            newObj.default = obj;
            return newObj;
        }
    }
    var cache;
    if (cache) {
        return cache;
    }
    var module = {
        exports: {}
    };
    mod(module, module.exports);
    cache = interop(module.exports);
    return cache;
}
var load = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    function Vnode(tag, key, attrs, children, text, dom) {
        return {
            tag: tag,
            key: key,
            attrs: attrs,
            children: children,
            text: text,
            dom: dom,
            domSize: undefined,
            state: undefined,
            events: undefined,
            instance: undefined
        };
    }
    Vnode.normalize = function(node) {
        if (Array.isArray(node)) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined);
        if (node == null || typeof node === "boolean") return null;
        if (typeof node === "object") return node;
        return Vnode("#", undefined, undefined, String(node), undefined, undefined);
    };
    Vnode.normalizeChildren = function(input) {
        var children = [];
        if (input.length) {
            var isKeyed = input[0] != null && input[0].key != null;
            for(var i = 1; i < input.length; i++){
                if ((input[i] != null && input[i].key != null) !== isKeyed) throw new TypeError("Vnodes must either always have keys or never have keys!");
            }
            for(var i = 0; i < input.length; i++)children[i] = Vnode.normalize(input[i]);
        }
        return children;
    };
    module.exports = Vnode;
});
var load1 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    var Vnode = load();
    module.exports = function() {
        var attrs = arguments[this], start = this + 1, children;
        if (attrs == null) attrs = {};
        else if (typeof attrs !== "object" || attrs.tag != null || Array.isArray(attrs)) {
            attrs = {};
            start = this;
        }
        if (arguments.length === start + 1) {
            children = arguments[start];
            if (!Array.isArray(children)) children = [
                children
            ];
        } else {
            children = [];
            while(start < arguments.length)children.push(arguments[start++]);
        }
        return Vnode("", attrs.key, attrs, children);
    };
});
var load2 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    var Vnode = load();
    var hyperscriptVnode = load1();
    var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g;
    var selectorCache = {};
    var hasOwn = {}.hasOwnProperty;
    function isEmpty(object) {
        for(var key in object)if (hasOwn.call(object, key)) return false;
        return true;
    }
    function compileSelector(selector) {
        var match, tag = "div", classes = [], attrs = {};
        while(match = selectorParser.exec(selector)){
            var type = match[1], value = match[2];
            if (type === "" && value !== "") tag = value;
            else if (type === "#") attrs.id = value;
            else if (type === ".") classes.push(value);
            else if (match[3][0] === "[") {
                var attrValue = match[6];
                if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\");
                if (match[4] === "class") classes.push(attrValue);
                else attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true;
            }
        }
        if (classes.length > 0) attrs.className = classes.join(" ");
        return selectorCache[selector] = {
            tag: tag,
            attrs: attrs
        };
    }
    function execSelector(state, vnode) {
        var attrs = vnode.attrs;
        var children = Vnode.normalizeChildren(vnode.children);
        var hasClass = hasOwn.call(attrs, "class");
        var className = hasClass ? attrs.class : attrs.className;
        vnode.tag = state.tag;
        vnode.attrs = null;
        vnode.children = undefined;
        if (!isEmpty(state.attrs) && !isEmpty(attrs)) {
            var newAttrs = {};
            for(var key in attrs)if (hasOwn.call(attrs, key)) newAttrs[key] = attrs[key];
            attrs = newAttrs;
        }
        for(var key in state.attrs)if (hasOwn.call(state.attrs, key) && key !== "className" && !hasOwn.call(attrs, key)) attrs[key] = state.attrs[key];
        if (className != null || state.attrs.className != null) attrs.className = className != null ? state.attrs.className != null ? String(state.attrs.className) + " " + String(className) : className : state.attrs.className != null ? state.attrs.className : null;
        if (hasClass) attrs.class = null;
        for(var key in attrs)if (hasOwn.call(attrs, key) && key !== "key") {
            vnode.attrs = attrs;
            break;
        }
        if (Array.isArray(children) && children.length === 1 && children[0] != null && children[0].tag === "#") vnode.text = children[0].children;
        else vnode.children = children;
        return vnode;
    }
    function hyperscript(selector) {
        if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") throw Error("The selector must be either a string or a component.");
        var vnode = hyperscriptVnode.apply(1, arguments);
        if (typeof selector === "string") {
            vnode.children = Vnode.normalizeChildren(vnode.children);
            if (selector !== "[") return execSelector(selectorCache[selector] || compileSelector(selector), vnode);
        }
        vnode.tag = selector;
        return vnode;
    }
    module.exports = hyperscript;
});
var load3 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    var Vnode = load();
    module.exports = function(html) {
        if (html == null) html = "";
        return Vnode("<", undefined, undefined, html, undefined, undefined);
    };
});
var load4 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    var Vnode = load();
    var hyperscriptVnode = load1();
    module.exports = function() {
        var vnode = hyperscriptVnode.apply(0, arguments);
        vnode.tag = "[";
        vnode.children = Vnode.normalizeChildren(vnode.children);
        return vnode;
    };
});
var load5 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    var hyperscript = load2();
    hyperscript.trust = load3();
    hyperscript.fragment = load4();
    module.exports = hyperscript;
});
var load6 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    var PromisePolyfill = function(executor) {
        if (!(this instanceof PromisePolyfill)) throw new Error("Promise must be called with `new`");
        if (typeof executor !== "function") throw new TypeError("executor must be a function");
        var self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false);
        var instance = self._instance = {
            resolvers: resolvers,
            rejectors: rejectors
        };
        var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout;
        function handler(list, shouldAbsorb) {
            return function execute(value) {
                var then;
                try {
                    if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
                        if (value === self) throw new TypeError("Promise can't be resolved w/ itself");
                        executeOnce(then.bind(value));
                    } else callAsync(function() {
                        if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value);
                        for(var i = 0; i < list.length; i++)list[i](value);
                        resolvers.length = 0, rejectors.length = 0;
                        instance.state = shouldAbsorb;
                        instance.retry = function() {
                            execute(value);
                        };
                    });
                } catch (e) {
                    rejectCurrent(e);
                }
            };
        }
        function executeOnce(then) {
            var runs = 0;
            function run(fn) {
                return function(value) {
                    if (runs++ > 0) return;
                    fn(value);
                };
            }
            var onerror = run(rejectCurrent);
            try {
                then(run(resolveCurrent), onerror);
            } catch (e) {
                onerror(e);
            }
        }
        executeOnce(executor);
    };
    PromisePolyfill.prototype.then = function(onFulfilled, onRejection) {
        var self = this, instance = self._instance;
        function handle(callback, list, next, state) {
            list.push(function(value) {
                if (typeof callback !== "function") next(value);
                else try {
                    resolveNext(callback(value));
                } catch (e) {
                    if (rejectNext) rejectNext(e);
                }
            });
            if (typeof instance.retry === "function" && state === instance.state) instance.retry();
        }
        var resolveNext, rejectNext;
        var promise = new PromisePolyfill(function(resolve, reject) {
            resolveNext = resolve, rejectNext = reject;
        });
        handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false);
        return promise;
    };
    PromisePolyfill.prototype.catch = function(onRejection) {
        return this.then(null, onRejection);
    };
    PromisePolyfill.prototype.finally = function(callback) {
        return this.then(function(value) {
            return PromisePolyfill.resolve(callback()).then(function() {
                return value;
            });
        }, function(reason) {
            return PromisePolyfill.resolve(callback()).then(function() {
                return PromisePolyfill.reject(reason);
            });
        });
    };
    PromisePolyfill.resolve = function(value) {
        if (value instanceof PromisePolyfill) return value;
        return new PromisePolyfill(function(resolve) {
            resolve(value);
        });
    };
    PromisePolyfill.reject = function(value) {
        return new PromisePolyfill(function(resolve, reject) {
            reject(value);
        });
    };
    PromisePolyfill.all = function(list) {
        return new PromisePolyfill(function(resolve, reject) {
            var total = list.length, count = 0, values = [];
            if (list.length === 0) resolve([]);
            else for(var i1 = 0; i1 < list.length; i1++)(function(i) {
                function consume(value) {
                    count++;
                    values[i] = value;
                    if (count === total) resolve(values);
                }
                if (list[i] != null && (typeof list[i] === "object" || typeof list[i] === "function") && typeof list[i].then === "function") list[i].then(consume, reject);
                else consume(list[i]);
            })(i1);
        });
    };
    PromisePolyfill.race = function(list) {
        return new PromisePolyfill(function(resolve, reject) {
            for(var i = 0; i < list.length; i++)list[i].then(resolve, reject);
        });
    };
    module.exports = PromisePolyfill;
});
var load7 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    var PromisePolyfill = load6();
    if (typeof window !== "undefined") {
        if (typeof window.Promise === "undefined") window.Promise = PromisePolyfill;
        else if (!window.Promise.prototype.finally) window.Promise.prototype.finally = PromisePolyfill.prototype.finally;
        module.exports = window.Promise;
    } else if (typeof global !== "undefined") {
        if (typeof global.Promise === "undefined") global.Promise = PromisePolyfill;
        else if (!global.Promise.prototype.finally) global.Promise.prototype.finally = PromisePolyfill.prototype.finally;
        module.exports = global.Promise;
    } else module.exports = PromisePolyfill;
});
var load8 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    var Vnode = load();
    module.exports = function($window) {
        var $doc = $window && $window.document;
        var currentRedraw;
        var nameSpace = {
            svg: "http://www.w3.org/2000/svg",
            math: "http://www.w3.org/1998/Math/MathML"
        };
        function getNameSpace(vnode) {
            return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag];
        }
        function checkState(vnode, original) {
            if (vnode.state !== original) throw new Error("`vnode.state` must not be modified");
        }
        function callHook(vnode) {
            var original = vnode.state;
            try {
                return this.apply(original, arguments);
            } finally{
                checkState(vnode, original);
            }
        }
        function activeElement() {
            try {
                return $doc.activeElement;
            } catch (e) {
                return null;
            }
        }
        function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
            for(var i = start; i < end; i++){
                var vnode = vnodes[i];
                if (vnode != null) createNode(parent, vnode, hooks, ns, nextSibling);
            }
        }
        function createNode(parent, vnode, hooks, ns, nextSibling) {
            var tag = vnode.tag;
            if (typeof tag === "string") {
                vnode.state = {};
                if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks);
                switch(tag){
                    case "#":
                        createText(parent, vnode, nextSibling);
                        break;
                    case "<":
                        createHTML(parent, vnode, ns, nextSibling);
                        break;
                    case "[":
                        createFragment(parent, vnode, hooks, ns, nextSibling);
                        break;
                    default:
                        createElement(parent, vnode, hooks, ns, nextSibling);
                }
            } else createComponent(parent, vnode, hooks, ns, nextSibling);
        }
        function createText(parent, vnode, nextSibling) {
            vnode.dom = $doc.createTextNode(vnode.children);
            insertNode(parent, vnode.dom, nextSibling);
        }
        var possibleParents = {
            caption: "table",
            thead: "table",
            tbody: "table",
            tfoot: "table",
            tr: "tbody",
            th: "tr",
            td: "tr",
            colgroup: "table",
            col: "colgroup"
        };
        function createHTML(parent, vnode, ns, nextSibling) {
            var match = vnode.children.match(/^\s*?<(\w+)/im) || [];
            var temp = $doc.createElement(possibleParents[match[1]] || "div");
            if (ns === "http://www.w3.org/2000/svg") {
                temp.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + vnode.children + "</svg>";
                temp = temp.firstChild;
            } else temp.innerHTML = vnode.children;
            vnode.dom = temp.firstChild;
            vnode.domSize = temp.childNodes.length;
            vnode.instance = [];
            var fragment = $doc.createDocumentFragment();
            var child;
            while(child = temp.firstChild){
                vnode.instance.push(child);
                fragment.appendChild(child);
            }
            insertNode(parent, fragment, nextSibling);
        }
        function createFragment(parent, vnode, hooks, ns, nextSibling) {
            var fragment = $doc.createDocumentFragment();
            if (vnode.children != null) {
                var children = vnode.children;
                createNodes(fragment, children, 0, children.length, hooks, null, ns);
            }
            vnode.dom = fragment.firstChild;
            vnode.domSize = fragment.childNodes.length;
            insertNode(parent, fragment, nextSibling);
        }
        function createElement(parent, vnode, hooks, ns, nextSibling) {
            var tag = vnode.tag;
            var attrs = vnode.attrs;
            var is = attrs && attrs.is;
            ns = getNameSpace(vnode) || ns;
            var element = ns ? is ? $doc.createElementNS(ns, tag, {
                is: is
            }) : $doc.createElementNS(ns, tag) : is ? $doc.createElement(tag, {
                is: is
            }) : $doc.createElement(tag);
            vnode.dom = element;
            if (attrs != null) setAttrs(vnode, attrs, ns);
            insertNode(parent, element, nextSibling);
            if (!maybeSetContentEditable(vnode)) {
                if (vnode.text != null) {
                    if (vnode.text !== "") element.textContent = vnode.text;
                    else vnode.children = [
                        Vnode("#", undefined, undefined, vnode.text, undefined, undefined)
                    ];
                }
                if (vnode.children != null) {
                    var children = vnode.children;
                    createNodes(element, children, 0, children.length, hooks, null, ns);
                    if (vnode.tag === "select" && attrs != null) setLateSelectAttrs(vnode, attrs);
                }
            }
        }
        function initComponent(vnode, hooks) {
            var sentinel;
            if (typeof vnode.tag.view === "function") {
                vnode.state = Object.create(vnode.tag);
                sentinel = vnode.state.view;
                if (sentinel.$$reentrantLock$$ != null) return;
                sentinel.$$reentrantLock$$ = true;
            } else {
                vnode.state = void 0;
                sentinel = vnode.tag;
                if (sentinel.$$reentrantLock$$ != null) return;
                sentinel.$$reentrantLock$$ = true;
                vnode.state = vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function" ? new vnode.tag(vnode) : vnode.tag(vnode);
            }
            initLifecycle(vnode.state, vnode, hooks);
            if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks);
            vnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode));
            if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument");
            sentinel.$$reentrantLock$$ = null;
        }
        function createComponent(parent, vnode, hooks, ns, nextSibling) {
            initComponent(vnode, hooks);
            if (vnode.instance != null) {
                createNode(parent, vnode.instance, hooks, ns, nextSibling);
                vnode.dom = vnode.instance.dom;
                vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0;
            } else vnode.domSize = 0;
        }
        function updateNodes(parent, old, vnodes, hooks, nextSibling, ns) {
            if (old === vnodes || old == null && vnodes == null) return;
            else if (old == null || old.length === 0) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns);
            else if (vnodes == null || vnodes.length === 0) removeNodes(parent, old, 0, old.length);
            else {
                var isOldKeyed = old[0] != null && old[0].key != null;
                var isKeyed = vnodes[0] != null && vnodes[0].key != null;
                var start = 0, oldStart = 0;
                if (!isOldKeyed) while(oldStart < old.length && old[oldStart] == null)oldStart++;
                if (!isKeyed) while(start < vnodes.length && vnodes[start] == null)start++;
                if (isKeyed === null && isOldKeyed == null) return;
                if (isOldKeyed !== isKeyed) {
                    removeNodes(parent, old, oldStart, old.length);
                    createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns);
                } else if (!isKeyed) {
                    var commonLength = old.length < vnodes.length ? old.length : vnodes.length;
                    start = start < oldStart ? start : oldStart;
                    for(; start < commonLength; start++){
                        o = old[start];
                        v = vnodes[start];
                        if (o === v || o == null && v == null) continue;
                        else if (o == null) createNode(parent, v, hooks, ns, getNextSibling(old, start + 1, nextSibling));
                        else if (v == null) removeNode(parent, o);
                        else updateNode(parent, o, v, hooks, getNextSibling(old, start + 1, nextSibling), ns);
                    }
                    if (old.length > commonLength) removeNodes(parent, old, start, old.length);
                    if (vnodes.length > commonLength) createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns);
                } else {
                    var oldEnd = old.length - 1, end = vnodes.length - 1, map, o, v, oe, ve, topSibling;
                    while(oldEnd >= oldStart && end >= start){
                        oe = old[oldEnd];
                        ve = vnodes[end];
                        if (oe.key !== ve.key) break;
                        if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns);
                        if (ve.dom != null) nextSibling = ve.dom;
                        oldEnd--, end--;
                    }
                    while(oldEnd >= oldStart && end >= start){
                        o = old[oldStart];
                        v = vnodes[start];
                        if (o.key !== v.key) break;
                        oldStart++, start++;
                        if (o !== v) updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), ns);
                    }
                    while(oldEnd >= oldStart && end >= start){
                        if (start === end) break;
                        if (o.key !== ve.key || oe.key !== v.key) break;
                        topSibling = getNextSibling(old, oldStart, nextSibling);
                        moveNodes(parent, oe, topSibling);
                        if (oe !== v) updateNode(parent, oe, v, hooks, topSibling, ns);
                        if (++start <= --end) moveNodes(parent, o, nextSibling);
                        if (o !== ve) updateNode(parent, o, ve, hooks, nextSibling, ns);
                        if (ve.dom != null) nextSibling = ve.dom;
                        oldStart++;
                        oldEnd--;
                        oe = old[oldEnd];
                        ve = vnodes[end];
                        o = old[oldStart];
                        v = vnodes[start];
                    }
                    while(oldEnd >= oldStart && end >= start){
                        if (oe.key !== ve.key) break;
                        if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns);
                        if (ve.dom != null) nextSibling = ve.dom;
                        oldEnd--, end--;
                        oe = old[oldEnd];
                        ve = vnodes[end];
                    }
                    if (start > end) removeNodes(parent, old, oldStart, oldEnd + 1);
                    else if (oldStart > oldEnd) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);
                    else {
                        var originalNextSibling = nextSibling, vnodesLength = end - start + 1, oldIndices = new Array(vnodesLength), li = 0, i = 0, pos = 2147483647, matched = 0, map, lisIndices;
                        for(i = 0; i < vnodesLength; i++)oldIndices[i] = -1;
                        for(i = end; i >= start; i--){
                            if (map == null) map = getKeyMap(old, oldStart, oldEnd + 1);
                            ve = vnodes[i];
                            var oldIndex = map[ve.key];
                            if (oldIndex != null) {
                                pos = oldIndex < pos ? oldIndex : -1;
                                oldIndices[i - start] = oldIndex;
                                oe = old[oldIndex];
                                old[oldIndex] = null;
                                if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns);
                                if (ve.dom != null) nextSibling = ve.dom;
                                matched++;
                            }
                        }
                        nextSibling = originalNextSibling;
                        if (matched !== oldEnd - oldStart + 1) removeNodes(parent, old, oldStart, oldEnd + 1);
                        if (matched === 0) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);
                        else {
                            if (pos === -1) {
                                lisIndices = makeLisIndices(oldIndices);
                                li = lisIndices.length - 1;
                                for(i = end; i >= start; i--){
                                    v = vnodes[i];
                                    if (oldIndices[i - start] === -1) createNode(parent, v, hooks, ns, nextSibling);
                                    else if (lisIndices[li] === i - start) li--;
                                    else moveNodes(parent, v, nextSibling);
                                    if (v.dom != null) nextSibling = vnodes[i].dom;
                                }
                            } else for(i = end; i >= start; i--){
                                v = vnodes[i];
                                if (oldIndices[i - start] === -1) createNode(parent, v, hooks, ns, nextSibling);
                                if (v.dom != null) nextSibling = vnodes[i].dom;
                            }
                        }
                    }
                }
            }
        }
        function updateNode(parent, old, vnode, hooks, nextSibling, ns) {
            var oldTag = old.tag, tag = vnode.tag;
            if (oldTag === tag) {
                vnode.state = old.state;
                vnode.events = old.events;
                if (shouldNotUpdate(vnode, old)) return;
                if (typeof oldTag === "string") {
                    if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks);
                    switch(oldTag){
                        case "#":
                            updateText(old, vnode);
                            break;
                        case "<":
                            updateHTML(parent, old, vnode, ns, nextSibling);
                            break;
                        case "[":
                            updateFragment(parent, old, vnode, hooks, nextSibling, ns);
                            break;
                        default:
                            updateElement(old, vnode, hooks, ns);
                    }
                } else updateComponent(parent, old, vnode, hooks, nextSibling, ns);
            } else {
                removeNode(parent, old);
                createNode(parent, vnode, hooks, ns, nextSibling);
            }
        }
        function updateText(old, vnode) {
            if (old.children.toString() !== vnode.children.toString()) old.dom.nodeValue = vnode.children;
            vnode.dom = old.dom;
        }
        function updateHTML(parent, old, vnode, ns, nextSibling) {
            if (old.children !== vnode.children) {
                removeHTML(parent, old);
                createHTML(parent, vnode, ns, nextSibling);
            } else {
                vnode.dom = old.dom;
                vnode.domSize = old.domSize;
                vnode.instance = old.instance;
            }
        }
        function updateFragment(parent, old, vnode, hooks, nextSibling, ns) {
            updateNodes(parent, old.children, vnode.children, hooks, nextSibling, ns);
            var domSize = 0, children = vnode.children;
            vnode.dom = null;
            if (children != null) {
                for(var i = 0; i < children.length; i++){
                    var child = children[i];
                    if (child != null && child.dom != null) {
                        if (vnode.dom == null) vnode.dom = child.dom;
                        domSize += child.domSize || 1;
                    }
                }
                if (domSize !== 1) vnode.domSize = domSize;
            }
        }
        function updateElement(old, vnode, hooks, ns) {
            var element = vnode.dom = old.dom;
            ns = getNameSpace(vnode) || ns;
            if (vnode.tag === "textarea") {
                if (vnode.attrs == null) vnode.attrs = {};
                if (vnode.text != null) {
                    vnode.attrs.value = vnode.text;
                    vnode.text = undefined;
                }
            }
            updateAttrs(vnode, old.attrs, vnode.attrs, ns);
            if (!maybeSetContentEditable(vnode)) {
                if (old.text != null && vnode.text != null && vnode.text !== "") {
                    if (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text;
                } else {
                    if (old.text != null) old.children = [
                        Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)
                    ];
                    if (vnode.text != null) vnode.children = [
                        Vnode("#", undefined, undefined, vnode.text, undefined, undefined)
                    ];
                    updateNodes(element, old.children, vnode.children, hooks, null, ns);
                }
            }
        }
        function updateComponent(parent, old, vnode, hooks, nextSibling, ns) {
            vnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode));
            if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument");
            updateLifecycle(vnode.state, vnode, hooks);
            if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks);
            if (vnode.instance != null) {
                if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling);
                else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, ns);
                vnode.dom = vnode.instance.dom;
                vnode.domSize = vnode.instance.domSize;
            } else if (old.instance != null) {
                removeNode(parent, old.instance);
                vnode.dom = undefined;
                vnode.domSize = 0;
            } else {
                vnode.dom = old.dom;
                vnode.domSize = old.domSize;
            }
        }
        function getKeyMap(vnodes, start, end) {
            var map = Object.create(null);
            for(; start < end; start++){
                var vnode = vnodes[start];
                if (vnode != null) {
                    var key = vnode.key;
                    if (key != null) map[key] = start;
                }
            }
            return map;
        }
        var lisTemp = [];
        function makeLisIndices(a) {
            var result = [
                0
            ];
            var u = 0, v = 0, i = 0;
            var il = lisTemp.length = a.length;
            for(var i = 0; i < il; i++)lisTemp[i] = a[i];
            for(var i = 0; i < il; ++i){
                if (a[i] === -1) continue;
                var j = result[result.length - 1];
                if (a[j] < a[i]) {
                    lisTemp[i] = j;
                    result.push(i);
                    continue;
                }
                u = 0;
                v = result.length - 1;
                while(u < v){
                    var c = (u >>> 1) + (v >>> 1) + (u & v & 1);
                    if (a[result[c]] < a[i]) u = c + 1;
                    else v = c;
                }
                if (a[i] < a[result[u]]) {
                    if (u > 0) lisTemp[i] = result[u - 1];
                    result[u] = i;
                }
            }
            u = result.length;
            v = result[u - 1];
            while(u-- > 0){
                result[u] = v;
                v = lisTemp[v];
            }
            lisTemp.length = 0;
            return result;
        }
        function getNextSibling(vnodes, i, nextSibling) {
            for(; i < vnodes.length; i++){
                if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom;
            }
            return nextSibling;
        }
        function moveNodes(parent, vnode, nextSibling) {
            var frag = $doc.createDocumentFragment();
            moveChildToFrag(parent, frag, vnode);
            insertNode(parent, frag, nextSibling);
        }
        function moveChildToFrag(parent, frag, vnode) {
            while(vnode.dom != null && vnode.dom.parentNode === parent){
                if (typeof vnode.tag !== "string") {
                    vnode = vnode.instance;
                    if (vnode != null) continue;
                } else if (vnode.tag === "<") for(var i = 0; i < vnode.instance.length; i++)frag.appendChild(vnode.instance[i]);
                else if (vnode.tag !== "[") frag.appendChild(vnode.dom);
                else if (vnode.children.length === 1) {
                    vnode = vnode.children[0];
                    if (vnode != null) continue;
                } else for(var i = 0; i < vnode.children.length; i++){
                    var child = vnode.children[i];
                    if (child != null) moveChildToFrag(parent, frag, child);
                }
                break;
            }
        }
        function insertNode(parent, dom, nextSibling) {
            if (nextSibling != null) parent.insertBefore(dom, nextSibling);
            else parent.appendChild(dom);
        }
        function maybeSetContentEditable(vnode) {
            if (vnode.attrs == null || vnode.attrs.contenteditable == null && vnode.attrs.contentEditable == null) return false;
            var children = vnode.children;
            if (children != null && children.length === 1 && children[0].tag === "<") {
                var content = children[0].children;
                if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content;
            } else if (vnode.text != null || children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted");
            return true;
        }
        function removeNodes(parent, vnodes, start, end) {
            for(var i = start; i < end; i++){
                var vnode = vnodes[i];
                if (vnode != null) removeNode(parent, vnode);
            }
        }
        function removeNode(parent, vnode) {
            var mask = 0;
            var original = vnode.state;
            var stateResult, attrsResult;
            if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeremove === "function") {
                var result = callHook.call(vnode.state.onbeforeremove, vnode);
                if (result != null && typeof result.then === "function") {
                    mask = 1;
                    stateResult = result;
                }
            }
            if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") {
                var result = callHook.call(vnode.attrs.onbeforeremove, vnode);
                if (result != null && typeof result.then === "function") {
                    mask |= 2;
                    attrsResult = result;
                }
            }
            checkState(vnode, original);
            if (!mask) {
                onremove(vnode);
                removeChild(parent, vnode);
            } else {
                if (stateResult != null) {
                    var next = function() {
                        if (mask & 1) {
                            mask &= 2;
                            if (!mask) reallyRemove();
                        }
                    };
                    stateResult.then(next, next);
                }
                if (attrsResult != null) {
                    var next = function() {
                        if (mask & 2) {
                            mask &= 1;
                            if (!mask) reallyRemove();
                        }
                    };
                    attrsResult.then(next, next);
                }
            }
            function reallyRemove() {
                checkState(vnode, original);
                onremove(vnode);
                removeChild(parent, vnode);
            }
        }
        function removeHTML(parent, vnode) {
            for(var i = 0; i < vnode.instance.length; i++)parent.removeChild(vnode.instance[i]);
        }
        function removeChild(parent, vnode) {
            while(vnode.dom != null && vnode.dom.parentNode === parent){
                if (typeof vnode.tag !== "string") {
                    vnode = vnode.instance;
                    if (vnode != null) continue;
                } else if (vnode.tag === "<") removeHTML(parent, vnode);
                else {
                    if (vnode.tag !== "[") {
                        parent.removeChild(vnode.dom);
                        if (!Array.isArray(vnode.children)) break;
                    }
                    if (vnode.children.length === 1) {
                        vnode = vnode.children[0];
                        if (vnode != null) continue;
                    } else for(var i = 0; i < vnode.children.length; i++){
                        var child = vnode.children[i];
                        if (child != null) removeChild(parent, child);
                    }
                }
                break;
            }
        }
        function onremove(vnode) {
            if (typeof vnode.tag !== "string" && typeof vnode.state.onremove === "function") callHook.call(vnode.state.onremove, vnode);
            if (vnode.attrs && typeof vnode.attrs.onremove === "function") callHook.call(vnode.attrs.onremove, vnode);
            if (typeof vnode.tag !== "string") {
                if (vnode.instance != null) onremove(vnode.instance);
            } else {
                var children = vnode.children;
                if (Array.isArray(children)) for(var i = 0; i < children.length; i++){
                    var child = children[i];
                    if (child != null) onremove(child);
                }
            }
        }
        function setAttrs(vnode, attrs, ns) {
            for(var key in attrs)setAttr(vnode, key, null, attrs[key], ns);
        }
        function setAttr(vnode, key, old, value, ns) {
            if (key === "key" || key === "is" || value == null || isLifecycleMethod(key) || old === value && !isFormAttribute(vnode, key) && typeof value !== "object") return;
            if (key[0] === "o" && key[1] === "n") return updateEvent(vnode, key, value);
            if (key.slice(0, 6) === "xlink:") vnode.dom.setAttributeNS("http://www.w3.org/1999/xlink", key.slice(6), value);
            else if (key === "style") updateStyle(vnode.dom, old, value);
            else if (hasPropertyKey(vnode, key, ns)) {
                if (key === "value") {
                    if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === "" + value && vnode.dom === activeElement()) return;
                    if (vnode.tag === "select" && old !== null && vnode.dom.value === "" + value) return;
                    if (vnode.tag === "option" && old !== null && vnode.dom.value === "" + value) return;
                }
                if (vnode.tag === "input" && key === "type") vnode.dom.setAttribute(key, value);
                else vnode.dom[key] = value;
            } else if (typeof value === "boolean") {
                if (value) vnode.dom.setAttribute(key, "");
                else vnode.dom.removeAttribute(key);
            } else vnode.dom.setAttribute(key === "className" ? "class" : key, value);
        }
        function removeAttr(vnode, key, old, ns) {
            if (key === "key" || key === "is" || old == null || isLifecycleMethod(key)) return;
            if (key[0] === "o" && key[1] === "n" && !isLifecycleMethod(key)) updateEvent(vnode, key, undefined);
            else if (key === "style") updateStyle(vnode.dom, old, null);
            else if (hasPropertyKey(vnode, key, ns) && key !== "className" && !(key === "value" && (vnode.tag === "option" || vnode.tag === "select" && vnode.dom.selectedIndex === -1 && vnode.dom === activeElement())) && !(vnode.tag === "input" && key === "type")) vnode.dom[key] = null;
            else {
                var nsLastIndex = key.indexOf(":");
                if (nsLastIndex !== -1) key = key.slice(nsLastIndex + 1);
                if (old !== false) vnode.dom.removeAttribute(key === "className" ? "class" : key);
            }
        }
        function setLateSelectAttrs(vnode, attrs) {
            if ("value" in attrs) {
                if (attrs.value === null) {
                    if (vnode.dom.selectedIndex !== -1) vnode.dom.value = null;
                } else {
                    var normalized = "" + attrs.value;
                    if (vnode.dom.value !== normalized || vnode.dom.selectedIndex === -1) vnode.dom.value = normalized;
                }
            }
            if ("selectedIndex" in attrs) setAttr(vnode, "selectedIndex", null, attrs.selectedIndex, undefined);
        }
        function updateAttrs(vnode, old, attrs, ns) {
            if (attrs != null) for(var key in attrs)setAttr(vnode, key, old && old[key], attrs[key], ns);
            var val;
            if (old != null) {
                for(var key in old)if ((val = old[key]) != null && (attrs == null || attrs[key] == null)) removeAttr(vnode, key, val, ns);
            }
        }
        function isFormAttribute(vnode, attr) {
            return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === activeElement() || vnode.tag === "option" && vnode.dom.parentNode === $doc.activeElement;
        }
        function isLifecycleMethod(attr) {
            return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate";
        }
        function hasPropertyKey(vnode, key, ns) {
            return ns === undefined && (vnode.tag.indexOf("-") > -1 || vnode.attrs != null && vnode.attrs.is || key !== "href" && key !== "list" && key !== "form" && key !== "width" && key !== "height") && key in vnode.dom;
        }
        var uppercaseRegex = /[A-Z]/g;
        function toLowerCase(capital) {
            return "-" + capital.toLowerCase();
        }
        function normalizeKey(key) {
            return key[0] === "-" && key[1] === "-" ? key : key === "cssFloat" ? "float" : key.replace(uppercaseRegex, toLowerCase);
        }
        function updateStyle(element, old, style) {
            if (old === style) ;
            else if (style == null) element.style.cssText = "";
            else if (typeof style !== "object") element.style.cssText = style;
            else if (old == null || typeof old !== "object") {
                element.style.cssText = "";
                for(var key in style){
                    var value = style[key];
                    if (value != null) element.style.setProperty(normalizeKey(key), String(value));
                }
            } else {
                for(var key in style){
                    var value = style[key];
                    if (value != null && (value = String(value)) !== String(old[key])) element.style.setProperty(normalizeKey(key), value);
                }
                for(var key in old)if (old[key] != null && style[key] == null) element.style.removeProperty(normalizeKey(key));
            }
        }
        function EventDict() {
            this._ = currentRedraw;
        }
        EventDict.prototype = Object.create(null);
        EventDict.prototype.handleEvent = function(ev) {
            var handler = this["on" + ev.type];
            var result;
            if (typeof handler === "function") result = handler.call(ev.currentTarget, ev);
            else if (typeof handler.handleEvent === "function") handler.handleEvent(ev);
            if (this._ && ev.redraw !== false) (0, this._)();
            if (result === false) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        };
        function updateEvent(vnode, key, value) {
            if (vnode.events != null) {
                if (vnode.events[key] === value) return;
                if (value != null && (typeof value === "function" || typeof value === "object")) {
                    if (vnode.events[key] == null) vnode.dom.addEventListener(key.slice(2), vnode.events, false);
                    vnode.events[key] = value;
                } else {
                    if (vnode.events[key] != null) vnode.dom.removeEventListener(key.slice(2), vnode.events, false);
                    vnode.events[key] = undefined;
                }
            } else if (value != null && (typeof value === "function" || typeof value === "object")) {
                vnode.events = new EventDict();
                vnode.dom.addEventListener(key.slice(2), vnode.events, false);
                vnode.events[key] = value;
            }
        }
        function initLifecycle(source, vnode, hooks) {
            if (typeof source.oninit === "function") callHook.call(source.oninit, vnode);
            if (typeof source.oncreate === "function") hooks.push(callHook.bind(source.oncreate, vnode));
        }
        function updateLifecycle(source, vnode, hooks) {
            if (typeof source.onupdate === "function") hooks.push(callHook.bind(source.onupdate, vnode));
        }
        function shouldNotUpdate(vnode, old) {
            do {
                if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") {
                    var force = callHook.call(vnode.attrs.onbeforeupdate, vnode, old);
                    if (force !== undefined && !force) break;
                }
                if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeupdate === "function") {
                    var force = callHook.call(vnode.state.onbeforeupdate, vnode, old);
                    if (force !== undefined && !force) break;
                }
                return false;
            }while (false);
            vnode.dom = old.dom;
            vnode.domSize = old.domSize;
            vnode.instance = old.instance;
            vnode.attrs = old.attrs;
            vnode.children = old.children;
            vnode.text = old.text;
            return true;
        }
        return function(dom, vnodes, redraw) {
            if (!dom) throw new TypeError("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.");
            var hooks = [];
            var active = activeElement();
            var namespace = dom.namespaceURI;
            if (dom.vnodes == null) dom.textContent = "";
            vnodes = Vnode.normalizeChildren(Array.isArray(vnodes) ? vnodes : [
                vnodes
            ]);
            var prevRedraw = currentRedraw;
            try {
                currentRedraw = typeof redraw === "function" ? redraw : undefined;
                updateNodes(dom, dom.vnodes, vnodes, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? undefined : namespace);
            } finally{
                currentRedraw = prevRedraw;
            }
            dom.vnodes = vnodes;
            if (active != null && activeElement() !== active && typeof active.focus === "function") active.focus();
            for(var i = 0; i < hooks.length; i++)hooks[i]();
        };
    };
});
var load9 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    module.exports = load8()(window);
});
var load10 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    var Vnode = load();
    module.exports = function(render1, schedule, console) {
        var subscriptions = [];
        var rendering = false;
        var pending = false;
        function sync() {
            if (rendering) throw new Error("Nested m.redraw.sync() call");
            rendering = true;
            for(var i = 0; i < subscriptions.length; i += 2)try {
                render1(subscriptions[i], Vnode(subscriptions[i + 1]), redraw);
            } catch (e) {
                console.error(e);
            }
            rendering = false;
        }
        function redraw() {
            if (!pending) {
                pending = true;
                schedule(function() {
                    pending = false;
                    sync();
                });
            }
        }
        redraw.sync = sync;
        function mount(root, component) {
            if (component != null && component.view == null && typeof component !== "function") throw new TypeError("m.mount(element, component) expects a component, not a vnode");
            var index = subscriptions.indexOf(root);
            if (index >= 0) {
                subscriptions.splice(index, 2);
                render1(root, [], redraw);
            }
            if (component != null) {
                subscriptions.push(root, component);
                render1(root, Vnode(component), redraw);
            }
        }
        return {
            mount: mount,
            redraw: redraw
        };
    };
});
var load11 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    var render2 = load9();
    module.exports = load10()(render2, requestAnimationFrame, console);
});
var load12 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    module.exports = function(object) {
        if (Object.prototype.toString.call(object) !== "[object Object]") return "";
        var args = [];
        for(var key1 in object)destructure(key1, object[key1]);
        return args.join("&");
        function destructure(key, value) {
            if (Array.isArray(value)) {
                for(var i = 0; i < value.length; i++){
                    destructure(key + "[" + i + "]", value[i]);
                }
            } else if (Object.prototype.toString.call(value) === "[object Object]") {
                for(var i in value){
                    destructure(key + "[" + i + "]", value[i]);
                }
            } else args.push(encodeURIComponent(key) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""));
        }
    };
});
var load13 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    module.exports = Object.assign || function(target, source) {
        if (source) Object.keys(source).forEach(function(key) {
            target[key] = source[key];
        });
    };
});
var load14 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    var buildQueryString = load12();
    var assign = load13();
    module.exports = function(template, params) {
        if (/:([^\/\.-]+)(\.{3})?:/.test(template)) throw new SyntaxError("Template parameter names *must* be separated");
        if (params == null) return template;
        var queryIndex = template.indexOf("?");
        var hashIndex = template.indexOf("#");
        var queryEnd = hashIndex < 0 ? template.length : hashIndex;
        var pathEnd = queryIndex < 0 ? queryEnd : queryIndex;
        var path = template.slice(0, pathEnd);
        var query = {};
        assign(query, params);
        var resolved = path.replace(/:([^\/\.-]+)(\.{3})?/g, function(m1, key, variadic) {
            delete query[key];
            if (params[key] == null) return m1;
            return variadic ? params[key] : encodeURIComponent(String(params[key]));
        });
        var newQueryIndex = resolved.indexOf("?");
        var newHashIndex = resolved.indexOf("#");
        var newQueryEnd = newHashIndex < 0 ? resolved.length : newHashIndex;
        var newPathEnd = newQueryIndex < 0 ? newQueryEnd : newQueryIndex;
        var result = resolved.slice(0, newPathEnd);
        if (queryIndex >= 0) result += template.slice(queryIndex, queryEnd);
        if (newQueryIndex >= 0) result += (queryIndex < 0 ? "?" : "&") + resolved.slice(newQueryIndex, newQueryEnd);
        var querystring = buildQueryString(query);
        if (querystring) result += (queryIndex < 0 && newQueryIndex < 0 ? "?" : "&") + querystring;
        if (hashIndex >= 0) result += template.slice(hashIndex);
        if (newHashIndex >= 0) result += (hashIndex < 0 ? "" : "&") + resolved.slice(newHashIndex);
        return result;
    };
});
var load15 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    var buildPathname = load14();
    module.exports = function($window, Promise, oncompletion) {
        var callbackCount = 0;
        function PromiseProxy(executor) {
            return new Promise(executor);
        }
        PromiseProxy.prototype = Promise.prototype;
        PromiseProxy.__proto__ = Promise;
        function makeRequest(factory) {
            return function(url, args) {
                if (typeof url !== "string") {
                    args = url;
                    url = url.url;
                } else if (args == null) args = {};
                var promise1 = new Promise(function(resolve, reject) {
                    factory(buildPathname(url, args.params), args, function(data) {
                        if (typeof args.type === "function") {
                            if (Array.isArray(data)) for(var i = 0; i < data.length; i++)data[i] = new args.type(data[i]);
                            else data = new args.type(data);
                        }
                        resolve(data);
                    }, reject);
                });
                if (args.background === true) return promise1;
                var count = 0;
                function complete() {
                    if (--count === 0 && typeof oncompletion === "function") oncompletion();
                }
                return wrap(promise1);
                function wrap(promise) {
                    var then = promise.then;
                    promise.constructor = PromiseProxy;
                    promise.then = function() {
                        count++;
                        var next = then.apply(promise, arguments);
                        next.then(complete, function(e) {
                            complete();
                            if (count === 0) throw e;
                        });
                        return wrap(next);
                    };
                    return promise;
                }
            };
        }
        function hasHeader(args, name) {
            for(var key in args.headers){
                if (({}).hasOwnProperty.call(args.headers, key) && name.test(key)) return true;
            }
            return false;
        }
        return {
            request: makeRequest(function(url, args, resolve, reject) {
                var method = args.method != null ? args.method.toUpperCase() : "GET";
                var body = args.body;
                var assumeJSON = (args.serialize == null || args.serialize === JSON.serialize) && !(body instanceof $window.FormData);
                var responseType = args.responseType || (typeof args.extract === "function" ? "" : "json");
                var xhr = new $window.XMLHttpRequest(), aborted = false;
                var original = xhr, replacedAbort;
                var abort = xhr.abort;
                xhr.abort = function() {
                    aborted = true;
                    abort.call(this);
                };
                xhr.open(method, url, args.async !== false, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined);
                if (assumeJSON && body != null && !hasHeader(args, /^content-type$/i)) xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                if (typeof args.deserialize !== "function" && !hasHeader(args, /^accept$/i)) xhr.setRequestHeader("Accept", "application/json, text/*");
                if (args.withCredentials) xhr.withCredentials = args.withCredentials;
                if (args.timeout) xhr.timeout = args.timeout;
                xhr.responseType = responseType;
                for(var key in args.headers)if (({}).hasOwnProperty.call(args.headers, key)) xhr.setRequestHeader(key, args.headers[key]);
                xhr.onreadystatechange = function(ev) {
                    if (aborted) return;
                    if (ev.target.readyState === 4) try {
                        var success = ev.target.status >= 200 && ev.target.status < 300 || ev.target.status === 304 || /^file:\/\//i.test(url);
                        var response = ev.target.response, message;
                        if (responseType === "json") {
                            if (!ev.target.responseType && typeof args.extract !== "function") response = JSON.parse(ev.target.responseText);
                        } else if (!responseType || responseType === "text") {
                            if (response == null) response = ev.target.responseText;
                        }
                        if (typeof args.extract === "function") {
                            response = args.extract(ev.target, args);
                            success = true;
                        } else if (typeof args.deserialize === "function") response = args.deserialize(response);
                        if (success) resolve(response);
                        else {
                            try {
                                message = ev.target.responseText;
                            } catch (e) {
                                message = response;
                            }
                            var error = new Error(message);
                            error.code = ev.target.status;
                            error.response = response;
                            reject(error);
                        }
                    } catch (e) {
                        reject(e);
                    }
                };
                if (typeof args.config === "function") {
                    xhr = args.config(xhr, args, url) || xhr;
                    if (xhr !== original) {
                        replacedAbort = xhr.abort;
                        xhr.abort = function() {
                            aborted = true;
                            replacedAbort.call(this);
                        };
                    }
                }
                if (body == null) xhr.send();
                else if (typeof args.serialize === "function") xhr.send(args.serialize(body));
                else if (body instanceof $window.FormData) xhr.send(body);
                else xhr.send(JSON.stringify(body));
            }),
            jsonp: makeRequest(function(url, args, resolve, reject) {
                var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++;
                var script = $window.document.createElement("script");
                $window[callbackName] = function(data) {
                    delete $window[callbackName];
                    script.parentNode.removeChild(script);
                    resolve(data);
                };
                script.onerror = function() {
                    delete $window[callbackName];
                    script.parentNode.removeChild(script);
                    reject(new Error("JSONP request failed"));
                };
                script.src = url + (url.indexOf("?") < 0 ? "?" : "&") + encodeURIComponent(args.callbackKey || "callback") + "=" + encodeURIComponent(callbackName);
                $window.document.documentElement.appendChild(script);
            })
        };
    };
});
var load16 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    var PromisePolyfill = load7();
    var mountRedraw = load11();
    module.exports = load15()(window, PromisePolyfill, mountRedraw.redraw);
});
var load17 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    module.exports = function(string) {
        if (string === "" || string == null) return {};
        if (string.charAt(0) === "?") string = string.slice(1);
        var entries = string.split("&"), counters = {}, data = {};
        for(var i = 0; i < entries.length; i++){
            var entry = entries[i].split("=");
            var key = decodeURIComponent(entry[0]);
            var value = entry.length === 2 ? decodeURIComponent(entry[1]) : "";
            if (value === "true") value = true;
            else if (value === "false") value = false;
            var levels = key.split(/\]\[?|\[/);
            var cursor = data;
            if (key.indexOf("[") > -1) levels.pop();
            for(var j = 0; j < levels.length; j++){
                var level = levels[j], nextLevel = levels[j + 1];
                var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10));
                if (level === "") {
                    var key = levels.slice(0, j).join();
                    if (counters[key] == null) counters[key] = Array.isArray(cursor) ? cursor.length : 0;
                    level = counters[key]++;
                } else if (level === "__proto__") break;
                if (j === levels.length - 1) cursor[level] = value;
                else {
                    var desc = Object.getOwnPropertyDescriptor(cursor, level);
                    if (desc != null) desc = desc.value;
                    if (desc == null) cursor[level] = desc = isNumber ? [] : {};
                    cursor = desc;
                }
            }
        }
        return data;
    };
});
var load18 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    var parseQueryString = load17();
    module.exports = function(url) {
        var queryIndex = url.indexOf("?");
        var hashIndex = url.indexOf("#");
        var queryEnd = hashIndex < 0 ? url.length : hashIndex;
        var pathEnd = queryIndex < 0 ? queryEnd : queryIndex;
        var path = url.slice(0, pathEnd).replace(/\/{2,}/g, "/");
        if (!path) path = "/";
        else {
            if (path[0] !== "/") path = "/" + path;
            if (path.length > 1 && path[path.length - 1] === "/") path = path.slice(0, -1);
        }
        return {
            path: path,
            params: queryIndex < 0 ? {} : parseQueryString(url.slice(queryIndex + 1, queryEnd))
        };
    };
});
var load19 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    var parsePathname = load18();
    module.exports = function(template) {
        var templateData = parsePathname(template);
        var templateKeys = Object.keys(templateData.params);
        var keys = [];
        var regexp = new RegExp("^" + templateData.path.replace(/:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g, function(m2, key, extra) {
            if (key == null) return "\\" + m2;
            keys.push({
                k: key,
                r: extra === "..."
            });
            if (extra === "...") return "(.*)";
            if (extra === ".") return "([^/]+)\\.";
            return "([^/]+)" + (extra || "");
        }) + "$");
        return function(data) {
            for(var i = 0; i < templateKeys.length; i++){
                if (templateData.params[templateKeys[i]] !== data.params[templateKeys[i]]) return false;
            }
            if (!keys.length) return regexp.test(data.path);
            var values = regexp.exec(data.path);
            if (values == null) return false;
            for(var i = 0; i < keys.length; i++)data.params[keys[i].k] = keys[i].r ? values[i + 1] : decodeURIComponent(values[i + 1]);
            return true;
        };
    };
});
var load20 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    var Vnode = load();
    var m3 = load2();
    var Promise = load7();
    var buildPathname = load14();
    var parsePathname = load18();
    var compileTemplate = load19();
    var assign = load13();
    var sentinel = {};
    module.exports = function($window, mountRedraw) {
        var fireAsync;
        function setPath(path, data, options) {
            path = buildPathname(path, data);
            if (fireAsync != null) {
                fireAsync();
                var state = options ? options.state : null;
                var title = options ? options.title : null;
                if (options && options.replace) $window.history.replaceState(state, title, route1.prefix + path);
                else $window.history.pushState(state, title, route1.prefix + path);
            } else $window.location.href = route1.prefix + path;
        }
        var currentResolver = sentinel, component, attrs1, currentPath, lastUpdate;
        var SKIP = route1.SKIP = {};
        function route1(root, defaultRoute, routes) {
            if (root == null) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined");
            var state = 0;
            var compiled = Object.keys(routes).map(function(route) {
                if (route[0] !== "/") throw new SyntaxError("Routes must start with a `/`");
                if (/:([^\/\.-]+)(\.{3})?:/.test(route)) throw new SyntaxError("Route parameter names must be separated with either `/`, `.`, or `-`");
                return {
                    route: route,
                    component: routes[route],
                    check: compileTemplate(route)
                };
            });
            var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout;
            var p = Promise.resolve();
            var scheduled = false;
            var onremove;
            fireAsync = null;
            if (defaultRoute != null) {
                var defaultData = parsePathname(defaultRoute);
                if (!compiled.some(function(i) {
                    return i.check(defaultData);
                })) throw new ReferenceError("Default route doesn't match any known routes");
            }
            function resolveRoute() {
                scheduled = false;
                var prefix = $window.location.hash;
                if (route1.prefix[0] !== "#") {
                    prefix = $window.location.search + prefix;
                    if (route1.prefix[0] !== "?") {
                        prefix = $window.location.pathname + prefix;
                        if (prefix[0] !== "/") prefix = "/" + prefix;
                    }
                }
                var path = prefix.concat().replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent).slice(route1.prefix.length);
                var data = parsePathname(path);
                assign(data.params, $window.history.state);
                function fail() {
                    if (path === defaultRoute) throw new Error("Could not resolve default route " + defaultRoute);
                    setPath(defaultRoute, null, {
                        replace: true
                    });
                }
                loop(0);
                function loop(i) {
                    for(; i < compiled.length; i++)if (compiled[i].check(data)) {
                        var payload = compiled[i].component;
                        var matchedRoute = compiled[i].route;
                        var localComp = payload;
                        var update = lastUpdate = function(comp) {
                            if (update !== lastUpdate) return;
                            if (comp === SKIP) return loop(i + 1);
                            component = comp != null && (typeof comp.view === "function" || typeof comp === "function") ? comp : "div";
                            attrs1 = data.params, currentPath = path, lastUpdate = null;
                            currentResolver = payload.render ? payload : null;
                            if (state === 2) mountRedraw.redraw();
                            else {
                                state = 2;
                                mountRedraw.redraw.sync();
                            }
                        };
                        if (payload.view || typeof payload === "function") {
                            payload = {};
                            update(localComp);
                        } else if (payload.onmatch) p.then(function() {
                            return payload.onmatch(data.params, path, matchedRoute);
                        }).then(update, fail);
                        else update("div");
                        return;
                    }
                    fail();
                }
            }
            fireAsync = function() {
                if (!scheduled) {
                    scheduled = true;
                    callAsync(resolveRoute);
                }
            };
            if (typeof $window.history.pushState === "function") {
                onremove = function() {
                    $window.removeEventListener("popstate", fireAsync, false);
                };
                $window.addEventListener("popstate", fireAsync, false);
            } else if (route1.prefix[0] === "#") {
                fireAsync = null;
                onremove = function() {
                    $window.removeEventListener("hashchange", resolveRoute, false);
                };
                $window.addEventListener("hashchange", resolveRoute, false);
            }
            return mountRedraw.mount(root, {
                onbeforeupdate: function() {
                    state = state ? 2 : 1;
                    return !(!state || sentinel === currentResolver);
                },
                oncreate: resolveRoute,
                onremove: onremove,
                view: function() {
                    if (!state || sentinel === currentResolver) return;
                    var vnode = [
                        Vnode(component, attrs1.key, attrs1)
                    ];
                    if (currentResolver) vnode = currentResolver.render(vnode[0]);
                    return vnode;
                }
            });
        }
        route1.set = function(path, data, options) {
            if (lastUpdate != null) {
                options = options || {};
                options.replace = true;
            }
            lastUpdate = null;
            setPath(path, data, options);
        };
        route1.get = function() {
            return currentPath;
        };
        route1.prefix = "#!";
        route1.Link = {
            view: function(vnode) {
                var options = vnode.attrs.options;
                var attrs = {}, onclick, href;
                assign(attrs, vnode.attrs);
                attrs.selector = attrs.options = attrs.key = attrs.oninit = attrs.oncreate = attrs.onbeforeupdate = attrs.onupdate = attrs.onbeforeremove = attrs.onremove = null;
                var child = m3(vnode.attrs.selector || "a", attrs, vnode.children);
                if (child.attrs.disabled = Boolean(child.attrs.disabled)) {
                    child.attrs.href = null;
                    child.attrs["aria-disabled"] = "true";
                    child.attrs.onclick = null;
                } else {
                    onclick = child.attrs.onclick;
                    href = child.attrs.href;
                    child.attrs.href = route1.prefix + href;
                    child.attrs.onclick = function(e) {
                        var result;
                        if (typeof onclick === "function") result = onclick.call(e.currentTarget, e);
                        else if (onclick == null || typeof onclick !== "object") ;
                        else if (typeof onclick.handleEvent === "function") onclick.handleEvent(e);
                        if (result !== false && !e.defaultPrevented && (e.button === 0 || e.which === 0 || e.which === 1) && (!e.currentTarget.target || e.currentTarget.target === "_self") && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
                            e.preventDefault();
                            e.redraw = false;
                            route1.set(href, null, options);
                        }
                    };
                }
                return child;
            }
        };
        route1.param = function(key) {
            return attrs1 && key != null ? attrs1[key] : attrs1;
        };
        return route1;
    };
});
var load21 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    var mountRedraw = load11();
    module.exports = load20()(window, mountRedraw);
});
var load22 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    var hyperscript = load5();
    var request = load16();
    var mountRedraw = load11();
    var m4 = function m() {
        return hyperscript.apply(this, arguments);
    };
    m4.m = hyperscript;
    m4.trust = hyperscript.trust;
    m4.fragment = hyperscript.fragment;
    m4.mount = mountRedraw.mount;
    m4.route = load21();
    m4.render = load9();
    m4.redraw = mountRedraw.redraw;
    m4.request = request.request;
    m4.jsonp = request.jsonp;
    m4.parseQueryString = load17();
    m4.buildQueryString = load12();
    m4.parsePathname = load18();
    m4.buildPathname = load14();
    m4.vnode = load();
    m4.PromisePolyfill = load6();
    module.exports = m4;
});
var load23 = __swcpack_require__.bind(void 0, function(module, exports) {
    "use strict";
    const m5 = load5();
    const Vnode = load();
    const VOID_TAGS = new RegExp("^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr|!doctype)$", "i");
    const hasOwn = {}.hasOwnProperty;
    function toStyleKey(str) {
        if (str[0] === "-" && str[1] === "-") return str;
        return str.replace(/\W+/g, "-").replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase();
    }
    function replaceHtml(m6) {
        if (m6 === "&") return "&amp;";
        if (m6 === "<") return "&lt;";
        return "&gt;";
    }
    function replaceAttribute(m7) {
        if (m7 === "&") return "&amp;";
        if (m7 === "<") return "&lt;";
        if (m7 === ">") return "&gt;";
        return "&quot;";
    }
    const defaults = {
        escapeText (s) {
            return s.replace(/[&<>]/g, replaceHtml);
        },
        escapeAttribute (s) {
            return s.replace(/[&<>"]/g, replaceAttribute);
        }
    };
    function bindOpt(options, key) {
        return options[key] ? options[key].bind(options) : defaults[key];
    }
    function* tryRender(view1, attrs, options, allowAwait) {
        if (view1 == null) return "";
        if (view1.view || typeof view1 === "function") {
            view1 = m5(view1, attrs);
            options = options || {};
        } else options = attrs || {};
        const hooks = [];
        let result = "";
        const escapeAttribute = bindOpt(options, "escapeAttribute");
        const escapeText = bindOpt(options, "escapeText");
        const xml = !!options.xml;
        const strict = xml || !!options.strict;
        function write(value) {
            result = "" + result + value;
        }
        function* setHooks(source, vnode) {
            const promises = [];
            let waitFor;
            if (allowAwait) waitFor = (p)=>{
                promises.push(p);
            };
            if (source.oninit) source.oninit.call(vnode.state, vnode, waitFor);
            if (source.onremove) hooks.push(source.onremove.bind(vnode.state, vnode));
            if (promises.length) yield promises;
        }
        function createAttrString(view) {
            for(const key in view.attrs)if (hasOwn.call(view.attrs, key)) {
                let value = view.attrs[key];
                if (value == null || typeof value === "function") continue;
                const name = key === "className" ? "class" : key;
                if (name === "style" && typeof value === "object") {
                    const styles = value;
                    const props = [];
                    for (const key of Object.keys(styles)){
                        const prop = styles[key];
                        if (prop) props.push(`${toStyleKey(key)}:${prop}`);
                    }
                    if (!props.length) continue;
                    value = props.join(";");
                }
                if (typeof value === "boolean") {
                    if (xml) value = value ? "true" : "false";
                    else if (!value) continue;
                    else value = "";
                } else value = "" + value;
                write(` ${name}`);
                if (strict || value !== "") write(`="${escapeAttribute(value)}"`);
            }
        }
        function* renderComponent(vnode) {
            if (typeof vnode.tag !== "function") vnode.state = Object.create(vnode.tag);
            else if (vnode.tag.prototype && vnode.tag.prototype.view) vnode.state = new vnode.tag(vnode);
            else vnode.state = vnode.tag(vnode);
            yield* setHooks(vnode.state, vnode);
            if (vnode.attrs != null) yield* setHooks(vnode.attrs, vnode);
            vnode.instance = Vnode.normalize(vnode.state.view(vnode));
            if (vnode.instance != null) yield* renderNode(vnode.instance);
        }
        function* renderElement(vnode) {
            write(`<${vnode.tag}`);
            createAttrString(vnode);
            if (!xml && VOID_TAGS.test(vnode.tag)) write(strict ? "/>" : ">");
            else {
                write(">");
                if (vnode.text != null) {
                    const text = "" + vnode.text;
                    if (text !== "") write(escapeText(text));
                } else yield* renderChildren(vnode.children);
                write(`</${vnode.tag}>`);
            }
        }
        function* renderChildren(vnodes) {
            for (const v of vnodes)if (v != null) yield* renderNode(v);
        }
        function* renderNode(vnode) {
            if (vnode == null) return;
            if (typeof vnode.tag === "string") {
                vnode.state = {};
                if (vnode.attrs != null) yield* setHooks(vnode.attrs, vnode);
                switch(vnode.tag){
                    case "#":
                        write(escapeText("" + vnode.children));
                        break;
                    case "<":
                        write(vnode.children);
                        break;
                    case "[":
                        yield* renderChildren(vnode.children);
                        break;
                    default:
                        yield* renderElement(vnode);
                }
            } else yield* renderComponent(vnode);
        }
        yield* renderNode(Vnode.normalize(view1));
        for (const hook of hooks)hook();
        return result.concat();
    }
    module.exports = async (view, attrs, options)=>{
        const iter = tryRender(view, attrs, options, true);
        while(true){
            const { done , value  } = iter.next();
            if (done) return value;
            await Promise.all(value);
        }
    };
    module.exports.sync = (view, attrs, options)=>{
        return tryRender(view, attrs, options, false).next().value;
    };
    module.exports.escapeText = defaults.escapeText;
    module.exports.escapeAttribute = defaults.escapeAttribute;
});
if (!global.window) global.window = global.document = global.requestAnimationFrame = undefined;
var m = load22();
var render = load23();
function App() {
    return render.sync(m("span", "huhu"));
}
App();
