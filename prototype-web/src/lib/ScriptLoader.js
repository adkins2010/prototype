// export const ScriptLoader = function (scriptSrc) {
//   let tag = document.createElement("script");
//   tag.type = "text/javascript";
//   tag.src = scriptSrc;
//   tag.asynch = false;
//   tag.defer = false;
//
//   // let body = document.getElementsByTagName('body')[0];
//   // body.appendChild(tag);
//   let head = document.getElementsByTagName("head")[0];
//   head.appendChild(tag);
//   return tag;
// };

export const ScriptLoader = function (scriptSrc) {
  // if (Array.isArray(scriptSrc)) {
  //   var self = this;
  //   var prom = [];
  //   scriptSrc.forEach(function (src) {
  //     prom.push(self.script(src));
  //   });
  //   return Promise.all(prom);
  // }

  return new Promise(function (resolve, reject) {
    var script = document.createElement("script"),
      head = document.getElementsByTagName("head")[0],
      resolved = false,
      errored = false;

    script.type = "text/javascript";
    script.src = scriptSrc;

    script.onload = script.onreadystatechange = function () {
      if (!resolved && (!this.readyState || this.readyState === "complete")) {
        resolved = true;
        resolve(this);
      }
    };
    script.onerror = script.onabort = function () {
      if (!errored && (!this.readyState || this.readyState === "error")) {
        errored = true;
        reject(this);
      }
    };
    head.appendChild(script);
  });
};
