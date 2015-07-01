<br>  
<br>  
<p align="center">
<img src="logo.png">  
</p>
<br>  
<br>  
<br>  


# el
Light and powerful DOM manipulation  
[![GitHub version](https://badge.fury.io/gh/samueleaton%2Fel.svg)](http://badge.fury.io/gh/samueleaton%2Fel) <img src="https://img.shields.io/badge/license-MIT-blue.svg">


####What the el is el?

It's a way to get up in the DOM's personal space, work with id's, classes, remove/append elements, etc. 
The "legacy" library is backwards compatible with old browsers.

<br> 
<br>

##Docs   

###Getting Elements

Get an element by it's id, or get mutliple elements by their class or tag name:   
- By id: `el('#id_here')`
- By class name: `el('.class_here')`
- By tag name: `el('tag_name_here')` (e.g. `el('div')`)    

You can specify how many elemnts to get when selecting by class or tag:  
Doing `el('.class_name', 1)` will return an array containing the first element with that class name. Same goes for tag name.

<br>  

###Creating Elements
You can create elements by using a plus sign before the element type or just using the create method:  
`el('+div')` 

You can create multiple elements at once by passing an integer for the second parameter:  
`el('+div', 3)`  

You can create an element and define an id at the same time:  
`el('+div#superDiv')`  

*advanced example*
```javascript
el("+div").append( el("+p",3).text("i'm a p") );
```
will produce
```html
<div>
  <p>i'm a p</p>
  <p>i'm a p</p>
  <p>i'm a p</p>
</div>
```
<br>
###Working with classes  
#####Add class `.addClass(string)`
```javascript
el('#myElement').addClass("myClass")
```  
If you got multiple elements by their class or tag name, this will be applied to all of those elements.

#####Remove class `.rmClass(string)`
```javascript
el('#myElement').rmClass("myClass")
```  
If you got multiple elements by their class or tag name, this will be applied to all of those elements.

#####Check class `.hasClass(string)` or `.hasClass(string, string)`  
For single elements, pass just one parameter (the class name). Returns `bool`
```javascript
el('#myElement').hasClass("someClass")  //=> true or false
```  
For an array of elements, pass 2 parameters (the class name and criteria).   
**Criteria:**
- `"all"`(default) - returns true if *ALL* elements in the array have the class, otherwise it returns false  
- `"any"` - returns true if *ANY* elements in the array have the class, otherwise it returns false  
```javascript
el('.myElements').hasClass("someClass", "all")  //=> true or false
``` 

<br>

###Get / Set Attributes

#####Read Attribute
*soon*

#####Set Attribute: `.attr('attribute','value')`

<br>

###Remove / Append Elements

#####Remove element(s) from the DOM `rm()`
```javascript
el('#myElement').rm()
```  
If you got multiple elements by their class or tag name, they will all be removed with this method.

#####Append another element to this element `append(element)`
```javascript
var myDiv = el("#myDiv");
var myPar = el("myPar");

myDiv.append(myPar); // appends the p to the div
```  

#####Append this element to another element `appendTo(element)`  

**Appending multiple and/or appending to multiple elements**  
When you append multiple elements, they will be cloned for you.
```html
<div class="superdiv"></div>
<div class="superdiv"></div>
```
```javascript
var superdiv = el(".superdiv");
var elegantParagraphs = el("+p",3).text("I'm fancy");

superdiv.append(elegantParagraphs);
```
*results in...*
```html
<div class="superdiv">
  <p>I'm fancy</p>
  <p>I'm fancy</p>
  <p>I'm fancy</p>
</div>
<div class="superdiv">
  <p>I'm fancy</p>
  <p>I'm fancy</p>
  <p>I'm fancy</p>
</div>
```   


#####Remove all children nodes from element(s) `purge()`
```html
<!--html-->
<h1 class="coolGuy">
  <span>I'm gonna die</span>
</h1>
<div class="coolGuy">
  <p></p>
  <p class="coolGuy">
    <span>I'm so dead</span>
  </p>
</div>
```
```javascript
//javascript
el(".coolGuy").purge().text("Hello, Joe.");
```
*Results in...*
```html
<!--html-->
<h1 class="coolGuy">
  Hello, Joe.
</h1>
<div class="coolGuy">
  Hello, Joe.
</div>
```
<br>

**Note:** `purge` is also an easy way to simply remove text from an element.

####NOTE About Appending
With `append` or `appendTo`, the element(s) that is/are being appended inside of another will be de-referenced. For example:  
```html
<div> </div>
<div> </div>
<div> </div>
```
```javascript
var divs = el("div");
var pars = el("+p",2).appendTo( divs );
divs.addClass("coolDivs"); // works fine
pars.addClass("coolParagraphs"); // does nothing!
```  
You need to re-select the paragraphs to continue to modify them.

**Another thing**  
Whenever an element is cloned (like in the example right above with the paragraphs) it loses its event listeners. That is a native issue with javascript, not &lt;el&gt;


###Edit Elements  

#####Add text to an element `text(string)`  

<br> 

- - -
####Road Map
- Update the `attr` method to read an attribute or completely remove it.
- Add a `prepend` and `prependTo` methods to insert element as first child

<br>  
<br>  
<p align="center">
<img src="closing_tag.png">   
</p>
<br>  
<br>
