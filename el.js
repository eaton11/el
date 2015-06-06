/*!
	<el> by samr_eaton
*/
var el = function(_string){
	function getElement(_string){
		var firstChar = _string.charAt(0);
		if(firstChar === "#"){
			return document.getElementById(_string.slice(1));
		} else if(firstChar === ".") {
			var elements = document.getElementsByClassName(_string.slice(1));
			elements.arr = true;
			return elements;
		} else { //tag name
			var elements = document.getElementsByTagName(_string);
			elements.arr = true;
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
					if(!_item.el) _item = addMethods(_item);
					_item.addClass(_class);
				})
				return _obj;
			}

			_obj.rmClass = function(_class){
				_obj.each(function(_item){
					if(!_item.el) _item = addMethods(_item);
					_item.addClass(_class);
				})
				return _obj;
			}

			_obj.hasClass = function(_class, _which){
				if(_which === "all"){
					_obj.each(function(_item){
						if(!_item.el) _item = addMethods(_item);
						// if ANY trigger the if statement then not ALL have the class
						if (!_item.addClass(_class)) return false;
					});
					// none triggered the if statement
					return true; 
				} else if(_which === "any"){
					_obj.each(function(_item){
						if(!_item.el) _item = addMethods(_item);
						// if ANY trigger the if statement then one has the class
						if (_item.addClass(_class)) return true;
					});
					// none triggered the if statement
					return false; 
				}
				return _obj;
			}

			_obj.rm = function(_class){
				_obj.each(function(_item){
					if(!_item.el) _item = addMethods(_item);
					_item.rm();
				})
				return _obj;
			}

			_obj.appendEl = function(_el){
				_obj.each(function(_item){
					if(!_item.el) _item = addMethods(_item);
					_item.appendEl(_el);
				})
				return _obj;
			}

			_obj.appendTo = function(_el){
				_obj.each(function(_item){
					if(!_item.el) _item = addMethods(_item);
					_el.appendEl(_item);
				})
				return _obj;
			}


			_obj.addText = function(_string){
				_obj.each(function(_item){
					if(!_item.el) _item = addMethods(_item);
					_item.addText(_string);
				})
				return _obj;
			}

			_obj.purge = function(){
				_obj.each(function(_item){
					if(!_item.el) _item = addMethods(_item);
					_item.purge();
				})
				return _obj;
			}
			return _obj;
		}


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

		_obj.appendEl = function(_el){
			this.appendChild(_el);
			return this;
		};

		_obj.appendTo = function(_el){
			var self = this;
			_el.appendChild(self);
			return self;
		};

		_obj.addText = function(_string){
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
	var newObject = getElement(_string);
	newObject = addMethods(newObject);
	return newObject;
}