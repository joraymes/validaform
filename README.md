# validaform

### Basic javascript form validator


## Descripcion	
	Evalua un Objeto formulario de multiples caracteristicas

## Recibe		
	objForm	:	como un Objeto formulario del documento. 
	msgType	:	como string indicando el modo de mensaje de error (ver Mensajes de Error)
	language:	como string indicando el idioma de los mensajes de error ( ver Idioma)
	xmlDoc	:	como string indicando la ruta  del fichero xml de mensajes de error ej: '/js/validaform.xml'

## Devuelve		
	True si todos los elementos del formulario son correctos.
	False en caso de existir un campo o mas, mal rellenado.
## Acciones  
	En caso de detectar un error en el campo , añade la class "validaform-errField" sobre el mismo elemento donde se ha detactado dicho error.
					 
## Uso	
	Añadir en los elementos del formulario el atributo "class" con [opcion] para indicar a la funcion que formato se  	requiere.
					
	[opcion]		: Descripcion
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
				
## Mensajes de Error 
	Los valores msgType pueden ser:
				
###  'createElement' 	
	El mensaje de error proviene del xml y  aparece como un nuevo contenedor hermano al campo.
	El contenedor generado es => label.validaform-errMsg
###  'visibleElement'
	El mensaje de error se escribe en un hermano inmediato al lado del campo ( se manipula la propiedead CSS visibility)
 	Tenemos que definir incialmente visibility = hidden y la función lo revierte a visibility = visible ;
###  'displayElement'
	El mensaje de error se escribe en un hermano inmediato al lado del campo ( se manipula la propiedead CSS display)
	Tenemos que definir incialmente display = none y la función lo revierte a display = block ;
## Idioma
	Los valores de msgLanguage pueden ser los que esten editados para cada combinacion de 
	[opcion] dentro del fichero xml . por defecto tenemos editados los idioma de 'es' : español , 'ca' : Catala, 'en':ingles , 'fr' : frances. 

# Autor:		
	Docent Cifo La Violeta.				
# Fecha:		
	Junio 2018.
