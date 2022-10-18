export const throttle = (fn, wait = 100, options = {}) => {
  var timer = null;
  var currentTime = 0, lastTime = 0;

  return (() => {
    currentTime = +new Date();
    if (currentTime > lastTime + wait) {
      lastTime = currentTime;
      fn();
    } else {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      } else {
        timer = setTimeout(function () {
          lastTime = currentTime;
          fn()
        }, wait);
      }
    }
  })();
}

export const expCharRegx = /[()'"|\[\]><]/g

export const encodeCharRegx = /[#%]/g


// 在 head 最后动态插入 css cdn 链接, 仅作为测试使用
export const insertCSSLink = source => {
  document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" type="text/css" href="${source}" />`)
}
export const disableAllDescendantsDraggable = (target) => target.querySelectorAll('*').forEach(descendant => descendant.setAttribute('draggable', 'false'))

export const addTraits = (component = {}, traits = []) => {
  traits.forEach(trait => {
    !component.getTrait(trait) && component.addTrait({ type: trait, name: trait });
  });
}
export const disableChildrenDraggable = disableAllDescendantsDraggable

