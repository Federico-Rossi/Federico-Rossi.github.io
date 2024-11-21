function checkAnswers() {
    let score = 0;
    const answers = {
        q1: "Elettrone",
        q2: "Protone (+1), neutrone (0) ed elettrone (-1)",
        q3: "2 paia",
        q4: "Neutroni",
        q5: "legami covalenti non polari/apolari",
        q6: "Br2",
        q7: "1, 2 e 3",
        q8: "ΔG° < 0",
        q9: "La reazione è esoergonica",
        q10: "pH = log [H+]",
        q11: "Un'ammina primaria e un acido carbossilico",
        q12: "Conferiscono al composto una reattività tipica e simile a quella di altri composti contenenti lo stesso gruppo",
        q13: "Non è sovrapponibile alla sua immagine speculare",
        q14: "velocemente; aumenta; l’energia di attivazione",
        q15: "Due enantiomeri hanno diverse proprietà fisiche",
        q16: "1, 2, 3",
        q17: "III",
        q18: "Il pH a cui un amminoacido, un polipeptide, o una proteina non hanno carica netta",
        q19: "una carica netta positiva",
        q20: "-1",
        q21: "crea caratteri di parziale doppio legame tra tre atomi",
        q22: "Il folding di un polipeptide in una struttura globulare risulta internamente arricchito in aminoacidi idrofobici",
        q23: "sono polimeri formati da legami ammidici tra il carbossile e i gruppi amminici di alfa-aminoacidi",
        q24: "Il carattere di parziale doppio legame del legame carbonio-azoto",
        q25: "è possibile la libera rotazione attorno al legame peptidico",
        q26: "Lo stato nativo di una proteina è la forma meno stabile in cellula e, di conseguenza, si denatura facilmente",
        q27: "Tra le molecole proteiche, le proteine fibrose sono generalmente più solubili di quelle globulari",
        q28: "Legame disolfuro",
        q29: "L’alfa elica è stabilizzata principalmente da interazioni idrofobiche",
        q30: "Poiché i protoni che partecipano al legame peptidico non sono dissociabili, le cariche di una catena polipeptidica sono dovute solo al gruppo Nterminale e a quello C-terminale e alle catene laterali dei singoli amminoacidi",
        q31: "A livello periferico la liberazione dell’ossigeno da parte dell’emoglobina è favorita da un abbassamento del pH",
        q32: "Gli ioni idrogeno vengono rilasciati dall'emoglobina ai tessuti",
        q33: "Presenta una maggior affinità per l'ossigeno rispetto all'emoglobina",
        q34: "O2",
        q35: "eme come gruppo prostetico",
        q36: "al legame di coordinazione del componente ferro dell'eme",
        q37: "non possiede struttura quaternaria ma struttura terziaria",
        q38: "Curva 1, perché indica una maggiore affinità per l’ossigeno",
        q39: "Un monomero",
        q40: "Racchiude il gruppo eme, assieme allo ione Fe2+, che permettono la funzione della proteina",
        q41: "Gli enzimi sono catalizzatori biologici che accelerano le reazioni biochimiche abbassando l'energia di attivazione",
        q42: "Tutti i metodi sono usati per regolare l’attività di un enzima",
        q43: "L’enzima mostra cooperatività, in termini di legame, col substrato",
        q44: "La concentrazione del substrato alla quale la reazione decorre a ½ Vmax",
        q45: "Perché l’enzima si satura",
        q46: "Il legame ad un sito modifica l’affinità di legame in altri siti",
        q47: "Il glucosio è un aldoesoso",
        q48: "β-1,4",
        q49: "È un monosaccaride e contiene il gruppo CHO",
        q50: "È un polimero del glucosio contenente legami alfa-glicosidici",
        q51: "Cn(H2O)n",
        q52: "DNA e RNA",
        q53: "Nella forma lineare possiede 3 carboni asimmetrici",
        q54: "serve come fonte di combustibile per la sintesi di ATP in questo tessuto",
        q55: "L’amilosio è un polisaccaride a catena lineare, mentre l’amilopectina è un polisaccaride ramificato",
        q56: "I, III, IV",
        q57: "Mostrano una piegatura a livello della catena idrofobica",
        q58: "Contengono una porzione idrofiliica e una idrofobica",
        q59: "Presentano un doppio legame tra il terz’ultimo e il quart’ultimo atomo di carbonio più distante dal carbonio carbossilico",
        q60: "1 molecola di glicerolo e 3 molecole di acidi grassi",
        q61: "doppio legame; palmitoleico; minore",
        q62: "I lipidi sono molecole altamente idrofiliche, quindi viaggiano liberamente nel sangue",
        q63: "Mantiene la corretta fluidità dei vasi sanguigni",
        q64: "Presenza di un gruppo aminico",
        q65: "I lipidi coesistono uno accanto all’altro come unità discrete e le proteine fluttuano nel doppio strato, spostandosi lungo il piano della membrana",
        q66: "Alle differenze nella composizione proteica e lipidica della faccia esterna ed interna del doppio strato di membrana",
        q67: "Antiporto attivo",
        q68: "Trasporto attivo",
        q69: "Il gradiente elettrochimico è generato dalla diversa concentrazione degli ioni ai due lati della membrana",
        q70: "Il potenziale di membrana è in parte dovuto al fatto che ci sono più cariche positive all’interno della cellula rispetto all’ambiente extracellulare",
        q71: "Fosfolipidi, colesterolo e proteine"
    };

    const totalQuestions = Object.keys(answers).length; // Numero totale di domande

    // Disabilita tutti i radio buttons
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => radio.disabled = true);

    for (const [question, correctAnswer] of Object.entries(answers)) {
        const userAnswer = document.querySelector(`input[name="${question}"]:checked`);
        const feedbackElement = document.getElementById(`${question}-feedback`);

        if (userAnswer) {
            if (userAnswer.value === correctAnswer) {
                feedbackElement.textContent = "Risposta corretta!";
                feedbackElement.className = "feedback correct";
                score += 1;
            } else {
                feedbackElement.textContent = `Risposta errata. La risposta corretta è: ${correctAnswer}`;
                feedbackElement.className = "feedback incorrect";
            }
        } else {
            feedbackElement.textContent = "Nessuna risposta selezionata.";
            feedbackElement.className = "feedback incorrect";
        }
    }

    // Calcolo della percentuale
    const percentage = ((score / totalQuestions) * 100).toFixed(2);

    // Mostra il risultato con percentuale
    const resultElement = document.getElementById("result");
    resultElement.innerText = `Hai totalizzato ${score} su ${totalQuestions} punti (${percentage}%).`;
    resultElement.classList.add("show"); // Aggiunge la classe per l'animazione

    document.getElementById("resetButton").style.display = "inline-block";
    window.scrollTo(0, document.body.scrollHeight);
}



