"use strict";

var axios = require('axios');

var bim = require('bim');

var bimquery = function bimquery() {
  this.query = {};
  this.baseurl = null;
  this.auth = null;
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
            childSize === 3 ? this.where(child[0], child[1], child[2]) : this.where(child[0], child[1]);
          }
        }
      }
    }
  } else {
    if (bim.iString(key) && bim.isNotUndef(arg)) {
      if (bim.isNotUndef(this.query.where)) {
        if (bim.isArray(this.query.where)) {
          if (bim.isNumber(arg)) this.query.where.push(bim.isUndef(val) ? key + '|!' + arg : key + '|!' + val + '|' + filterOpt(arg));else this.query.where.push(bim.isUndef(val) ? key + '|' + arg : key + '|' + val + '|' + filterOpt(arg));
        } else {
          var arr = [];
          arr.push(this.query.where);
          this.query.where = arr;
          if (bim.isNumber(arg)) this.query.where.push(bim.isUndef(val) ? key + '|!' + arg : key + '|!' + val + '|' + filterOpt(arg));else this.query.where.push(bim.isUndef(val) ? key + '|' + arg : key + '|' + val + '|' + filterOpt(arg));
        }
      } else {
        if (bim.isNumber(arg)) this.query.where = bim.isUndef(val) ? key + '|!' + arg : key + '|!' + val + '|' + filterOpt(arg);else this.query.where = bim.isUndef(val) ? key + '|' + arg : key + '|' + val + '|' + filterOpt(arg);
      }
    }
  }

  return this;
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
            childSize === 3 ? this.where(child[0], child[1], child[2]) : this.where(child[0], child[1]);
          }
        }
      }
    }
  } else {
    if (bim.iString(key) && bim.isNotUndef(arg)) {
      if (bim.isNotUndef(this.query.orwhere)) {
        if (bim.isArray(this.query.orwhere)) {
          if (bim.isNumber(arg)) this.query.orwhere.push(bim.isUndef(val) ? key + '|!' + arg : key + '|!' + val + '|' + filterOpt(arg));else this.query.orwhere.push(bim.isUndef(val) ? key + '|' + arg : key + '|' + val + '|' + filterOpt(arg));
        } else {
          var arr = [];
          arr.push(this.query.orwhere);
          this.query.orwhere = arr;
          if (bim.isNumber(arg)) this.query.orwhere.push(bim.isUndef(val) ? key + '|!' + arg : key + '|!' + val + '|' + filterOpt(arg));else this.query.orwhere.push(bim.isUndef(val) ? key + '|' + arg : key + '|' + val + '|' + filterOpt(arg));
        }
      } else {
        if (bim.isNumber(arg)) this.query.orwhere = bim.isUndef(val) ? key + '|!' + arg : key + '|!' + val + '|' + filterOpt(arg);else this.query.orwhere = bim.isUndef(val) ? key + '|' + arg : key + '|' + val + '|' + filterOpt(arg);
      }
    }
  }

  return this;
};

bimquery.prototype.between = function (key, val, val1) {
  if (bim.isArray(key)) {
    var count = key.length;

    for (var i = 0; i < count; i++) {
      var child = key[i];

      if (bim.isArray(child)) {
        if (bim.size(child) === 3) this.between(child[0], child[1], child[2]);
      }
    }
  } else {
    if (bim.iString(key) && bim.isNumber(val) && bim.isNumber(val1)) {
      if (bim.isNotUndef(this.query.between)) {
        if (bim.isArray(this.query.between)) this.query.between.push(key + '|' + val + '-' + val1);else {
          var arr = [];
          arr.push(this.query.between);
          this.query.between = arr;
          this.query.between.push(key + '|' + val + '-' + val1);
        }
      } else {
        this.query.between = key + '|' + val + '-' + val1;
      }
    }
  }

  return this;
};

bimquery.prototype.groupby = function (val) {
  this.query.groupby = val;
  return this;
};

