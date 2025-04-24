'use strict';
var pageGetProperties = function() {
  try {
    if (!window.angular || !$0) return {};
    const data = angular.element($0).scope();
    
    // 添加空值检查
    if (!data) {
      console.warn('Angular scope not found');
      return {};
    }
  const copy = Object.create(null);
  Object.getOwnPropertyNames(data).forEach(prop => {
    if (!prop.startsWith('$$')) { // 使用更现代的startsWith方法
      copy[prop] = data[prop];
    }
  });
  return copy;
  } catch (e) {
    console.error('Angular context error:', e.stack); // 添加错误堆栈
    return { error: e.message };
  }
};

chrome.devtools.panels.elements.createSidebarPane(
    'Angular Context',
    function(sidebar) {
  function updateElementProperties() {
    sidebar.setExpression('(' + pageGetProperties.toString() + ')()');
  }
  updateElementProperties();
  chrome.devtools.panels.elements.onSelectionChanged.addListener(
      updateElementProperties);
});