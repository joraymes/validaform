/* -------------------------------  validaform   ----------------------------------------------
		Descripcion	:   Evalua un Objeto formulario de multiples caracteristicas
		Recibe		: 	objForm			:	como un Objeto formulario del documento. 
					msgType			:	como string indicando el modo de mensaje de error (ver Mensajes de Error)
					language		:	como string indicando el idioma de los mensajes de error ( ver Idioma)
					xmlDocURL		:	como string indicando la ruta  del fichero xml de mensajes de error ej: '/js/validaform.xml'
		Devuelve	:	
			True si todos los elementos del formulario son correctos.
                        False en caso de existir un campo o mas, mal rellenado.
        	Acciones    	:   
			En caso de detectar un error en el campo , añade la class "validaform-errField" sobre el mismo
                        elemento donde se ha detactado dicho error.
					 
		Uso:		Añadir en los elementos del formulario el atributo "class" 	con [opcion] para indicar a la funcion que formato se  	requiere.
					
		[opcion]	: [Descripcion]
                "txt-obl"	: Para input text obligatorios.
                "isNumber"      : Para validar numeros enteros (adminte signo + o - delante)
		"isOnlyChars" 	: Para inputs text con formato solo caracteres.
		"email"		: Para inputs que requieren una dir. Correo
		"chk-obl"	: Para inputs checkbox obligatorios.
		"rad-obl"	: Para inputs radio obligatorios.
		"sel-obl"	: Para select obligatorios (no multiples).
                "mult-obl"	: Para select multiples obligatorios.
                "NIF"           : para validación de campos en formato NIF [8 digitos + Letra]
                "passValid"     : para validar  campos password que coincidan entre si
                "isDateDdMmYyyy": para validar fecha como dd/mm/yyyy o dd-mm-yyyy
				
		Mensajes de Error : Los valores msgType pueden ser:
				
                'createElement' 	:	
			El mensaje de error proviene del xml y  aparece como un nuevo contenedor hermano al campo.
                        El contenedor generado es => label.validaform-errMsg
                'visibleElement'	:	
			El mensaje de error se escribe en un hermano inmediato al lado del campo ( se manipula la propiedead CSS visibility)
			Tenemos que definir incialmente visibility = hidden y la función lo revierte a visibility = visible ;
                'displayElement'	:	
			El mensaje de error se escribe en un hermano inmediato al lado del campo ( se manipula la propiedead CSS display)
			Tenemos que definir incialmente display = none y la función lo revierte a display = block ;
			
		Idioma: 
			Los valores de msgLanguage pueden ser los que esten editados para cada combinacion de 
			[opcion] dentro del fichero xml . por defecto tenemos editados los idioma de 
			'es' : español , 'ca' : Catala, 'en':ingles , 'fr' : frances. 

		Autor:		Docent Cifo La Violeta.				
		Fecha:		Junio 2018.

 ------------------------------------------------------------------------------------------------------------------- */



