/*
UTILS
*/
el.each = function(_callback){
	for(var t=this,e=0,n=t.length;n>e;e++) {
		_callback(t[e],e,t);
	}
};

el.isArray = function(_obj){
	if(Array.isArray(_obj) || _obj instanceof Array) return true;
	return false;
};

el.isElementArray = function(_obj){
	if( 
			(Array.isArray(_obj) || _obj instanceof Array) 
			&& el.isElement(_obj[0])
		) return true;
	else return false;
};

el.isElement = function(_obj){
	var _isElement;
	try{
		_isElement = _obj instanceof HTMLElement;
	}catch(e){
		_isElement = (_obj && _obj.nodeType) ? true : false ;
	}
	return _isElement;
};

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
};

el.isNodeList = function (_obj){
	var _isNodeList;
	try{
		_isNodeList = _obj instanceof NodeList;
	}catch(e){
		_isNodeList = (
			typeof _obj.length === 'number' 
			&& 
			typeof _obj.item !== undefined
 			&& 
 			(_obj.length === 0 || isElement(_obj[0])) //checks if first item exists or is HTMLElement
    ) 
    ? true : false;
	}
	return _isNodeList;
};
