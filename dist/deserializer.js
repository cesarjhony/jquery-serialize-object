function desserializar(data, idForm){
	function preparaParametros() {
		var parametros = [];
    	function recursiva(d, parametros){
   			var pai = parametros[parametros.length-1].name;
    		var count = 0;
    		for ( var ie in d) {
		    	
	    		if(typeof d[ie] == 'object'){
	    			parametros[parametros.length-1].name = pai+"["+ie+"]";
	    			recursiva(d[ie], parametros);
	    		}else{
	    			parametros.push({"name":pai});
    				parametros[parametros.length-2].name = pai+"["+ie+"]";
	    			parametros[parametros.length -2].value = d[ie];
	    		}
	    		count++;
			}
    		parametros.push({"name":parametros[parametros.length-1].name});
    	}
    	for ( var ie in data) {//onde ie=key(nome do subobjeto ou index)
    		parametros.push( {"name":ie} );
    		if(typeof data[ie] == 'object'){
    			recursiva(data[ie], parametros);
    		}else{
    			parametros[parametros.length -1].value = data[ie];
    		}
		} 
    	return (function limpa(parametros) {
			var plimpo = [];
    		for ( var i in parametros) {
				if( !(parametros[i].value === undefined) )
					plimpo.push(parametros[i]);
			}//window.plimpo = plimpo;//debug
    		return plimpo;
		})(parametros);
	}
	var parametros = preparaParametros(data);
	//console.log(JSON.stringify(parametros));//debug
	for ( var i in parametros) {
		if( document.forms[ idForm ].elements[ parametros[i].name ] )
			document.forms[ idForm ].elements[ parametros[i].name ].value = parametros[i].value;
	}
}
//use: desserializar(data, "FormId");
//for data=data.root.object[1].vERyColl populate bellow
//<input name="root[object][1][vERyColl]">
