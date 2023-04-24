interface String {
  _(index: any, string?: any): string;
  $fit(): string;
  $nowrap(): string;
  $nospace(): string;
  $num(): number | null;
  $ary(separator: string | RegExp, limit?: number | undefined): string[];
  $obj(): object | null;
  $tag(): string | null;
  $tags(): string[];
  $url(): string | null;
  $urls(): string[];
  urls_(): string;
  $email(): string | null;
  $emails(): string[];
  emails_(): string;
  $phone(): string | null;
  $phones(): string[];
  phones_(): string;
  $line(): string | null;
  $lines(): string[];
  $fb(): string | null;
  $fbs(): string[];
  fitHtmlEntity(): string;
  addLinks(): string;
  rmLinks(): string;

  $$(fit?: string): boolean;
  $$empty(): boolean;
  $$obj(): boolean;
  $$email(): boolean;
  $$html(): boolean;
};

function $key(length: number) {
  var str = "";
  for (let i = 0; i < length; i++) {
    var char: string = "abcdefghijklmnopurstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    str += char.charAt(Math.floor(Math.random() * char.length));
  };
  return str;
};

(function (_this: any) {
  let regexpTag = /(#|＃)[A-Za-z0-9\u4e00-\u9fa5\_]{1,}/g;
  let regexpUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  let regexpEmail = /([a-zA-Z0-9_\.-]+)@([\da-zA_Z\.-]+)\.([a-zA-Z\.]{2,6})/g;
  let regexpHtml = /^\<(script|a|p|b|h1|h2|h3|h4|h5|h6|div|li)([A-Za-z0-9 -_="'@:/]{0,})\>/gi;
  let regexpLine = /https:\/\/(line.me\/ti\/p|lin.ee)\/(%40|@)?[0-9A-Za-z\.\-\_]{1,}/g;
  let regexpPhone = /\(?\+?(0|886)(-|\))?9[0-9]{2}-?[0-9]{3}-?[0-9]{3}/g;
  let regexpFb = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/g; const fitMessager: RegExp = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/g;
  
  _this._ = function (index: any, string?: any) {
    var _this = String(this);
    if (typeof string === "undefined") {
      string = String(index);
      index = undefined;
    };
    if (index) return _this.substring(0, index) + string + _this.substring(index);
    return _this + string;
  };

  _this.$fit = function () {
    var _this = String(this);
    return _this.replace(/^\s*|\s$/g, "");
  };

  _this.$nowrap = function () {
    var _this = String(this);
    return _this.replace(/\n*/g, "");
  };

  _this.$nospace = function () {
    var _this = String(this);
    return _this.replace(/\s*/g, "");
  };

  _this.$num = function () {
    var _this = Number(this);
    return Number.isNaN(_this) ? null : _this;
  };

  _this.$ary = function (separator: string | RegExp, limit?: number | undefined) {
    var _this = String(this);
    return _this.split(separator, limit);
  };

  _this.$obj = function () {
    var _this = String(this);
    return _this.$$obj() ? JSON.parse(_this) : null;
  };

  _this.$tag = function () {
    var _this = String(this).$fit();
    var length = _this.$tags().length;
    if (!length) return null;
    return _this.$tags()[0];
  };

  _this.$tags = function () {
    var _this = String(this).$fit();
    var list = _this.match(regexpTag);
    var map: any = {};
    if (list) list.forEach((e: string) => map[e] = 1);
    return list ? Object.keys(map) : [];
  };

  _this.$url = function () {
    var _this = String(this).$fit();
    var length = _this.$urls().length;
    if (!length) return null;
    return _this.$urls()[0];
  };

  _this.$urls = function () {
    var _this = String(this).$fit();
    var list = _this.match(regexpUrl);
    var map: any = {};
    if (list) list.forEach((e: string) => map[e] = 1);
    return list ? list : [];
  };

  _this.urls_ = function () {
    var _this = String(this).$fit();
    _this.$urls().forEach((e: string) => {
      var url = e.replace(/\?/, '\\?').replace(/\=/, '\\=').replace(/\)/g, '').replace(/\(/g, '');
      var regexp = new RegExp(url, "gi");
      _this = _this.replace(regexp, "");
    });
    return _this.replace(/\n\s*\n*\s*\n+/g, "\n\n").$fit();
  };

  _this.$email = function () {
    var _this = String(this).$fit();
    var length = _this.$emails().length;
    if (!length) return null;
    return _this.$emails()[0];
  };

  _this.$emails = function () {
    var _this = String(this).$fit();
    var list = _this.match(regexpEmail);
    var map: any = {};

    if (list) list.forEach((e: string) => map[e] = 1);

    return list ? list : [];
  };

  _this.emails_ = function () {
    var _this = String(this).$fit();
    _this.$emails().forEach((e: string) => {
      var regexp = new RegExp(e, "gi");
      _this = _this.replace(regexp, "");
    });
    return _this.replace(/\n\s*\n*\s*\n+/g, "\n\n").$fit();
  };

  _this.$phone = function () {
    var _this = String(this).$fit();
    var length = _this.$phones().length;
    if (!length) return null;
    return _this.$phones()[0];
  };

  _this.$phones = function () {
    var _this = String(this).$fit();
    var list = _this.match(regexpPhone);
    var map: any = {};
    if (list) list.forEach((e: string) => map[e] = 1);
    return list ? list : [];
  };

  _this.phones_ = function () {
    var _this = String(this).$fit();
    _this.$phones().forEach((e: string) => {
      var regexp = new RegExp(e, "gi");
      _this = _this.replace(regexp, "");
    });
    return _this.replace(/\n\s*\n*\s*\n+/g, "\n\n").$fit();
  };

  _this.$line = function () {
    var _this = String(this).$fit();
    var length = _this.$lines().length;
    if (!length) return null;
    return _this.$lines()[0];
  };

  _this.$lines = function () {
    var _this = String(this).$fit();
    var list = _this.match(regexpLine);
    var map: any = {};
    if (list) list.forEach((e: string) => map[e] = 1);
    return list ? list : [];
  };

  _this.$fb = function () {
    var _this = String(this).$fit();
    var length = _this.$fbs().length;
    if (!length) return null;
    return _this.$fbs()[0];
  };

  _this.$fbs = function () {
    var _this = String(this).$fit();
    var list = _this.match(regexpFb);
    var map: any = {};

    if (list) list.forEach((e: string) => map[e] = 1);

    return list ? list : [];
  };

  _this.fitHtmlEntity = function () {
    var _this = String(this);
    [
      { key: "\'", val: "&#39;" },
      { key: "\"", val: "&quot;" },
      { key: "\>", val: "&gt;" },
      { key: "\<", val: "&lt;" },
    ].forEach((e: any) => {
      let reg = new RegExp(e.key, "gi");
      _this = _this.replace(reg, e.val);
    });
    return _this;
  };

  _this.addLinks = function () {
    var _this = String(this).$fit();
    var map: any = {};
    _this.$urls().forEach((e: string) => {
      var key = $key(50);
      var url = e.replace(/\?/, '\\?').replace(/\=/, '\\=').replace(/\)/g, '').replace(/\(/g, '');
      var regexp = new RegExp(url, "gi");
      map[key] = `<a href="${e}" target="_blank">前往連結</a>`;
      _this = _this.replace(regexp, key);
    });
    _this.$emails().forEach((e: string) => {
      var key = $key(50);
      var regexp = new RegExp(e, "gi");
      map[key] = `<a href="mailto:${e}" target="_blank">開啟信箱</a>`;
      _this = _this.replace(regexp, key);
    });
    _this.$phones().forEach((e: string) => {
      var key = $key(50);
      var regexp = new RegExp(e, "gi");
      map[key] = `<a href="tel:${e}" target="_blank">撥打電話</a>`;
      _this = _this.replace(regexp, key);
    });
    Object.keys(map).forEach((key: string) => {
      let regexp = new RegExp(key, "gi");
      _this = _this.replace(regexp, map[key]);
    });
    return _this;
  };

  _this.rmLinks = function () {
    var _this = String(this).$fit();
    return _this.urls_().emails_().phones_();
  };

  _this.$$ = function (fit?: string) {
    var _this = String(this).$fit();
    switch (fit) {
      case null:
      case undefined: return _this.length > 0;
      default: return _this === fit;
    };
  };

  _this.$$empty = function () {
    var _this = String(this).$fit();
    return _this.length > 0;
  };

  _this.$$obj = function () {
    var _this = String(this).$fit();
    try {
      JSON.parse(_this);
    } catch (err) {
      return false;
    };
    return true;
  };

  _this.$$email = function () {
    var _this = String(this).$fit();
    return regexpEmail.test(_this);
  };

  _this.$$html = function () {
    var _this = String(this).$fit();
    return regexpHtml.test(_this);
  };
}(String.prototype));