document.getElementById("btn_c").addEventListener("click", () => {
	codificar();
})
document.getElementById("btn_d").addEventListener("click", () => {
	decodificar();
})
document.getElementById("btn_l").addEventListener("click", () => {
	document.getElementById("cifrado").value="";
	document.getElementById("text_claro").value="";
	document.getElementById("desplazamiento").selectedIndex = "0";
})
function codificar(){
	//traer valor de la letra del abc
	var letra_clave = parseInt(document.getElementById("desplazamiento").value);
	
	document.getElementById("cifrado").value = caesar.encrypt(document.getElementById("text_claro").value, letra_clave);
}

function decodificar(){
	//traer valor de la letra del abc
	var letra_clave = parseInt(document.getElementById("desplazamiento").value);
	
	document.getElementById("cifrado").value = caesar.decrypt(document.getElementById("text_claro").value, letra_clave);
}

var caesar = caesar || (function() {
	var doStaff = function (txt, clave, action) {
		var replace = (function() {
			var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
				'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
			
			var labc = abc.length;//tamaño del abc
			return function(c) {
				var index = abc.indexOf(c.toLowerCase());
				if (index > -1 || index < 26) {
					var pos = index;
					if (action) {
						// encriptar
						pos += clave;
						pos -= (pos >= labc)?labc:0;
					} else {
						// desencriptar
						pos -= clave;
						pos += (pos < 0)?labc:0;
					}
					return abc[pos];
				}
				return c;
			};
		})();
		var re = (/([A-z])/ig);
		return String(txt).replace(re, function (match) {
			return replace(match);
		});
	};

	return {
			encrypt: function(txt, clave) {
			return doStaff(txt, clave, true);
		},
			decrypt: function(txt, clave) {
			return doStaff(txt, clave, false);
		}
	};
})();