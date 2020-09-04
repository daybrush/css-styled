/*
Copyright (c) 2019 Daybrush
name: css-styled
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/css-styled.git
version: 1.0.0
*/
import { splitComma } from '@daybrush/utils';

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

export default styled;
//# sourceMappingURL=styled.esm.js.map
