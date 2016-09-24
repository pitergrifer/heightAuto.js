/* .heightAuto() method by Bogdan Dnileichenko
 * -----------------------------------------
 * Use .heightAuto() at textarea-element for
 * make height of textarea equal to height
 * of the text within it.
 * 
 * Usage:
 * element.heightAuto();
 */

// -- Polyfill for get css-style -- //
function getStyle(elem) {
  return window.getComputedStyle ? getComputedStyle(elem, "") : elem.currentStyle;
}

// -- Add new method -- //
Element.prototype.heightAuto = function() {
  if (this.tagName === "TEXTAREA") { // set height to "auto", if we work with <textarea> 
    // some vars
    var properties, rowHeight, rows;
    
    // first of all, we need remove native scrollbar
    this.style.overflowY = "hidden";
    
    // collapse textarea (almost)
    this.style.height = "1px";
    
    // set number of rows to "1"
    this.setAttribute("rows", "1");
    
    // create object with info about some properties
    properties = {
      boxSizing: "content-box",
      borderWidthTop: 0,
      borderWidthBottom: 0,
      paddingTop: 0,
      paddingBottom: 0
    };
    
    // function, which detect paddings size
    function detectProperties () {
      // get value of box-sizing from... 
      if (this.style.boxSizing.length !== 0) { // ... "style" attribute
        properties.boxSizing = this.style.boxSizing;
      } else { // ... css-styles
        properties.boxSizing = getStyle(this).boxSizing;
      }
      
      // get value of borders width
      if ((this.style.border.length !== 0) || (this.style.borderWidth.length !== 0)) {
        properties.borderWidthTop = properties.borderWidthBottom = parseFloat((this.style.border) || (this.style.borderWidth));
      } else {
        properties.borderWidthTop = parseFloat(getStyle(this).borderTopWidth);
        properties.borderWidthBottom = parseFloat(getStyle(this).borderBottomWidth);
      }
      
      if (this.style.borderTopWidth.length !== 0) {
        properties.borderWidthTop = parseFloat(this.style.borderTopWidth);
      } else {
        properties.borderWidthTop = parseFloat(getStyle(this).borderTopWidth);
      }
      
      if (this.style.borderBottomWidth.length !== 0) {
        properties.borderWidthBottom = parseFloat(this.style.borderBottomWidth);
      } else {
        properties.borderWidthBottom = parseFloat(getStyle(this).borderBottomWidth);
      }
      
      // get value of paddings from...
      if (this.style.padding.length !== 0) { // ... "style" attribute
        properties.paddingTop = properties.paddingBottom = parseFloat(this.style.padding);
      } else { // ... css-styles
        properties.paddingTop = parseFloat(getStyle(this).paddingTop);
        properties.paddingBottom = parseFloat(getStyle(this).paddingBottom);
      }
      
      // get value of paddings from...
      if (this.style.paddingTop.length !== 0) { // ... "style" attribute
        properties.paddingTop = parseFloat(this.style.paddingTop);
      } else { // ... css-styles
        properties.paddingTop = parseFloat(getStyle(this).paddingTop);
      }
      
      // get value of paddings from...
      if (this.style.paddingBottom.length !== 0) { // ... "style" attribute
        properties.paddingBottom = parseFloat(this.style.paddingBottom);
      } else { // ... css-styles
        properties.paddingBottom = parseFloat(getStyle(this).paddingBottom);
      }
    }
    
    // call prev function with "this" 
    detectProperties.call(this);
    
    // calculate single row height and number of rows
    if (properties.boxSizing === "content-box") {
      rowHeight = this.clientHeight - properties.paddingTop - properties.paddingBottom;
      rows = (this.scrollHeight - properties.paddingTop - properties.paddingBottom) / rowHeight;
    } else if (properties.boxSizing === "border-box") {
      rowHeight = this.clientHeight + properties.borderWidthTop + properties.borderWidthBottom;
      rows = (this.scrollHeight + properties.borderWidthTop + properties.borderWidthBottom) / rowHeight;
    } else if (properties.boxSizing === "padding-box") {
      rowHeight = this.clientHeight;
      rows = this.scrollHeight / rowHeight;
    }
    
    // calculate and set new height to textarea
    this.style.height = rows * rowHeight + "px";
    
    // remove attribute "rows"
    this.removeAttribute("rows");
  } else { // if element is not <texarea>, throw messege in to console and return void 
    console.log("Use method \"autoSize\" only with textarea blocks.");
    return;
  }
}

// -- Usage (example) -- //
document.getElementsByTagName("textarea")[0].heightAuto();