interface Number {
  $str(): string;
  $y(): number;
  $M(isStr?: boolean): string | number;
  $D(isStr?: boolean): string | number;
  $d(isStr?: boolean): string | number;
  $h(isStr?: boolean): string | number;
  $m(isStr?: boolean): string | number;
  $s(isStr?: boolean): string | number;
  $gone(): string;
  $carry(): string;
  $color(): string;
};

(function (_this: any) {
  _this.$str = function () {
    return String(this);
  };

  _this.$y = function () {
    let _this = Number(this);
    let date = new Date(_this * 1000);
    return date.getFullYear();
  };
  
  _this.$M = function (isStr: boolean) {
    let _this = Number(this);
    let date = new Date(_this * 1000);
    let num = date.getMonth() + 1;
    if (isStr) return num < 10 ? `0${num}` : num.$str();
    return num;
  };
  
  _this.$D = function (isStr: boolean) {
    let _this = Number(this);
    let date = new Date(_this * 1000);
    let num = date.getDate();
    if (isStr) return num < 10 ? `0${num}` : num.$str();
    return num;
  };
  
  _this.$d = function (isStr: boolean) {
    let _this = Number(this);
    let date = new Date(_this * 1000);
    let num = date.getDate();
    if (isStr) switch (num) {
      case 1: return "星期一";
      case 2: return "星期二";
      case 3: return "星期三";
      case 4: return "星期四";
      case 5: return "星期五";
      case 6: return "星期六";
      default: return "星期日";
    }
    return num;
  };
  
  _this.$h = function (isStr: boolean) {
    let _this = Number(this);
    let date = new Date(_this * 1000);
    let num = date.getHours();
    if (isStr) return num < 10 ? `0${num}` : num.$str();
    return num;
  };
  
  _this.$m = function (isStr: boolean) {
    let _this = Number(this);
    let date = new Date(_this * 1000);
    let num = date.getMinutes();
    if (isStr) return num < 10 ? `0${num}` : num.$str();
    return num;
  };
  
  _this.$s = function (isStr: boolean) {
    let _this = Number(this);
    let date = new Date(_this * 1000);
    let num = date.getSeconds();
    if (isStr) return num < 10 ? `0${num}` : num.$str();
    return num;
  };

  _this.$gone = function () {
    let _this = Number(this);
    let now = Math.floor(Date.now() / 1000);
    let second = now - _this;
    let date = new Date(_this * 1000);
    switch (true) {
      case (second >= 86400 * 365): return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日-${date.getHours()}:${date.getMinutes()}`;
      case (second >= 86400 * 30): return `${Math.floor(second / (86400 * 30))}月前`;
      case (second >= 86400 * 7): return `${Math.floor(second / (86400 * 7))}週前`;
      case (second >= 86400): return `${Math.floor(second / 86400)}天前`;
      case (second >= 3600): return `${Math.floor(second / 3600)}小時前`;
      case (second >= 60): return `${Math.floor(second / 60)}分鐘前`;
      default: return `${second}秒前`;
    };
  };

  _this.$carry = function () {
    let _this = String(this);
    let length = _this.length;
    switch (true) {
      case (length >= 10): return _this._(length - 3, ",")._(length - 6, ",")._(length - 9, ",");
      case (length >= 7): return _this._(length - 3, ",")._(length - 6, ",");
      case (length >= 4): return _this._(length - 3, ",");
      default: return _this;
    };
  };

  _this.$color = function () {
    let _this = String(this);
    let  r = _this.slice(_this.length - 6, _this.length - 4).replace(/8/g, "a").replace(/9/g, "b");
    let g = _this.slice(_this.length - 4, _this.length - 2).replace(/8/g, "a").replace(/9/g, "b");
    let b = _this.slice(_this.length - 2, _this.length).replace(/8/g, "a").replace(/9/g, "b");
    return `#${r}${g}${b}`;
  };

}(Number.prototype))