function validaform(objForm,msgType,language,xmlDocURL){
    var xmlDoc=validaformLoadXmlReports(xmlDocURL);

    var totOk=true;

    // Limpiar tots los elementos de errMessage
    validaformResetErrMessage(msgType);
    

    // Recorre cada uno de los elementos del formulario
    for(var i=0; i< objForm.elements.length ;i++ ){
        /* ------------------------------ txt-obl ------------------------------------------*/
        if(objForm.elements[i].className.indexOf('txt-obl')!=-1){
            if(objForm.elements[i].value.trim()==''){
                totOk=false;
                objForm.elements[i].className += ' validaform-errField ';
                validaformDisplayErrMessage(msgType,'txt-obl',language,xmlDoc,objForm.elements[i]);
            }
        }
        /* -------------------------------- isNumber ------------------------------------------*/
        if(objForm.elements[i].className.indexOf('isNumber')!=-1){
            if(objForm.elements[i].value!=''){
                if(! objForm.elements[i].value.match(/^[-+]?[0-9]+$/)   ){
                    totOk=false;
                    objForm.elements[i].className += ' validaform-errField ';
                    validaformDisplayErrMessage(msgType,'isNumber',language,xmlDoc,objForm.elements[i]);    
                }
            }
        }
        /* --------------------------------- isOnlyChars --------------------------------------- */
        if(objForm.elements[i].className.indexOf('isOnlyChars')!=-1){
            if(objForm.elements[i].value!=''){
                if(! objForm.elements[i].value.match(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)   ){
                    totOk=false;
                    objForm.elements[i].className += ' validaform-errField ';
                    validaformDisplayErrMessage(msgType,'isOnlyChars',language,xmlDoc,objForm.elements[i]); 
                }
            }
        }
        /* ---------------------------------- email --------------------------------------------- */
        if(objForm.elements[i].className.indexOf('email')!=-1){
            if(objForm.elements[i].value!=''){
                if(! objForm.elements[i].value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)   ){
                    totOk=false;
                    objForm.elements[i].className += ' validaform-errField ';
                    validaformDisplayErrMessage(msgType,'email',language,xmlDoc,objForm.elements[i]); 
                }
            }
        }
        /* ----------------------------------- NIF ----------------------------------------------- */
        if(objForm.elements[i].className.indexOf('NIF')!=-1){
            if(objForm.elements[i].value!=''){
                if(! validaformParseNIF(objForm.elements[i].value)){
                    totOk=false;
                    objForm.elements[i].className += ' validaform-errField ';
                    validaformDisplayErrMessage(msgType,'NIF',language,xmlDoc,objForm.elements[i]); 
                }
            }
        }
        /* --------------------------------- rad-obl -------------------------------------------*/
        if(objForm.elements[i].className.indexOf('rad-obl')!=-1){
            var arrObjRadio= document.getElementsByName(objForm.elements[i].name);
            var isCheck=false;
            for(var w=0; w <arrObjRadio.length && !isCheck  ; w++){
                if(arrObjRadio[w].checked){
                    isCheck=true;
                }
            }
            if(!isCheck){
                totOk=false;
                objForm.elements[i].className += ' validaform-errField ';
                validaformDisplayErrMessage(msgType,'rad-obl',language,xmlDoc,objForm.elements[i]);    
            }    
        }
        
        /* --------------------------------- chk-obl -------------------------------------------*/
        if(objForm.elements[i].className.indexOf('chk-obl')!=-1){
            if(! objForm.elements[i].checked){
                totOk=false;
                objForm.elements[i].className += ' validaform-errField ';
                validaformDisplayErrMessage(msgType,'chk-obl',language,xmlDoc,objForm.elements[i]);   
            }
        }
        
         /* --------------------------------- sel-obl -------------------------------------------*/
         if(objForm.elements[i].className.indexOf('sel-obl')!=-1){
            if( objForm.elements[i].selectedIndex==0){
                totOk=false;
                objForm.elements[i].className += ' validaform-errField ';
                validaformDisplayErrMessage(msgType,'sel-obl',language,xmlDoc,objForm.elements[i]);   
            }
        }
        /* --------------------------------- mult-obl -------------------------------------------*/
        if(objForm.elements[i].className.indexOf('mult-obl')!=-1){
            if(objForm.elements[i].querySelectorAll("option:checked").length==0){
                totOk=false;
                objForm.elements[i].className += ' validaform-errField ';
                validaformDisplayErrMessage(msgType,'mult-obl',language,xmlDoc,objForm.elements[i]);  
            }

        }

        /* --------------------------------- isDateDdMmYyyy -------------------------------------------*/
        if(objForm.elements[i].className.indexOf('isDateDdMmYyyy')!=-1){
            if(objForm.elements[i].value!=''){
                if(! validaformParseDate(objForm.elements[i].value)){
                    totOk=false;
                    objForm.elements[i].className += ' validaform-errField ';
                    validaformDisplayErrMessage(msgType,'isDateDdMmYyyy',language,xmlDoc,objForm.elements[i]);  
                }
            }
        }
    }
    return totOk;
}   

/* ***********************************************************************************************
Descripcion: Valida una cadena en formato fecha (dd-mm-YYYY o dd/mm/YYY)
Recibe:   cadena : string con la fecha
Devuelve: un true(correcto) o false(no correcto) 
************************************************************************************************** */
function validaformParseDate(cadena){
    if(!cadena.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)){
        return false;
    }
    if(cadena.split('-').length>1){
        var dia = parseInt(cadena.split('-')[0]);
        var mes = parseInt(cadena.split('-')[1]);
        var ano = parseInt(cadena.split('-')[2]);
    }else{
        var dia = parseInt(cadena.split('/')[0]);
        var mes = parseInt(cadena.split('/')[1]);
        var ano = parseInt(cadena.split('/')[2]);
    }
    var listaDias=[31,28,31,30,31,30,31,31,30,31,30,31];
    if(mes!=2){ 
        if(dia>listaDias[mes-1]){
            return false;
        }
    }else{      
        if ((ano % 4 == 0) && ((ano % 100 != 0) || (ano % 400 == 0))){
            if(dia>29){
                return false;
            }
        }else{
            if(dia>listaDias[mes-1]){
                return false;
            }
        }
    }
    return true;
}

