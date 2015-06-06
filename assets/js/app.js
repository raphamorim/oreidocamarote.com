(function(){
	var gera = document.querySelector('#gera'),
		geraBtn = document.querySelector('#gera-btn');

	function trazOPlaceholderQuePisca(quantos) {
  		var lorem = new Lorem;
  		lorem.type = Lorem.TEXT;
  		lorem.query = quantos + 'p';
  		lorem.createLorem(document.getElementById('lorem'));
	}

	gera.addEventListener("click", function() {  
  		gera.style.marginTop = '50px';	
  		geraBtn.innerHTML = 'Agregue mais valor ao seu código';
  		trazOPlaceholderQuePisca(1);
	})
})()
