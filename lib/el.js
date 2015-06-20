/*!
<el> by samueleaton
*/
(function(){

/*
INIT
*/
window.el = function(_string, _num){
	var self = (this === window)? window.el : this;
	function getElement(_string){
		var elements = [];
		var firstChar = _string.charAt(0);
		switch (firstChar){
			case "#": 
				return self.getById(_string.slice(1));

			case "+":
				return self.create(_string.slice(1),_num); // single

			case ".":
				return self.getByClassName(_string.slice(1));

			default:
				return self.getByTagName(_string);
		}
	}

	if(typeof _string === "string")
		return getElement(_string);
	else if( el.isElement(_string) )
		return el.elify(_string);

}

/*
CORE
*/
el.create = function(_string, _num){
	if(_num && typeof _num === "number"){
		var elements = [];
		for(var i = 0, ii = _num; i < ii; i++){
			elements.push(el.elify(document.createElement(_string)));
		}
			return elements;
	}
	return el.elify(document.createElement(_string));
}

el.getById = function(_string){
	return el.elify(document.getElementById(_string));
}

el.getByClassName = function(_string, _num){
	var self = (this === window.el) ? document : this;
	var elements = self.getElementsByClassName(_string);
	elements = Array.prototype.slice.call(elements);
	return el.elify(elements);
}

el.getByTagName = function(_string, _num){
	var self = (this === window.el) ? document : this;
	var elements = self.getElementsByTagName(_string);
	elements = Array.prototype.slice.call(elements);
	return el.elify(elements);
}

el.getByAttribute = function(_key, _value){
	var self = (this === window) ? document : this;
}

el.on = function(_evt, _handler){
	var self = (el.isElement(this)||el.isElementArray(this)) ? this : window;
	if( !el.isArray(self.__listeners__) ) self.__listeners__ = [];
	if( !el.isArray(self.__listeners__[_evt]) ) self.__listeners__[_evt] = [];
	self.__listeners__[_evt].push(_handler);
	// console.log("self:",self);
	self.addEventListener(_evt,_handler);
	return this;
}

el.join = function(_arr){
	// console.log("running join");
	var tempArray = [];

	//push THIS to temp array
	// if( el.isElement(this) ){ 
	// 	tempArray.push(this)
	// } else if( el.isElementArray(this) ){
	// 	this.each(function(_element){
	// 		tempArray.push(_element);
	// 	});
	// }
	if(el.isElement(_arr)){
		tempArray.push(_arr)
	} else if(el.isArray(_arr)){
		for(var i = 0, ii = _arr.length; i<ii; i++){
			// console.log("yes:", _arr[i])
			if( el.isElement(_arr[i]) ){ 
				tempArray.push(_arr[i])
			} else if( el.isElementArray(_arr[i]) ){
				_arr[i].each(function(_element){
					tempArray.push(_element);
				});
			}
		}
	}
		

	// console.log("tempArray:",tempArray)
	return el.elify(tempArray);

}


el.elify = function(_obj){
	
	function addMethods(_ELEMENT){
	//CORE METHODS
		_ELEMENT.el = el;
		_ELEMENT.getById = el.getById;
		_ELEMENT.getByClassName = el.getByClassName;
		_ELEMENT.getByTagName = el.getByTagName;
		_ELEMENT.getByAttribute = el.getByAttribute;
		_ELEMENT.elify = el.elify;
		_ELEMENT.on = el.on;
		_ELEMENT.join = el.join;

	//SPECIAL METHODS
		_ELEMENT.addClass = function(_str){
			if(this.className.indexOf(_str) === -1){
				if(this.className.length > 0){
					this.className = this.className + " " + _str;
				} else {
					this.className = _str;
				}
			}
			return this;
		};
		_ELEMENT.rmClass = function(_str){
			if(this.className.indexOf(_str) !== -1){
				if(this.className.indexOf(" ") === -1){
					this.className = "";
					return this;
				}
				var newClassName = "";
				var classes = this.className.split(" ");
				for(var i = 0; i < classes.length; i++) {
					if(classes[i] !== _str) {
						newClassName += classes[i] + " ";
					}
				}
				// remove trailing space
				if(newClassName.substr(newClassName.length - 1) === " "){
					newClassName = newClassName.slice(0, -1);
				}
				this.className = newClassName;
			}
			return this;
		};
		_ELEMENT.hasClass = function(_str){
			var classes = this.className.split(" ");
			for(var i = 0; i < classes.length; i++) {
				if(classes[i] === _str) {
					return true;
				}
			}
			return false;
		};
		_ELEMENT.rm = function(){
			var self = this;
			if(self.parentNode) 
				self.parentNode.removeChild(self);
			return self;
		};
		_ELEMENT.append = function(_el){
			if(el.isElementArray(_el)){
				var fragment = document.createDocumentFragment();
				_el.each(function(single){
					if(!single.el) single = addMethods(single);
					fragment.appendChild(single);
				});
				_el = fragment;
			}
			this.appendChild(_el);
			return this;
		};
		_ELEMENT.appendTo = function(_el){
			var self = this;
			if(el.isElementArray(_el)){
				_el.each(function(eachEl){
					var newNode = self.cloneNode(true);
					eachEl.appendChild(newNode);
				})
			} else {
				_el.appendChild(self);
			}
			return self;
		};
		_ELEMENT.purge = function(){
			var self = this;
			while (self.firstChild)
			  self.removeChild(self.firstChild);
			return self;
		};
		_ELEMENT.text = function(_string){
			if(typeof _string === "string")
				this.appendChild(document.createTextNode(_string));
			return this;
		};


		return _ELEMENT;
	}
	
	//SINGLE ELEMENT

	if(el.isElement(_obj)){  
		return addMethods(_obj);	
	}

	//COLLECTION OR ARRAY
	if(el.isCollection(_obj)) _obj = Array.prototype.slice.call(_obj);
	_obj.each = el.each;
	_obj.each(function(elm){ 
		addMethods(elm);
	});

	_obj.addClass = function(_class){
		_obj.each(function(_item){
					if(typeof _item !== "undefined"){
						if(!_item.el) _item = addMethods(_item);
						_item.addClass(_class);
					}
		})
		return _obj;
	};
	_obj.rmClass = function(_class){
		_obj.each(function(_item){
					if(typeof _item !== "undefined"){
						if(!_item.el) _item = addMethods(_item);
						_item.rmClass(_class);
					}
		})
		return _obj;
	};
	_obj.hasClass = function(_class, _which){
		if(_which === "all" || typeof _which === "undefined"){
			var allHaveClass = true;
			_obj.each(function(_item){
				if(typeof _item !== "undefined"){	
					if(_item.el === undefined) _item = addMethods(_item);
					// if ANY trigger the if statement then not ALL have the class
					if (!_item.hasClass(_class)) allHaveClass = false;
				}
			});
			return allHaveClass;
		} else if(_which === "any"){
			_obj.each(function(_item){
				if(typeof _item !== "undefined"){
					if(!_item.el) _item = addMethods(_item);
					// if ANY trigger the if statement then one has the class
					if (_item.hasClass(_class)) return true;
				}	
			});
			// none triggered the if statement
			return false; 
		}
		return _obj;
	};
	_obj.rm = function(_class){
		this.each(function(_item){
			if(typeof _item !== "undefined"){
				if(!_item.el) _item = addMethods(_item);
				_item.rm();
			}	
		})
		return _obj;
	}

	_obj.append = function(_el){
		// ADD a getEventListeners to look at the original element and copy all of the events to the new cloned element
		
		// if incoming is array, put into fragment
		if(el.isElementArray(_el)){
			var fragment = document.createDocumentFragment();
			_el.each(function(single){
				if(single.el === undefined) single = addMethods(single);
				fragment.appendChild(single);
			});
			_el = fragment;
		}
		_obj.each(function(_item){
			if(typeof _item !== "undefined"){
				if(!_item.el) _item = addMethods(_item);
				_item.append(_el.cloneNode(true));
			}	
		})

		return _obj;
	}


	_obj.appendTo = function(_el, _copy){
		// ADD a getEventListeners to look at the original element and copy all of the events to the new cloned element
		_obj.each(function(_item){
			if(typeof _item !== "undefined"){
				if(_item.el === undefined) _item = addMethods(_item);
				/*var newItem =*/ _item.appendTo(_el);
				// tempContainer.push(newItem);
			}	
		})

		if(_copy !== false) _obj.rm();
		// return el.elify(tempContainer);
		return _obj;
	}

	_obj.purge = function(){
		_obj.each(function(_item){
			if(typeof _item !== "undefined"){
				if(!_item.el) _item = addMethods(_item);
				_item.purge();
			}
		})
		return _obj;
	}
	
	_obj.text = function(_string){
		_obj.each(function(_item){
			if(typeof _item !== "undefined"){
				if(!_item.el) _item = addMethods(_item);
				_item.text(_string);
			}
		})
		return _obj;
	}


	_obj.on = function(_evt, _handler){
		this.each(function(_element){
			// will be used to transfer events to copies of element
			// if( !el.isArray(_element.__listeners__) ) _element.__listeners__ = [];
			// if( !el.isArray(_element.__listeners__[_evt]) ) _element.__listeners__[_evt] = [];
			// _element.__listeners__[_evt].push(_handler);
			_element.addEventListener(_evt,_handler);
		});
		return this;
	}


	return _obj;
}

/*
UTILS
*/
el.each = function(_callback){
	for(var t=this,e=0,n=t.length;n>e;e++) {
		_callback(t[e],e,t);
	}
}

el.isArray = function(_obj){
	if(Array.isArray(_obj) || _obj instanceof Array) return true;
	return false;
}

el.isElementArray = function(_obj){
	if( 
			(Array.isArray(_obj) || _obj instanceof Array) 
			&& el.isElement(_obj[0])
		) return true;
	else return false;
}

el.isElement = function(_obj){
	var _isElement;
	try{
		_isElement = _obj instanceof HTMLElement;
	}catch(e){
		_isElement = (_obj && _obj.nodeType) ? true : false ;
	}
	return _isElement;
}

el.isCollection = function (_obj){
	var _isCollection;
	try{
		_isCollection = _obj instanceof HTMLCollection;
	}catch(e){
		_isCollection = (
			typeof _obj.length === 'number' 
			&& typeof _obj.item !== undefined
 			&& (_obj.length === 0 || isElement(_obj[0])) //checks if first item exists or is HTMLElement
    ) ? true : false;
	}
	return _isCollection;
}

})();
(function(win, doc){
	if(win.addEventListener)return;		//No need to polyfill

	function docHijack(p){var old = doc[p];doc[p] = function(v){return addListen(old(v))}}
	function addEvent(on, fn, self){
		return (self = this).attachEvent('on' + on, function(e){
			var e = e || win.event;
			e.preventDefault  = e.preventDefault  || function(){e.returnValue = false}
			e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true}
			fn.call(self, e);
		});
	}
	function addListen(obj, i){
		if(i = obj.length)while(i--)obj[i].addEventListener = addEvent;
		else obj.addEventListener = addEvent;
		return obj;
	}

	addListen([doc, win]);
	if('Element' in win)win.Element.prototype.addEventListener = addEvent;			//IE8
	else{																			//IE < 8
		doc.attachEvent('onreadystatechange', function(){addListen(doc.all)});		//Make sure we also init at domReady
		docHijack('getElementsByTagName');
		docHijack('getElementById');
		docHijack('createElement');
		addListen(doc.all);	
	}
})(window, document);
