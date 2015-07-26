/*
UTILS
*/
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
		_isElement = (_obj instanceof HTMLElement || _obj instanceof Element);
	}catch(e){
		_isElement = (_obj && _obj.nodeType) ? true : false ;
	}
	return _isElement;
};

el.isCollection = function (_obj){
	return _obj instanceof HTMLCollection;
};

el.isNodeList = function (_obj){
	return _obj instanceof NodeList;
};

el.isInDom = function(_element){
	return (document.contains(_element)) ? true : false ;
}
