var _ = require('../underscore.js');

var domTools = require('../dom.js');
var el = domTools.el;
var append = domTools.append;
var remove = domTools.remove;

var t = {
    languageCard: function (languageData, addLanguageCallback) {
        var card = el('div', 'language-card');
        var title = el('h3');
        title.innerText = languageData.name.toUpperCase();
        append(card, title);
        
        var button = el('button');
       
        if (!languageData.active) {
            button.innerText = 'study ' + languageData.name;
            button.addEventListener('click', function () {
                // at some point add a check to make sure the call succeeded
                addLanguageCallback(languageData.abbreviation);
                card.classList.add('active');
                remove(button);
            });
            append(card, button);
        } else {
            button.innerText = 'study ' + languageData.name;
            button.addEventListener('click', function () {
                // at some point add a check to make sure the call succeeded
                addLanguageCallback(languageData.abbreviation);
                remove(button);
            });
            card.classList.add('active');
            append(card, button);
        }
        
        return card;
    }
};

module.exports = function (coreLogic, routes) {
    var container = el('div', 'lexponential-container');
    coreLogic.getLanguages(success, failure);
    return container;

    function success (languages) {
        _.each(languages, function (languageData) {
            append(container, t.languageCard(languageData, function (languageAbbreviation) {
              coreLogic.addLanguage(languageAbbreviation);
              routes.languages();
            }));
        });
    };

    function failure (error) {
        console.log(error)
    };
};