/* ***********************************************************************************************
Descripcion: Valida una cadena en formato NIF
Recibe:   cadena : string con el NIF
Devuelve: un true(correcto) o false(no correcto) 
************************************************************************************************** */
function validaformParseNIF(cadena){
    if(!cadena.match(/^[0-9]{8}[a-zA-Z]$/)){
        return false;
    }
    var numero = parseInt(cadena.substring(0,8));
    var letra  = cadena.charAt(8);
    var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
    var posicion = numero % 23;
    if(letra.toUpperCase() != letras[posicion]){
        return false;
    }else{
        return true;
    }

}

/* ***********************************************************************************************
Descripcion: Se encarga de generar los contenidos de error en el formulario
Recibe: 
    msgType : string con el metodo de creación del mensaje
    category : string de la categoria de error a mostrar
    language : string con el idioma del mensaje a mostrar
    xmlDoc: Documento XML
    objField : objeto del formulario donde se ha producido el error
Devuelve: Genera o manipula el DOM del documento
************************************************************************************************** */
function validaformDisplayErrMessage(msgType,category,language,xmlDoc,objField){
    switch(msgType){
        case 'createElement':
                var objLabelError=document.createElement('LABEL');
                var objTxtError= document.createTextNode(validaformGetErrMessage(xmlDoc, category, language));
                objLabelError.setAttribute("class","validaform-errMsg");
                objLabelError.appendChild(objTxtError);
                objField.insertAdjacentElement('afterend',objLabelError);
            break;
        case 'visibleElement':
                objField.nextElementSibling.innerHTML= validaformGetErrMessage(xmlDoc, category, language);
                objField.nextElementSibling.style.visibility='visible';
        case 'displayElement':
                objField.nextElementSibling.innerHTML= validaformGetErrMessage(xmlDoc, category, language);
                objField.nextElementSibling.style.display='block';
    }
}

/* ************************************************************************************************
Descripcion: Busca en funcion de la category el mensaje de error e idioma  dentro del XML
REcibe: 
    xmlDoc: Documento XML
    category : string de la categoria de error a mostrar
    language : string con el idioma del mensaje a mostrar
Devuelve: string con el texto del mensaje a mostrar
************************************************************************************************* */
function validaformGetErrMessage(xmlDoc, category, language){
    var cadena='';
    var arrErrMsg=xmlDoc.getElementsByTagName("errMsg");
    for(node=0; node< arrErrMsg.length; node++){
        if(arrErrMsg[node].attributes[0].nodeValue== category){
            for(var nodeChild=0 ; nodeChild<arrErrMsg[node].childNodes.length;nodeChild++ ){
                if(arrErrMsg[node].childNodes[nodeChild].nodeName==language){
                   cadena= arrErrMsg[node].childNodes[nodeChild].textContent;
                    
                }
            }
        }
    }
    return cadena;
}

/* *************************************************************************************************
Descripcion: Elimina todos los mensajes de Error
Recibe:  msgType: string, con el metodo de creacion de mensajes
Devuelve: Genera o manipula el DOM del documento
************************************************************************************************* */
function validaformResetErrMessage (msgType){
   switch(msgType){
       case 'createElement':
            var arrObjLabelError=document.querySelectorAll("label.validaform-errMsg");
            for(var k =0; k < arrObjLabelError.length ;k++ ){
                arrObjLabelError[k].remove();
            }
            break;
       case 'visibleElement'  :
            var arrObjInput = document.querySelectorAll(".validaform-errField");
            for(var k=0; k<arrObjInput.length; k++){
                arrObjInput[k].nextElementSibling.style.visibility="hidden";
            }
            break;
        case 'displayElement'  :
            var arrObjInput = document.querySelectorAll(".validaform-errField");
            for(var k=0; k<arrObjInput.length; k++){
                arrObjInput[k].nextElementSibling.style.display="none";
            }
            break;
   }
   var arrObjInput = document.querySelectorAll(".validaform-errField");
   for(var k=0; k<arrObjInput.length; k++){
        arrObjInput[k].className = arrObjInput[k].className.replace(/validaform-errField/g, "");
   }
}

/* *************************************************************************************************
Descripcion: Carga via AJAX el documento xml
Recibe: msgXmlDoc , string con la URL del coumento 
Devuelve: xmlDoc , objeto xml.
*************************************************************************************************** */
function validaformLoadXmlReports(msgXmlDoc){
    if (window.XMLHttpRequest){
        var xhttp=new XMLHttpRequest();
    }else{ // IE 5/6
        var xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET",msgXmlDoc,false);
    xhttp.send(null);
    return  xmlDoc=xhttp.responseXML;
   

}
