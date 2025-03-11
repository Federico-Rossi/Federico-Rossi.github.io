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
        q13: "È prodotto dall'organismo umano"
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
