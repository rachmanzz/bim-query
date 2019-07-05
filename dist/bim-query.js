"use strict";

var _this = void 0;

var axios = require('axios');

var bim = require('bim');

var bimquery = function bimquery() {
  _this.query = {};
  _this.baseurl = null;
  _this.auth = null;
};

var opt = [{
  q: '<',
  al: 's'
}, {
  q: '<=',
  al: 'sq'
}, {
  q: '>',
  al: 'b'
}, {
  q: '>=',
  al: 'bq'
}, {
  q: '!=',
  al: 'not'
}];

var filterOpt = function filterOpt(op) {
  var raw = opt.filter(function (key) {
    return key.q === op;
  });
  return bim.size(raw) === 0 ? null : raw[0].al;
};

bimquery.prototype.where = function (key, arg, val) {
  if (bim.isArray(key)) {
    var count = key.length;

    for (var i = 0; i < count; i++) {
      var child = key[i];

      if (bim.isArray(child)) {
        var childSize = bim.size(child);

        if (childSize >= 2 && child <= 3) {
          if (bim.iString(child[0])) {
            childSize === 3 ? _this.where(child[0], child[1], child[2]) : _this.where(child[0], child[1]);
          }
        }
      }
    }
  } else {
    if (bim.iString(key) && bim.isNotUndef(arg)) {
      if (bim.isNotUndef(_this.query.where)) {
        if (bim.isArray(_this.query.where)) {
          if (bim.isNumber(arg)) _this.query.where.push(bim.isUndef(val) ? key + '|!' + arg : key + '|!' + val + '|' + filterOpt(arg));else _this.query.where.push(bim.isUndef(val) ? key + '|' + arg : key + '|' + val + '|' + filterOpt(arg));
        } else {
          var arr = [];
          arr.push(_this.query.where);
          _this.query.where = arr;
          if (bim.isNumber(arg)) _this.query.where.push(bim.isUndef(val) ? key + '|!' + arg : key + '|!' + val + '|' + filterOpt(arg));else _this.query.where.push(bim.isUndef(val) ? key + '|' + arg : key + '|' + val + '|' + filterOpt(arg));
        }
      } else {
        if (bim.isNumber(arg)) _this.query.where = bim.isUndef(val) ? key + '|!' + arg : key + '|!' + val + '|' + filterOpt(arg);else _this.query.where = bim.isUndef(val) ? key + '|' + arg : key + '|' + val + '|' + filterOpt(arg);
      }
    }
  }

  return _this;
};

bimquery.prototype.orwhere = function (key, arg, val) {
  if (bim.isArray(key)) {
    var count = key.length;

    for (var i = 0; i < count; i++) {
      var child = key[i];

      if (bim.isArray(child)) {
        var childSize = bim.size(child);

        if (childSize >= 2 && child <= 3) {
          if (bim.iString(child[0])) {
            childSize === 3 ? _this.where(child[0], child[1], child[2]) : _this.where(child[0], child[1]);
          }
        }
      }
    }
  } else {
    if (bim.iString(key) && bim.isNotUndef(arg)) {
      if (bim.isNotUndef(_this.query.orwhere)) {
        if (bim.isArray(_this.query.orwhere)) {
          if (bim.isNumber(arg)) _this.query.orwhere.push(bim.isUndef(val) ? key + '|!' + arg : key + '|!' + val + '|' + filterOpt(arg));else _this.query.orwhere.push(bim.isUndef(val) ? key + '|' + arg : key + '|' + val + '|' + filterOpt(arg));
        } else {
          var arr = [];
          arr.push(_this.query.orwhere);
          _this.query.orwhere = arr;
          if (bim.isNumber(arg)) _this.query.orwhere.push(bim.isUndef(val) ? key + '|!' + arg : key + '|!' + val + '|' + filterOpt(arg));else _this.query.orwhere.push(bim.isUndef(val) ? key + '|' + arg : key + '|' + val + '|' + filterOpt(arg));
        }
      } else {
        if (bim.isNumber(arg)) _this.query.orwhere = bim.isUndef(val) ? key + '|!' + arg : key + '|!' + val + '|' + filterOpt(arg);else _this.query.orwhere = bim.isUndef(val) ? key + '|' + arg : key + '|' + val + '|' + filterOpt(arg);
      }
    }
  }

  return _this;
};

