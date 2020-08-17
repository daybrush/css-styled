/*
Copyright (c) 2019 Daybrush
name: css-styled
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/css-styled.git
version: 0.2.2
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
function injectStyle(className, css, options, shadowRoot) {
  var style = document.createElement("style");
  style.setAttribute("type", "text/css");
  style.setAttribute("data-styled-id", className);

  if (options.nonce) {
    style.setAttribute("nonce", options.nonce);
  }

  var styleCSS = css;

  if (!options.original) {
    styleCSS = css.replace(/([^}{]*){/mg, function (all, selector) {
      return splitComma(selector).map(function (subSelector) {
        if (subSelector.indexOf(":global") > -1) {
          return subSelector.replace(/\:global/g, "");
        } else if (subSelector.indexOf(":host") > -1) {
          return "" + subSelector.replace(/\:host/g, "." + className);
        }

        return "." + className + " " + subSelector;
      }).join(", ") + "{";
    });
  }

  style.innerHTML = styleCSS;
  (shadowRoot || document.head || document.body).appendChild(style);
  return style;
}

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
