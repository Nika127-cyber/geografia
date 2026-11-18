function openRegion(evt, regionName) {
    const contents = document.getElementsByClassName("region-content");
    for (let i = 0; i < contents.length; i++) {
        contents[i].classList.remove("active");
    }

    const buttons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }

    document.getElementById(regionName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

const quizData = [
    {
        question: "1. რომელია პერუს უმაღლესი მწვერვალი?",
        options: ["აკონკაგუა", "უასკარანი", "ჩიმბორასო", "კოტოპაქსი"],
        answer: 1
    },
    {
        question: "2. პერუს ტერიტორიის უდიდეს ნაწილს (დაახლოებით 60%) რომელი ბუნებრივი რეგიონი იკავებს?",
        options: ["კოსტა (სანაპირო)", "სიერა (ანდები)", "სელვა (ამაზონია)", "ალტიპლანო"],
        answer: 2
    },
    {
        question: "3. რომელი ტბა მდებარეობს პერუსა და ბოლივიის საზღვარზე, ზღვის დონიდან 3,812 მეტრზე?",
        options: ["ტბა პოოპო", "ტბა ტიტიკაკა", "ტბა მარაკაიბო", "ტბა ხუნინი"],
        answer: 1
    },
    {
        question: "4. რომელი ოკეანე აკრავს პერუს დასავლეთიდან?",
        options: ["ატლანტის ოკეანე", "ინდოეთის ოკეანე", "წყნარი ოკეანე", "ჩრდილოეთის ყინულოვანი ოკეანე"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const q = quizData[currentQuestion];
    document.getElementById("question-text").textContent = q.question;
    const optionsDiv = document.getElementById("options-container");
    optionsDiv.innerHTML = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("next-btn").style.display = "none";

    q.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(idx, btn);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, btnElement) {
    const q = quizData[currentQuestion];
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach(b => b.disabled = true);

    const feedback = document.getElementById("feedback");
    if (selectedIndex === q.answer) {
        btnElement.classList.add("correct");
        feedback.textContent = "სწორია! 👏";
        feedback.style.color = "#065F46";
        score++;
    } else {
        btnElement.classList.add("wrong");
        buttons[q.answer].classList.add("correct");
        feedback.textContent = "არასწორია. სწორი პასუხი მონიშნულია მწვანედ.";
        feedback.style.color = "#991B1B";
    }

    document.getElementById("next-btn").style.display = "inline-block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        const container = document.getElementById("quiz-container");
        container.innerHTML = `
            <h3>ვიქტორინა დასრულდა!</h3>
            <p style="margin: 15px 0; font-size: 1.1rem;">თქვენ დააგროვეთ <strong>${score}</strong> ქულა <strong>${quizData.length}</strong>-დან.</p>
            <button class="btn btn-small" onclick="restartQuiz()">თავიდან დაწყება</button>
        `;
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    const container = document.getElementById("quiz-container");
    container.innerHTML = `
        <p id="question-text" class="question"></p>
        <div id="options-container" class="options"></div>
        <p id="feedback" class="feedback"></p>
        <button id="next-btn" class="btn btn-small" onclick="nextQuestion()" style="display:none;">შემდეგი კითხვა</button>
    `;
    loadQuestion();
}

document.addEventListener("DOMContentLoaded", loadQuestion);
