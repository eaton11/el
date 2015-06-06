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

<br>

####What the el is el?####

It's a way to get up in the DOM's personal space, work with id's, classes, remove/append elements, etc. 
Everything is backwords compatible with old browsers :)

####Examples?####

Comin' right up!  
<br> 
<br>

##Docs   

###Getting Elements

Get an element by it's id, or get mutliple elements by their class or tag name.  
- By id: `el('#id_here')` *(with the hash)*
- By class name: `el('.class_here')`  *(with the dot)*
- By tag name: `el('tag_name_here')` (e.g. `el('div')`)  

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
**Criteria** 
- `"all"` - returns true if *ALL* elements in the array have the class, otherwise it returns false
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

#####Append another element to this element `appendEl(element)`
```javascript
var myDiv = el("#myDiv");
var myPar = el("myPar");

myDiv.appendEl(myPar); // appends the p to the div
```  
If you got multiple elements by their class or tag name, they will all be removed with this method.

#####Append this element to another element `appendTo(element)`  

#####Remove all children from and element `purge()`
If you got multiple elements by their class or tag name, they will all become childless.  

<br>

###Edit Elements  

#####Add text to an element `addText(string)`  

<br> 
- - -
####Road Map
- Add ability to create elements
- Add ability to add, set, read, delete html attributes
- Add default criteria of `"all"` for the second parameter of `hasClass()`
- add conflict verification if purging a class or element

<br>  
<br>  
<p align="center">
<img src="closing_tag.png"> 	
</p>
<br>  
<br>