bimquery.prototype.between = function (key, val, val1) {
  if (bim.isArray(key)) {
    var count = key.length;

    for (var i = 0; i < count; i++) {
      var child = key[i];

      if (bim.isArray(child)) {
        if (bim.size(child) === 3) _this.between(child[0], child[1], child[2]);
      }
    }
  } else {
    if (bim.iString(key) && bim.isNumber(val) && bim.isNumber(val1)) {
      if (bim.isNotUndef(_this.query.between)) {
        if (bim.isArray(_this.query.between)) _this.query.between.push(key + '|' + val + '-' + val1);else {
          var arr = [];
          arr.push(_this.query.between);
          _this.query.between = arr;

          _this.query.between.push(key + '|' + val + '-' + val1);
        }
      } else {
        _this.query.between = key + '|' + val + '-' + val1;
      }
    }
  }

  return _this;
};

bimquery.prototype.groupby = function (val) {
  _this.query.groupby = val;
  return _this;
};

bimquery.prototype.offset = function (val) {
  _this.query.offset = val;
  return _this;
};

bimquery.prototype.limit = function (val) {
  _this.query.limit = val;
  return _this;
};

bimquery.prototype.orderby = function (key, val) {
  if (bim.isNotUndef(_this.query.orderby)) {
    if (bim.isArray(_this.query.orderby)) {
      _this.query.orderby.push(key + '|' + val);
    } else {
      var arr = [];
      arr.push(_this.query.orderby);
      _this.query.orderby = arr;

      _this.query.orderby.push(key + '|' + val);
    }
  } else {
    _this.query.orderby = key + '|' + val;
  }

  return _this;
};

bimquery.prototype["with"] = function (key) {
  if (bim.isNotUndef(key)) {
    if (bim.isArray(_this.query["with"])) _this.query["with"].push(key);else {
      var arr = [];
      arr.push(_this.query["with"]);
      _this.query["with"] = arr;

      _this.query["with"].push(key);
    }
  } else _this.query["with"] = key;

  return _this;
};

bimquery.prototype.paginate = function (key, val) {
  if (bim.isNotUndef(val)) _this.query.paginate = key + '|' + val;else _this.query.paginate = key;
  return _this;
};

bimquery.prototype.page = function (key, val) {
  if (bim.isNotUndef(val)) _this.query.paginate = key + '|' + val;else _this.query.paginate = key;
  return _this;
};

bimquery.prototype.first = function () {
  _this.query.first = true;
  return _this;
};

bimquery.prototype.generate = function () {
  return _this.query;
};

bimquery.prototype.setUrl = function (url) {
  _this.baseurl = url;
};

bimquery.prototype.release = function () {
  _this.query = {};
};

bimquery.prototype.auth = function (auth) {
  _this.auth = 'Bearer ' + auth;
};

bimquery.prototype.get = function (url, opt) {
  var toUrl = _this.baseurl !== null ? _this.baseurl + url : url;
  var baseOpt = bim.isObj(opt) ? opt : {};

  if (_this.auth !== null) {
    baseOpt.headers = {
      Authorization: _this.auth
    };
  }

  if (bim.isObj(baseOpt.params)) {
    baseOpt.params = bim.merge(baseOpt.params, _this.query);
  }

  return axios.get(toUrl, baseOpt);
};

bimquery.prototype.post = function (url, data, opt) {
  var toUrl = _this.baseurl !== null ? _this.baseurl + url : url;
  var baseOpt = bim.isObj(opt) ? opt : {};

  if (_this.auth !== null) {
    baseOpt.headers = {
      Authorization: _this.auth
    };
  }

  if (bim.isObj(baseOpt.params)) {
    baseOpt.params = bim.merge(baseOpt.params, _this.query);
  }

  return axios.post(toUrl, bim.isNotUndef(data) ? data : {}, baseOpt);
};

bimquery.prototype.put = function (url, data, opt) {
  var toUrl = _this.baseurl !== null ? _this.baseurl + url : url;
  var baseOpt = bim.isObj(opt) ? opt : {};

  if (_this.auth !== null) {
    baseOpt.headers = {
      Authorization: _this.auth
    };
  }

  if (bim.isObj(baseOpt.params)) {
    baseOpt.params = bim.merge(baseOpt.params, _this.query);
  }

  return axios.put(toUrl, bim.isNotUndef(data) ? data : {}, baseOpt);
};

bimquery.prototype["delete"] = function (url, opt) {
  var toUrl = _this.baseurl !== null ? _this.baseurl + url : url;
  var baseOpt = bim.isObj(opt) ? opt : {};

  if (_this.auth !== null) {
    baseOpt.headers = {
      Authorization: _this.auth
    };
  }

  if (bim.isObj(baseOpt.params)) {
    baseOpt.params = bim.merge(baseOpt.params, _this.query);
  }

  return axios["delete"](toUrl, baseOpt);
};

module.exports = function () {
  return new bimquery();
};