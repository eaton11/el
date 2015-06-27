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
	return _obj instanceof HTMLCollection;
};

el.isNodeList = function (_obj){
	return _obj instanceof NodeList;
};
