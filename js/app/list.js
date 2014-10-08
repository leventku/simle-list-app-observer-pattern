define([
  'app/subject',
  'handlebars',
  'text!app/templates/list-item.html'
  ],
function (Subject, Handlebars, TMPL) {

"use strict";

function List() {
  var subject = new Subject(),
      items = [],
      template,
      formElement,
      addInput,
      addButton,
      itemList,
      itemCount,

  compileTemplate = function (source) {
    return Handlebars.compile(template)(source);
  },

  cache = function () {
    template = TMPL;
    formElement = document.getElementById('item-form');
    addInput = formElement.elements['add-input'];
    addButton = formElement.elements['add-button'];
    itemList = document.getElementById('items-list');
    itemCount = document.getElementById('item-count');
  },

  bindEvents = function () {
    addButton.addEventListener('click', add, false);
    itemList.addEventListener('click', remove, false);
  },

  add = function (e) {
    e.preventDefault();
    if (!addInput.value) {
      return;
    }
    items.push(addInput.value);
    subject.publish('item-added');
  },

  remove = function (e) {
    items.splice(e.target.dataset.id, 1);
    subject.publish('item-removed');
  },

  refreshCount = function () {
    itemCount.innerHTML = items.length;
  },

  render = function () {
    var tempItems = [];
    
    itemList.innerHTML = "";
    
    $.each(items, function (index, entry) {
      tempItems.push({index: index, entry:entry});
    });

    itemList.innerHTML = compileTemplate({items:tempItems});
    
    addInput.value = "";

    refreshCount();
  };

  this.init = function () {
    cache();
    bindEvents();
    subject.subscribe(render)
  };
}

return List;

});