function resetQuiz() {
    // Riabilita tutti i radio buttons
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => radio.disabled = false); // Riabilita i radio button

    radios.forEach(radio => {
        radio.checked = false; // Deseleziona tutte le risposte
        radio.parentElement.style.color = ""; // Reset del colore
    });

    // Nascondi il risultato e resetta il punteggio
    const resultElement = document.getElementById("result");
    resultElement.textContent = ""; // Pulisce il testo del punteggio
    resultElement.classList.remove("show"); // Rimuove la classe che mostra l'animazione

    // Ripristina lo stato del pulsante di reset
    document.getElementById("resetButton").style.display = "none";

    // Pulisce i feedback delle domande
    const feedbackElements = document.querySelectorAll('.feedback');
    feedbackElements.forEach(feedback => feedback.textContent = ""); // Pulisce il feedback

    // Scrolla alla parte superiore della pagina
    window.scrollTo(0, 0);
}

// Mostra o nasconde il pulsante in base allo scroll
window.onscroll = function() {
    const scrollButton = document.getElementById("scrollButton");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollButton.style.display = "flex";
        scrollButton.innerHTML = "&#9650;"; // Freccia su (Unicode: U+9650)
    } else {
        scrollButton.style.display = "flex";
        scrollButton.innerHTML = "&#9660;"; // Freccia giù (Unicode: U+9660)
    }
};

// Funzione per scorrere su o giù
function scrollPage() {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    if (currentScroll > 100) {
        // Se si è scesi, torna su
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Se si è in cima, scendi in fondo
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
}
