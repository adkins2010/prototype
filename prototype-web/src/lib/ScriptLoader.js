export const ScriptLoader = (
  function(scriptSrc) {
    let tag = document.createElement("script");
    tag.type = "text/javascript";
    tag.src = scriptSrc;
    tag.asynch = true;
    tag.defer = true;

    let body = document.getElementsByTagName('body')[0];
    body.appendChild(tag);
    return tag
  }
)(window);

