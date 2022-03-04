function selectParent(parentSelector) {
  return document.querySelector(parentSelector)
}

const DOMHandler = {
  module: null,
  parent: null,
  load(module, parentSelector) {
    let parent = selectParent(parentSelector);

    this.module = module;
    this.parent = parent;
    parent.innerHTML = module; //toString()
    module.addListeners();
  },
  reload() {
    this.load(this.module, this.parent);
  },
};

export default DOMHandler;
