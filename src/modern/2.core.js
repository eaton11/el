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


// el.getByAttribute = function(_key, _value){
// 	var self = (this === window) ? document : this;
// }

el.on = function(_evt, _handler){
	var self = (el.isElement(this)||el.isElementArray(this)) ? this : window;
	self.addEventListener(_evt,_handler);
	return this;
}

el.join = function(_arr){
	var tempArray = [];
	if(el.isArray(_arr)){
		for(var i = 0, ii = _arr.length; i<ii; i++){
			if( el.isElement(_arr[i]) ){ 
				tempArray.push(_arr[i])
			} else if( el.isElementArray(_arr[i]) ){
				_arr[i].each(function(_element){
					tempArray.push(_element);
				});
			}
		}
	}
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

	//SPECIAL METHODS
		_ELEMENT.addClass = function(_str){
			var self = this;
			if(el.isArray(_str))
				for(var i = 0, ii = _str.length; i<ii; i++) self.classList.add(_str[i]);
			else if(typeof _str === "string")
				self.classList.add(_str);
			return self;
		};

		_ELEMENT.rmClass = function(_str){
			var self = this;
			if(el.isArray(_str))
				for(var i = 0, ii = _str.length; i<ii; i++) self.classList.remove(_str[i]);
			else if(typeof _str === "string")
				self.classList.remove(_str);
			return self;
		};

		_ELEMENT.hasClass = function(_str){
			return this.classList.contains(_str);
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
		
		Object.defineProperty(_ELEMENT, "text", {
				configurable: true, 
				enumerable: true, 
				writable: true, 
				value: function(_string){
					if(typeof _string === "string")
						_ELEMENT.appendChild(document.createTextNode(_string));
					return _ELEMENT;
				}
			}
		);

		_ELEMENT.attr = function(_string, _value){
			if(typeof _string === "string")
				this.setAttribute( _string, (_value!==undefined)?_value:"" );
			return this;
		};


		return _ELEMENT;
	}
	
	//SINGLE ELEMENT

	if(el.isElement(_obj)){  
		return addMethods(_obj);	
	}

	//COLLECTION OR ARRAY
	if(el.isCollection(_obj) || el.isNodeList(_obj)) _obj = Array.prototype.slice.call(_obj);
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
	};

	_obj.append = function(_el){
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
	};

	_obj.appendTo = function(_el, _copy){
		_obj.each(function(_item){
			if(typeof _item !== "undefined"){
				if(_item.el === undefined) _item = addMethods(_item);
				_item.appendTo(_el);
			}	
		})
		if(_copy !== false) _obj.rm();
		return _obj;
	};

	_obj.purge = function(){
		_obj.each(function(_item){
			if(typeof _item !== "undefined"){
				if(!_item.el) _item = addMethods(_item);
				_item.purge();
			}
		})
		return _obj;
	};
	
	_obj.text = function(_string){
		_obj.each(function(_item){
			if(typeof _item !== "undefined"){
				if(!_item.el) _item = addMethods(_item);
				_item.text(_string);
			}
		})
		return _obj;
	};

	_obj.attr = function(_string, _value){
		_obj.each(function(_item){
			if(typeof _item !== "undefined"){
				if(!_item.el) _item = addMethods(_item);
				_item.attr(_string, _value);
			}
		})
		return _obj;
	};


	_obj.on = function(_evt, _handler){
		this.each(function(_element){
			_element.addEventListener(_evt,_handler);
		});
		return this;
	}

	return _obj;
}
