<br>  
<br>  
<p align="center">
<img src="logo.png"> 	
</p>
<br>  
<br>  
<br>  


# el
A lighter substitute for jQuery DOM manipulation  
[![GitHub version](https://badge.fury.io/gh/eaton11%2Fel.svg)](http://badge.fury.io/gh/eaton11%2Fel) <img src="https://img.shields.io/badge/license-MIT-blue.svg">


####What the el is el?####

It's a way to get up in the DOM's personal space, work with id's, classes, remove/append elements, etc. 
Everything is backwords compatible with old browsers :)

<br> 
<br>

##Docs   

###Getting Elements

Get an element by it's id, or get mutliple elements by their class or tag name:   
- By id: `el('#id_here')` *(with the hash)*
- By class name: `el('.class_here')`  *(with the dot)*
- By tag name: `el('tag_name_here')` (e.g. `el('div')`)    

You can specify how many elemnts to get when selecting by class or tag:  
Doing `el('.class_name', 1)` will return the first element with the class name. Same goes for tag anme.

<br>  

###Creating Elements
You can create elements by using a plus sign before the element type:  
`el('+div')` or `el('+h1')`  

You can create multiple elements at once by passing an integer for the second parameter:  
`el('+div', 3)`  

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


#####Remove all children from element(s) `purge()`
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

###Edit Elements  

#####Add text to an element `text(string)`  

<br> 
- - -
####Road Map
- ~~Add ability to create elements~~ *added!*
- Add ability to add, set, read, delete html attributes *maybe*
- ~~Add default criteria of `"all"` for the second parameter of `hasClass()`~~ *added!*
- ~~fix purging error if purging children and parent~~ *added!*

<br>  
<br>  
<p align="center">
<img src="closing_tag.png"> 	
</p>
<br>  
<br>
