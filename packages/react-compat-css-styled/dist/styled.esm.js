/*
Copyright (c) Daybrush
name: react-compat-css-styled
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/css-styled.git
version: 0.2.0
*/
import { createElement, Component } from 'react-simple-compat';
import { ref } from 'framework-utils';
import cssStyled from 'css-styled';

/*
Copyright (c) 2019 Daybrush
name: react-css-styled
license: MIT
author: Daybrush
repository: https://github.com/daybrush/css-styled/tree/master/packages/react-css-styled
version: 0.2.0
*/

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

function styled(Tag, css) {
  var _a;

  var injector = cssStyled(css);
  return _a =
  /*#__PURE__*/
  function (_super) {
    __extends(Styled, _super);

    function Styled() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Styled.prototype.render = function () {
      var _a = this.props,
          _b = _a.className,
          className = _b === void 0 ? "" : _b,
          cspNonce = _a.cspNonce,
          attributes = __rest(_a, ["className", "cspNonce"]);

      var cssId = injector.className;
      return createElement(Tag, __assign({
        "ref": ref(this, "element"),
        "data-styled-id": cssId,
        "className": className + " " + cssId
      }, attributes));
    };

    Styled.prototype.componentDidMount = function () {
      this.injectResult = injector.inject(this.element, {
        nonce: this.props.cspNonce
      });
    };

    Styled.prototype.componentWillUnmount = function () {
      this.injectResult.destroy();
      this.injectResult = null;
    };

    Styled.prototype.getElement = function () {
      return this.element;
    };

    return Styled;
  }(Component), _a.injector = injector, _a;
}

export default styled;
