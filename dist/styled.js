/*
Copyright (c) 2019 Daybrush
name: css-styled
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/css-styled.git
version: 1.0.0
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.styled = factory());
}(this, (function () { 'use strict';

  function hash(str) {
    var hash = 5381,
        i    = str.length;

    while(i) {
      hash = (hash * 33) ^ str.charCodeAt(--i);
    }

    /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
     * integers. Since we want the results to be always positive, convert the
     * signed int to an unsigned by doing an unsigned bitshift. */
    return hash >>> 0;
  }

  var stringHash = hash;

  /*
  Copyright (c) 2018 Daybrush
  @name: @daybrush/utils
  license: MIT
  author: Daybrush
  repository: https://github.com/daybrush/utils
  @version 1.0.0
  */
  var OPEN_CLOSED_CHARACTER = ["\"", "'", "\\\"", "\\'"];

  function findClosed(closedCharacter, texts, index, length) {
    for (var i = index; i < length; ++i) {
      var character = texts[i].trim();

      if (character === closedCharacter) {
        return i;
      }

      var nextIndex = i;

      if (character === "(") {
        nextIndex = findClosed(")", texts, i + 1, length);
      } else if (OPEN_CLOSED_CHARACTER.indexOf(character) > -1) {
        nextIndex = findClosed(character, texts, i + 1, length);
      }

      if (nextIndex === -1) {
        break;
      }

      i = nextIndex;
    }

    return -1;
  }

  function splitText(text, separator) {
    var regexText = "(\\s*" + (separator || ",") + "\\s*|\\(|\\)|\"|'|\\\\\"|\\\\'|\\s+)";
    var regex = new RegExp(regexText, "g");
    var texts = text.split(regex).filter(Boolean);
    var length = texts.length;
    var values = [];
    var tempValues = [];

    for (var i = 0; i < length; ++i) {
      var character = texts[i].trim();
      var nextIndex = i;

      if (character === "(") {
        nextIndex = findClosed(")", texts, i + 1, length);
      } else if (character === ")") {
        throw new Error("invalid format");
      } else if (OPEN_CLOSED_CHARACTER.indexOf(character) > -1) {
        nextIndex = findClosed(character, texts, i + 1, length);
      } else if (character === separator) {
        if (tempValues.length) {
          values.push(tempValues.join(""));
          tempValues = [];
        }

        continue;
      }

      if (nextIndex === -1) {
        nextIndex = length - 1;
      }

      tempValues.push(texts.slice(i, nextIndex + 1).join(""));
      i = nextIndex;
    }

    if (tempValues.length) {
      values.push(tempValues.join(""));
    }

    return values;
  }
  /**
  * divide text by comma.
  * @memberof Utils
  * @param {string} text - text to divide
  * @return {Array} divided texts
  * @example
  import {splitComma} from "@daybrush/utils";

  console.log(splitComma("a,b,c,d,e,f,g"));
  // ["a", "b", "c", "d", "e", "f", "g"]
  console.log(splitComma("'a,b',c,'d,e',f,g"));
  // ["'a,b'", "c", "'d,e'", "f", "g"]
  */

  function splitComma(text) {
    // divide comma(,)
    // "[^"]*"|'[^']*'
    return splitText(text, ",");
  }

  function getHash(str) {
    return stringHash(str).toString(36);
  }
  function getShadowRoot(parentElement) {
    if (parentElement && parentElement.getRootNode) {
      var rootNode = parentElement.getRootNode();

      if (rootNode.nodeType === 11) {
        return rootNode;
      }
    }

    return;
  }
  function replaceStyle(className, css, options) {
    if (options.original) {
      return css;
    }

    return css.replace(/([^};{\s}][^};{]*|^\s*){/mg, function (_, selector) {
      var trimmedSelector = selector.trim();
      return (trimmedSelector ? splitComma(trimmedSelector) : [""]).map(function (subSelector) {
        var trimmedSubSelector = subSelector.trim();

        if (trimmedSubSelector.indexOf("@") === 0) {
          return trimmedSubSelector;
        } else if (trimmedSubSelector.indexOf(":global") > -1) {
          return trimmedSubSelector.replace(/\:global/g, "");
        } else if (trimmedSubSelector.indexOf(":host") > -1) {
          return "" + trimmedSubSelector.replace(/\:host/g, "." + className);
        } else if (trimmedSubSelector) {
          return "." + className + " " + trimmedSubSelector;
        } else {
          return "." + className;
        }
      }).join(", ") + " {";
    });
  }
  function injectStyle(className, css, options, shadowRoot) {
    var style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.setAttribute("data-styled-id", className);

    if (options.nonce) {
      style.setAttribute("nonce", options.nonce);
    }

    style.innerHTML = replaceStyle(className, css, options);
    (shadowRoot || document.head || document.body).appendChild(style);
    return style;
  }

  /**
   * Create an styled object that can be defined and inserted into the css.
   * @param - css styles
   */

  function styled(css) {
    var injectClassName = "rCS" + getHash(css);
    var injectCount = 0;
    var injectElement;
    return {
      className: injectClassName,
      inject: function (el, options) {
        if (options === void 0) {
          options = {};
        }

        var shadowRoot = getShadowRoot(el);
        var firstMount = injectCount === 0;
        var styleElement;

        if (shadowRoot || firstMount) {
          styleElement = injectStyle(injectClassName, css, options, shadowRoot);
        }

        if (firstMount) {
          injectElement = styleElement;
        }

        if (!shadowRoot) {
          ++injectCount;
        }

        return {
          destroy: function () {
            if (shadowRoot) {
              el.removeChild(styleElement);
              styleElement = null;
            } else {
              if (injectCount > 0) {
                --injectCount;
              }

              if (injectCount === 0 && injectElement) {
                injectElement.parentNode.removeChild(injectElement);
                injectElement = null;
              }
            }
          }
        };
      }
    };
  }

  return styled;

})));
//# sourceMappingURL=styled.js.map
