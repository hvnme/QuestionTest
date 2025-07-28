import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

function App() {
  const questions = [
    {
      question: "Гормоном з високою прессорной активністю є:",
      options: [
        "кальцитонін",
        "адреналін",
        "інсулін",
        "альдостерон",
        "пролактин",
      ],
      correct: 2,
    },
    {
      question:
        "У пульмонологічної практиці препаратами, що викликають розвиток артеріальної гіпертензії, є:",
      options: [
        "пеніциліни",
        "бронхолітики",
        "кромогликат натрію",
        "препарати з солодки",
      ],
      correct: 1,
    },
    {
      question:
        "При лікуванні хронічних артритів розвиток артеріальної гіпертензії може викликати:",
      options: ["крізанол", "делагіл", "аспірин", "ібупрофен", "гідрокортизон"],
      correct: 2,
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    return date.toLocaleString("uk-UA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleAnswerClick = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      // Завершуємо тест
      setCurrentQuestionIndex(questions.length);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
  };

  return (
    <div className="App">
      {currentQuestionIndex >= questions.length ? (
        <div className="completion-card">
          <div className="quiz-header-inside">
            <div className="quiz-title">
              Офтальмологія. Використання лікарських засобів та дослідження. Ч.9
            </div>
            <div className="quiz-meta-row">
              <div className="progress-bar-container">
                <motion.div
                  className="progress-bar"
                  initial={{ width: 0 }}
                  animate={{ width: `100%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="question-number">
                Питання {questions.length}/{questions.length}
              </span>
              <span className="datetime">
                {formatDateTime(currentDateTime)}
              </span>
            </div>
          </div>
          <h2>Дякую за участь у вікторині!</h2>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="question-card"
          >
            <div className="quiz-header-inside">
              <div className="quiz-title">
                Офтальмологія. Використання лікарських засобів та дослідження.
                Ч.9
              </div>
              <div className="quiz-meta-row">
                <div className="progress-bar-container">
                  <motion.div
                    className="progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="question-number">
                  Питання {currentQuestionIndex + 1}/{questions.length}
                </span>
                <span className="datetime">
                  {formatDateTime(currentDateTime)}
                </span>
              </div>
            </div>
            <h2>
              {currentQuestionIndex + 1}. {currentQuestion.question}
            </h2>
            <div className="options-container">
              {currentQuestion.options.map((option, index) => {
                const letters = ["а", "б", "в", "г", "д", "е", "є", "ж", "з"];
                const letter = letters[index]
                  ? letters[index]
                  : String.fromCharCode(1072 + index); // fallback
                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`option-button ${
                      selectedOption === index ? "selected" : ""
                    }`}
                  >
                    <span
                      style={{
                        marginRight: 8,
                        textTransform: "lowercase",
                        fontWeight: "normal",
                      }}
                    >
                      {letter}.
                    </span>
                    {option}
                  </motion.button>
                );
              })}
            </div>
            {selectedOption !== null && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.14 }}
                onClick={handleNextQuestion}
                className="next-button"
              >
                {currentQuestionIndex === questions.length - 1
                  ? "Завершити вікторину"
                  : "Наступне запитання"}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default App;
