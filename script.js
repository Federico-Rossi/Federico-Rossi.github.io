function checkAnswers() {
    let score = 0;
    const answers = {
        q1: "È un polimero del glucosio privo di ramificazioni",
        q2: "glucosio-6-fosfatasi",
        q3: "Tutte le risposte indicate sono corrette",
        q4: "La fosforilazione, inattivazione, della glicogeno fosforilasi",
        q5: "Glicogenolisi",
        q6: "Fegato",
        q7: "Fosfoenolpiruvato carbossichinasi, fruttosio-bisfosfatasi e glucosio-6-fosfatasi",
        q8: "La produzione di NADPH/H+",
        q9: "L'azione della glucosio 6-fosfato deidrogenasi",
        q10: "Consiste in 10 reazioni",
        q11: "Acetil-CoA",
        q12: "Acqua",
        q13: "È prodotto dall'organismo umano",
        q14: "L'energia libera accumulata nel gradiente elettrochimico generato dalla catena di trasporto degli elettroni",
        q15: "Catalizza l'ossidazione del citocromo c e la riduzione dell'ossigeno molecolare ad acqua",
        q16: "Solo la subunità β catalizza la fosforilazione dell'ADP",
        q17: "L'aumento dei livelli di ADP",
        q18: "Fosforila l'ADP in ATP senza bisogno di ossigeno",
        q19: "Immediatamente in tutti i casi di contrazione rapida",
        q20: "Forme parzialmente ridotte dell'ossigeno molecolare",
        q21: "Non esistono meccanismi fisiologici in grado di ridurre le specie pssidanti prevenendone il danno",
        q22: "AMPK",
        q23: "Si localizza nel nucleo della cellula dove regola l'espressione genetica",
        q24: "Rappresenta l'insieme di tutte le molecole presenti in un campione biologico",
        q25: "Transcrittoma",
        q26: "Dall'acido citrico prodotto dalla condensazione di ossalacetato e piruvato decarbossilato",
        q27: "Media il trasferimento dell'anione bicarbonato all'acetil-CoA per formare malonil-CoA",
        q28: "Glucagone",
        q29: "Acido stearico",
        q30: "Alanina, glicina e valina",
        q31: "Avviene in tutti i tessuti",
        q32: "Alanina dai muscoli e glutammina da tutti gli altri",
        q33: "È il prodotto di condesnsazione dell'anidride carbonica con l'ammoniaca",
        q34: "La quantità di energia richiesta per mantenere l'organismo nella condizione di inattività",
        q35: "2200 kcal per le femmine e 2500 kcal per i maschi",
        q36: "Le proteine hanno dimesioni elevate per agire da ormoni",
        q37: "Attiva la glicogenosintesi",
        q38: "104, disolfuro, K+/Ca2++",
        q39: "Dopo 24 ore di digiuno",
        q40: "Il secondo messaggero cAMP",
        q41: "Aumentano il metabolismo lipidico",
        q42: "Tessuto adiposo",
        q43: "Misurazione difettosa",
        q44: "Richiede l'espressione della proteina UCP",
        q45: "Si, in condizioni di digiuno prolungato",
        q46: "Identifica la condizione nella quale il lattato nel sangue raggiunge i 4 mM.",
        q47: "70 ml/kg/min con 170 bpm",
        q48: "Sono agonisti del testosterone",
        q49: "Tutte le affermazioni indicate sono false",
        q50: "RDA, AI, EAR, UL",
        q51: "isoleucina, istidina, leucina, lisina, metionina, fenilalanina, treonina, triptofano, valina",
        q52: "Nessuno",
        q53: "È attivo biologicamente solo nella forma L",
        q54: "Carnosina",
        q55: "sono acidi grassi essenziali",
        q56: "Modifica il bilancio energetico dell'organismo",
        q57: "AMPK - mTOR",
        q58: "Anidride carbonica",
        q59: "Co-trasporto con Na+",
        q60: "Agiscono da antagonisti degli estrogeni",
        q61: "carotenoidi, glucosilonati e polifenali"
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
