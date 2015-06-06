/*!
	<el> by samr_eaton
*/
var el = function(_string, _num){
	if(typeof _num === "undefined") _num = null;
	function getElement(_string, _num){
		var firstChar = _string.charAt(0);
		switch (firstChar){
			case "#":
				return document.getElementById(_string.slice(1));
			case "+":
				if(_num && typeof _num === "number"){ // multi
					var elements = [];
					elements.arr = true;
					for(var i = 0, ii = _num; i < ii; i++){
						elements.push(document.createElement(_string.slice(1)));
					}
					return elements;
				}
				return document.createElement(_string.slice(1)); // single
			case ".":
				var elements = document.getElementsByClassName(_string.slice(1));
				elements.arr = true;
				if(_num && typeof _num === "number"){ 
					return elements.slice(0,_num); 
				}
				return elements;
			default:
				var elements = document.getElementsByTagName(_string);
				elements.arr = true;
				if(_num && typeof _num === "number"){ 
					return elements.slice(0,_num); 
				}
				return elements;
		}
	}
	function addMethods(_obj){


		// ==== adds methods to multi element arr ====
		if(_obj.arr === true){

			_obj.each = function(_callback){
					for(var t=this,e=0,n=t.length;n>e;e++) {
						_callback(t[e],e,t);
					}
			};

			_obj.each(function(_each){
				_each = addMethods(_each);
				return _obj;
			});

			_obj.addClass = function(_class){
				_obj.each(function(_item){
					if(typeof _item !== "undefined"){
						if(!_item.el) _item = addMethods(_item);
						_item.addClass(_class);
					}
				})
				return _obj;
			}

			_obj.rmClass = function(_class){
				_obj.each(function(_item){
					if(typeof _item !== "undefined"){	
						if(!_item.el) _item = addMethods(_item);
						_item.addClass(_class);
					}
				})
				return _obj;
			}

			_obj.hasClass = function(_class, _which){
				if(_which === "all" || typeof _which === "undefined"){
					_obj.each(function(_item){
						if(typeof _item !== "undefined"){	
							if(!_item.el) _item = addMethods(_item);
							// if ANY trigger the if statement then not ALL have the class
							if (!_item.addClass(_class)) return false;
						}
					});
					// none triggered the if statement
					return true; 
				} else if(_which === "any"){
					_obj.each(function(_item){
						if(typeof _item !== "undefined"){
							if(!_item.el) _item = addMethods(_item);
							// if ANY trigger the if statement then one has the class
							if (_item.addClass(_class)) return true;
						}	
					});
					// none triggered the if statement
					return false; 
				}
				return _obj;
			}

			_obj.rm = function(_class){
				_obj.each(function(_item){
					if(typeof _item !== "undefined"){
						if(!_item.el) _item = addMethods(_item);
						_item.rm();
					}	
				})
				return _obj;
			}

			_obj.append = function(_el){
				// if incoming is array, convert to fragment
				if(_el.arr){
					var fragment = document.createDocumentFragment();
					_el.each(function(single){
						if(!single.el) single = addMethods(single);
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


			_obj.appendTo = function(_el){

				_obj.each(function(_item){
					if(typeof _item !== "undefined"){
						if(!_item.el) _item = addMethods(_item);
						_el.append(_item);
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

			_obj.purge = function(){
				_obj.each(function(_item){
					if(typeof _item !== "undefined"){
						if(!_item.el) _item = addMethods(_item);
						_item.purge();
					}
				})
				return _obj;
			}
			return _obj;
		} // END ARRAY METHODS




		// ==== adds methods to single element ====

		_obj.addClass = function(_str){
			if(this.className.indexOf(_str) === -1){
				if(this.className.length > 0){
					this.className = this.className + " " + _str;
				} else {
					this.className = _str;
				}
				
			}
			return this;
		};

		_obj.rmClass = function(_str){
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
					newClassName = newClassName.slice(0, - 1);
				}
				this.className = newClassName;
			}
			return this;
		};

		_obj.hasClass = function(_str){
			var classes = this.className.split(" ");
			for(var i = 0; i < classes.length; i++) {
				if(classes[i] === _str) {
					return true;
				}
			}
			return false;
		};

		_obj.rm = function(){
			var self = this;
			if(self.parentNode) 
				self.parentNode.removeChild(self);
			return self;
		};

		_obj.append = function(_el){
			if(_el.arr){
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

		_obj.appendTo = function(_el){
			var self = this;
			// _el.appendChild(self);
			// console.log(_el);
			if(_el.arr){
				_el.each(function(eachEl){
					eachEl.appendChild(self.cloneNode(true));
				})
			} else {
				_el.appendChild(self);
			}
			return self;
		};

		_obj.text = function(_string){
			if(typeof _string === "string")
				this.appendChild(document.createTextNode(_string));
			return this;
		};

		_obj.purge = function(){
			var self = this;
			while (self.firstChild)
			  self.removeChild(self.firstChild);
			return self;
		}
		


		return _obj;
	}
	var newObject = getElement(_string, _num);
	newObject = addMethods(newObject);
	return newObject;
}