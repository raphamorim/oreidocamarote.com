var Lorem;
(function() {

    //Create a class named Lorem and constructor
    Lorem = function() {
        //Default values.
        this.type = null;
        this.query = null;
        this.data = null;
    };
    //Static variables
    Lorem.IMAGE = 1;
    Lorem.TEXT = 2;
    Lorem.TYPE = {
        PARAGRAPH: 1,
        SENTENCE: 2,
        WORD: 3
    };
    //Words to create lorem ipsum text.
    Lorem.WORDS = [
        "lorem", "ipsum", "valor", "champagne", "amet,", "consectetur", "adipiscing", "elit", "valor", "aliquam,", "agrega", "sit", "amet", "luctus", "quando a pessoa tá na pista ela é mais um.", "lectus", "magna", "fringilla", "urna,", "porttitor", "rhoncus", "dolor", "purus", "agrega seu carro, agrega seu camarote, agrega sua bebida, agrega a tudo!", "a conta você sabe como é, né?", "praesent", "elementum", "facilisis", "dev de AngularJS tem que ter Instagram, ", "vel", "fringilla", "com meus bens", "agora quando fica no camarote, ", "você pede champanhe, elas vêm ‘toda’ com foooogo", "nulla", "facilisi", "etiam", "dignissim", "acho que é pesado", "quis", "enim", "lobortis", "scelerisque", "cheio de mulheres bonitas", "dui", "o camarote é uma questão de status.", "traz a bebida que pisca", "ornare", "quam", "viverra", "orci", "sagittis", "eu", "volutpat", "odio", "facilisis", "cade o commit que pisca?", "sit", "amet", "massa", "vitae", "tortor", "condimentum", "lacinia", "são status", "sabe uma coisa? ", "eros", "ela pode variar de R$ 5 mil até o infinito.", "ac", "quem tá no camarote tem que ter um Instagram.", "framework teco-teco", "orci", "dapibus", "até o infinito", "balada com segurança", "iaculis", "nunc", "ter um Boing", "augue", "no banheiro!,", "até por causa da", "vitae", "ter um Instagram", "eu,", "eu já transei com mulher na balada!", "não é legal", "felis", "minha integridade física", "com meu american express", "odio", "pellentesque", "mas vejo isso como um inveja", "piloto de teco-teco para pilotar", "InDesign agrega", "Dreamweaver não", "egestas", "egestas", "fringilla", "phasellus", "faucibus", "scelerisque", "eleifend", "desenvolvedor transante na balada", "pretium", "vulputate", "sapien", "nec", "sagittis", "aliquam", "malesuada", "bibendum", "arcu", "vitae", "elementum"
    ];
    //random integer method.
    Lorem.prototype.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    //text creator method with parameters: how many, what
    Lorem.prototype.createText = function(count, type) {
        switch (type) {
            //paragraphs are loads of sentences.
            case Lorem.TYPE.PARAGRAPH:
                var paragraphs = new Array;
                for (var i = 0; i < count; i++) {
                    var paragraphLength = this.randomInt(10, 20);
                    var paragraph = this.createText(paragraphLength, Lorem.TYPE.SENTENCE);
                    paragraphs.push('<p>'+paragraph+'</p>');
                }
                return paragraphs.join('\n');
                break;
            //sentences are loads of words.
            case Lorem.TYPE.SENTENCE:
                var sentences = new Array;
                for (var i = 0; i < count; i++) {
                    var sentenceLength = this.randomInt(5, 10);
                    var words = this.createText(sentenceLength, Lorem.TYPE.WORD).split(' ');
                    words[0] = words[0].substr(0, 1).toUpperCase() + words[0].substr(1);
                    var sentence = words.join(' ');

                    sentences.push(sentence);
                }
                return (sentences.join('. ') + '.').replace(/(\.\,|\,\.)/g, '.');
                break;
            //words are words
            case Lorem.TYPE.WORD:
                var wordIndex = this.randomInt(0, Lorem.WORDS.length - count - 1);

                return Lorem.WORDS.slice(wordIndex, wordIndex + count).join(' ').replace(/\.|\,/g, '');
                break;
        }
    };
    Lorem.prototype.createLorem = function(element) {

        var lorem = new Array;
        var count;

        if (/\d+-\d+[psw]/.test(this.query)){
            var range = this.query.replace(/[a-z]/,'').split("-");
            count = Math.floor(Math.random() * parseInt(range[1])) + parseInt(range[0]);
        }else{
            count = parseInt(this.query);
        }

        if (/\d+p/.test(this.query)) {
            var type = Lorem.TYPE.PARAGRAPH;
        }
        else if (/\d+s/.test(this.query)) {
            var type = Lorem.TYPE.SENTENCE;
        }
        else if (/\d+w/.test(this.query)) {
            var type = Lorem.TYPE.WORD;
        }

        lorem.push(this.createText(count, type));
        lorem = lorem.join(' ');

        if (element) {
            if (this.type == Lorem.TEXT)
                element.innerHTML += lorem;
            else if (this.type == Lorem.IMAGE) {
                //TODO: for now, using lorempixum.
                var path = '';
                var options = this.query.split(' ');
                if (options[0] == 'gray') {
                    path += '/g';
                    options[0] = '';
                }
                if (element.getAttribute('width'))
                    path += '/' + element.getAttribute('width');

                if (element.getAttribute('height'))
                    path += '/' + element.getAttribute('height');

                path += '/' + options.join(' ').replace(/(^\s+|\s+$)/, '');
                element.src = 'http://lorempixum.com'+path.replace(/\/\//, '/');
            }
        }

        if (element == null)
            return lorem;
    };

    //Register as jQuery
    if (typeof jQuery != 'undefined') {
        (function($) {
            $.fn.lorem = function() {
                $(this).each(function() {
                    var lorem = new Lorem;
                    lorem.type = $(this).is('img') ? Lorem.IMAGE : Lorem.TEXT;
                    //data-lorem can be taken with data function (thanks to http://forrst.com/people/webking)
                    lorem.query = $(this).data('lorem');
                    lorem.createLorem(this);
                })
            };

            //If developer run this javascript, then we can run the lorem.js
            $(document).ready(function() {
                $('[data-lorem]').lorem();
            });
        })(jQuery);
    }

})();
