function trazOPlaceholderQuePisca(quantos) {
  var lorem = new Lorem;
  lorem.type = Lorem.TEXT;
  lorem.query = quantos + 'p';
  lorem.createLorem(document.getElementById('lorem'));
}


document.getElementById('gera').addEventListener("click", function() {
  trazOPlaceholderQuePisca(2);
});
