/*
INIT
*/
#SCOPE#el = function(_string, _num){
	var self = (this === window)? window.el : this;
	function getElement(_string){
		var elements = [];
		var firstChar = _string.charAt(0);
		switch (firstChar){
			case "#": 
				return self.getById(_string.slice(1));

			case "+":
				if(_string.slice(1).match(/#/)){ 
					var elmArr = _string.slice(1).split("#");
					var node = self.create(elmArr[0],_num);
					if(el.isElementArray(node)){
						node.each(function(elm){
							elm.setAttribute("id", elmArr[1]);
						})
					} else {
						node.setAttribute("id",elmArr[1])
					}
					return node;
				}
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
