

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

___$insertStyle(".counter {\n  --bg-color: #f3f3f3;\n  --base-color: #666;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100px;\n  width: 70px;\n  margin: 10% auto;\n  border: 3px solid var(--base-color);\n  border-radius: 5px;\n  color: var(--base-color);\n  background-color: var(--bg-color);\n  cursor: pointer;\n  overflow: hidden;\n}\n.counter:hover {\n  color: var(--bg-color);\n  background-color: var(--base-color);\n  border-color: var(--bg-color);\n}\n.counter__count {\n  font-size: 2rem;\n  font-family: \"Segoe UI\", sans-serif;\n  color: inherit;\n  animation: in 1s ease alternate forwards;\n  pointer-events: none;\n}\n\n@keyframes in {\n  0% {\n    transform: translateY(-200%);\n  }\n  50% {\n    color: inherit;\n    font-size: 2.2rem;\n    transform: translateY(0);\n    opacity: 1;\n  }\n  90% {\n    opacity: 0;\n    color: var(--blaze);\n  }\n  100% {\n    transform: translateY(200%);\n    font-size: 1.8rem;\n    opacity: 0;\n  }\n}");

___$insertStyle(".home-select {\n  position: relative;\n}\n.home-select .select-group {\n  z-index: 3;\n  position: relative;\n}\n.home-select .dropdown-menu {\n  transition: transform 1s ease;\n  position: absolute;\n  /* background: cadetblue; */\n  text-align: center;\n  left: 7px;\n}\n.home-select .dropdown-menu .dropdown-menu-item {\n  background-color: white;\n  width: 116px;\n  height: 32px;\n  box-shadow: none;\n  border: 1.2px solid #000;\n  position: absolute;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 1s ease;\n  cursor: pointer;\n}\n.home-select .dropdown-menu .dropdown-menu-item button {\n  width: 100%;\n  height: 100%;\n  background: transparent;\n  box-shadow: none;\n  border: none;\n  cursor: pointer;\n}\n.home-select .dropdown-menu.hidden {\n  transform: translateY(-25px);\n}\n.home-select .dropdown-menu.active {\n  transform: translate(-7px, 10px);\n}\n.home-select .select-group button {\n  cursor: pointer;\n  background-color: white;\n  width: 116px;\n  height: 32px;\n  box-shadow: none;\n  border: 1.2px solid black;\n}\n.home-select .select-group .select-second-border {\n  position: absolute;\n  width: 116px;\n  height: 32px;\n  z-index: -1;\n  top: 7px;\n  left: 7px;\n}\n\n@media (max-width: 600px) {\n  .home-select .dropdown-menu .dropdown-menu-item {\n    width: 70px;\n  }\n  .home-select .dropdown-menu .dropdown-menu-item .text {\n    font-size: 0.8rem;\n    font-weight: 500;\n  }\n  .home-select .select-group button {\n    width: 70px;\n    font-size: 0.8rem;\n  }\n  .home-select .select-group button .text {\n    font-size: 0.8rem;\n    font-weight: 500;\n  }\n}");

var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
var SelectComp = function (_a) {
    var currentPage = _a.currentPage, onSelect = _a.onSelect, children = _a.children;
    var outRef = useRef(null);
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var _c = useState([]), selectedChildren = _c[0], setChildren = _c[1];
    var _d = useState(), selected = _d[0], setSelected = _d[1];
    var _e = useState(0), offsetY = _e[0], setOffsetY = _e[1];
    useEffect(function () {
        if (children && children.constructor === Array) {
            setSelected(children.find(function (c) { return currentPage === c.props.value; }));
            setChildren(children.filter(function (c) { return currentPage !== c.props.value; }));
        }
    }, [currentPage]);
    useEffect(function () {
        window.addEventListener("scroll", function () { return handleScroll(); });
        return function () { return window.removeEventListener("scroll", handleScroll); };
    }, []);
    var handleScroll = function () {
        setOffsetY(function (oldOffset) {
            if (Math.abs(oldOffset - window.pageYOffset) > 100) {
                setOpen(false);
                return window.pageYOffset;
            }
            return oldOffset;
        });
    };
    var useOutsideClick = function (callback) {
        var handleClick = function (e) {
            if (outRef && outRef.current && !outRef.current.contains(e.target)) {
                callback();
            }
        };
        useEffect(function () {
            document.addEventListener("click", handleClick);
            return function () {
                document.removeEventListener("click", handleClick);
            };
        });
    };
    useOutsideClick(function () {
        setOpen(false);
    });
    return (React.createElement("div", { ref: outRef, className: "home-select" },
        React.createElement("div", { className: "select-group" },
            React.createElement("div", { className: "select-second-border" }),
            React.createElement("button", { className: "select-button", onClick: function () { return setOpen(!open); } },
                React.createElement("div", { className: "text" }, selected ? selected.props.children : ""))),
        React.createElement("div", { className: "dropdown-menu " + (open ? "active" : "hidden") }, selectedChildren.map(function (c, i) {
            return React.createElement("div", { key: i, style: open ? { transform: "translateY(" + i * 42 + "px)" } : {}, className: "dropdown-menu-item" },
                React.createElement("button", { onClick: function () {
                        setOpen(false);
                        onSelect(c.props.value);
                    } }, c));
        }))));
};
var Option = function (_a) {
    var value = _a.value, children = _a.children;
    return (React.createElement("div", { key: value }, children));
};

exports.Option = Option;
exports.default = SelectComp;
//# sourceMappingURL=index.js.map