bimquery.prototype.offset = function (val) {
  this.query.offset = val;
  return this;
};

bimquery.prototype.limit = function (val) {
  this.query.limit = val;
  return this;
};

bimquery.prototype.orderby = function (key, val) {
  if (bim.isNotUndef(this.query.orderby)) {
    if (bim.isArray(this.query.orderby)) {
      this.query.orderby.push(key + '|' + val);
    } else {
      var arr = [];
      arr.push(this.query.orderby);
      this.query.orderby = arr;
      this.query.orderby.push(key + '|' + val);
    }
  } else {
    this.query.orderby = key + '|' + val;
  }

  return this;
};

bimquery.prototype["with"] = function (key) {
  if (bim.isNotUndef(key)) {
    if (bim.isArray(this.query["with"])) this.query["with"].push(key);else {
      var arr = [];
      arr.push(this.query["with"]);
      this.query["with"] = arr;
      this.query["with"].push(key);
    }
  } else this.query["with"] = key;

  return this;
};

bimquery.prototype.paginate = function (key, val) {
  if (bim.isNotUndef(val)) this.query.paginate = key + '|' + val;else this.query.paginate = key;
  return this;
};

bimquery.prototype.page = function (key, val) {
  if (bim.isNotUndef(val)) this.query.paginate = key + '|' + val;else this.query.paginate = key;
  return this;
};

bimquery.prototype.first = function () {
  this.query.first = true;
  return this;
};

bimquery.prototype.generate = function () {
  return this.query;
};

bimquery.prototype.setUrl = function (url) {
  this.baseurl = url;
  return this;
};

bimquery.prototype.release = function () {
  this.query = {};
  return this;
};

bimquery.prototype.auth = function (auth) {
  this.auth = 'Bearer ' + auth;
  return this;
};

bimquery.prototype.get = function (url, opt) {
  var toUrl = this.baseurl !== null ? this.baseurl + url : url;
  var baseOpt = bim.isObj(opt) ? opt : {};

  if (this.auth !== null) {
    baseOpt.headers = {
      Authorization: this.auth
    };
  }

  if (bim.isObj(baseOpt.params)) {
    baseOpt.params = bim.merge(baseOpt.params, this.query);
  }

  return axios.get(toUrl, baseOpt);
};

bimquery.prototype.post = function (url, data, opt) {
  var toUrl = this.baseurl !== null ? this.baseurl + url : url;
  var baseOpt = bim.isObj(opt) ? opt : {};

  if (this.auth !== null) {
    baseOpt.headers = {
      Authorization: this.auth
    };
  }

  if (bim.isObj(baseOpt.params)) {
    baseOpt.params = bim.merge(baseOpt.params, this.query);
  }

  return axios.post(toUrl, bim.isNotUndef(data) ? data : {}, baseOpt);
};

bimquery.prototype.put = function (url, data, opt) {
  var toUrl = this.baseurl !== null ? this.baseurl + url : url;
  var baseOpt = bim.isObj(opt) ? opt : {};

  if (this.auth !== null) {
    baseOpt.headers = {
      Authorization: this.auth
    };
  }

  if (bim.isObj(baseOpt.params)) {
    baseOpt.params = bim.merge(baseOpt.params, this.query);
  }

  return axios.put(toUrl, bim.isNotUndef(data) ? data : {}, baseOpt);
};

bimquery.prototype["delete"] = function (url, opt) {
  var toUrl = this.baseurl !== null ? this.baseurl + url : url;
  var baseOpt = bim.isObj(opt) ? opt : {};

  if (this.auth !== null) {
    baseOpt.headers = {
      Authorization: this.auth
    };
  }

  if (bim.isObj(baseOpt.params)) {
    baseOpt.params = bim.merge(baseOpt.params, this.query);
  }

  return axios["delete"](toUrl, baseOpt);
};

module.exports = new bimquery();