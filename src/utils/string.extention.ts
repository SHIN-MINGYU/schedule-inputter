String.prototype.getBlankCountForGmail = function () {
  let blankCount = 0;
  for (let c = 0; c < this.length; c++) {
    if (this.charAt(c) >= "\u4E00" && this.charAt(c) <= "\u9FFF") {
      blankCount += 3;
    } else if (this.charAt(c) === ":") {
      blankCount += 1;
    } else {
      blankCount += 2;
    }
  }
  return blankCount;
};

String.prototype.addBlank = function (count: number) {
  let str = this;
  for (let c = 0; c < count; c++) {
    str = str + " ";
  }
  return str.toString();
};
