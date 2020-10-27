setTimeout(function() {
  var matchLoop = setInterval(function() {
    waitForMatch();
  }, 0);

  function waitForMatch() {
    if (document.getElementsByClassName("MatchModeQuestionScatterTile") || document.getElementsByClassName("MatchModeQuestionGridBoard-tile")) {
      for (var F = setTimeout(";"), i = 0; i < F; i++) clearTimeout(i);
      var tiles = document.getElementsByClassName("MatchModeQuestionScatterTile");
      var colors = ["#FF0000", "#FF0000", "#FF6600", "#FF6600", "#FFFF00", "#FFFF00", "#00FF00", "#00FF00", "#00FFFF", "#00FFFF", "#0033FF", "#0033FF", "#FF00FF", "#FF00FF", "#CC00FF", "#CC00FF", "#6E0DD0", "#6E0DD0", "#C0C0C0", "#C0C0C0", "#FFFFFF", "#FFFFFF", "#A52A2A", "#A52A2A", "#F6CFFF", "#F6CFFF", "#CFD9FF", "#CFD9FF", "#FBFFA3", "#FBFFA3", "#FFD1A3", "#FFD1A3", "#710000", "#710000"];
      for (var i = 0; i < tiles.length; i++) {
        tiles[i].style.backgroundColor = colors[i];
        for (var j = 0; j < tiles.length; j++) {
          if (tiles[j].childNodes[0].innerHTML == findAnswerGlobal(tiles[j].childNodes[0].innerHTML)) {
            tiles[j].style.backgroundColor = colors[i];
          }
        }
      }
      clearTimeout(matchLoop);
    }
  }
}, 500);
function findAnswerGlobal(question) {
			if (Quizlet.assistantModeData !== undefined) { //Quizlet.assistantModeData.terms
				return getAnswer(Quizlet.assistantModeData.terms, question);
			} else if (Quizlet.learnGameData !== undefined) { //Quizlet.learnGameData.allTerms
				return getAnswer(Quizlet.learnGameData.allTerms, question);
			} else if (Quizlet.testModeData !== undefined) { //Quizlet.testModeData.terms
				return getAnswer(Quizlet.testModeData.terms, question);
			} else if (Quizlet.spellModeData !== undefined) { //Quizlet.spellModeData.spellGameData.termsById
				return getAnswer(Quizlet.spellModeData.spellGameData.termsById, question);
			} else if (Quizlet.matchModeData !== undefined) { //Quizlet.matchModeData.terms
				return getAnswer(Quizlet.matchModeData.terms, question);
			} else if (Quizlet.gravityModeData !== undefined) { //Quizlet.gravityModeData.terms
				return getAnswer(Quizlet.gravityModeData.terms, question);
			} else {
				return 0;
			}

			function getAnswer(s, t) {
				var e = s;
				if (t.indexOf("_") != "-1") {
					if (t.slice(-1) == "_") { //Underscore at end
						for (var i=0; i<e.length; i++) {
							if (e[i].definition.indexOf(getClass("qDef lang-en TermText")[0].innerHTML.split("_")[0]) != "-1") {
								return e[i].word;
							} else if (e[i].word.indexOf(getClass("qDef lang-en TermText")[0].innerHTML.split("_")[0]) != "-1") {
								return e[i].definition;
							}
						}
					} else if (t[0] == "_") {
						for (var i=0; i<e.length; i++) { //Underscore at start
							if (e[i].definition.indexOf(getClass("qDef lang-en TermText")[0].innerHTML.split("_").slice(-1)[0]) != "-1") {
								return e[i].word;
							} else if (e[i].word.indexOf(getClass("qDef lang-en TermText")[0].innerHTML.split("_").slice(-1)[0]) != "-1") {
								return e[i].definition;
							}
						}
					} else {
						for (var i=0; i<e.length; i++) { //Underscore in middle
							if (e[i].definition.indexOf(getClass("qDef lang-en TermText")[0].innerHTML.split("_").slice(-1)[0]) != "-1" && e[i].definition.indexOf(getClass("qDef lang-en TermText")[0].innerHTML.split("_")[0]) != "-1") {
								return e[i].word;
							} else if (e[i].word.indexOf(getClass("qDef lang-en TermText")[0].innerHTML.split("_").slice(-1)[0]) != "-1" && e[i].word.indexOf(getClass("qDef lang-en TermText")[0].innerHTML.split("_")[0]) != "-1") {
								return e[i].definition;
							}
						}
					}
				}
				var answers = [];
				for (var i=0; i<e.length; i++) {
					e[i].definition = e[i].definition.replace("\n", "<br>");
					e[i].word = e[i].word.replace("\n", "<br>");
					if (t == e[i].word) {
						answers.push(e[i].definition);
					} else if (t == e[i].definition) {
						answers.push(e[i].word);
					}
				}
				return answers[Math.floor(Math.random() * answers.length)];
			}
		}
