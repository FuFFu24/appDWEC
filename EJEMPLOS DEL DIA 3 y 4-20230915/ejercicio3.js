var texto=prompt("Dame un texto");
if (texto.length<10) {
	document.write("<b>" + texto + "</b>");
} else {
	if (texto.length >=10 && texto.length <=20) {
	        document.write("<h1>" + texto + "</h1>");
        } else {
		    document.write("<u>" + texto + "</u>");  
        }
}