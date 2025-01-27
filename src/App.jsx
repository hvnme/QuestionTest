import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

function App() {
  const questions = [
    {
      question: "Гормоном з високою прессорной активністю є:",
      options: ["кальцитонін", "адреналін", "інсулін", "альдостерон","пролактин"],
      correct: 2,
    },
    {
      question: "У пульмонологічної практиці препаратами, що викликають розвиток артеріальної гіпертензії, є:",
      options: ["пеніциліни", "бронхолітики", "кромогликат натрію", "препарати з солодки"],
      correct: 1,
    },
    {
      question: "При лікуванні хронічних артритів розвиток артеріальної гіпертензії може викликати:",
      options: ["крізанол", "делагіл", "аспірин", "ібупрофен","гідрокортизон"],
      correct: 2,
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerClick = (index) => {
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQuestion.correct) {
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setIsFinished(true);
      }
    }, 2000);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setIsFinished(false);
  };

  return (
    <div className="App">
      <div className="progress-bar-container">
        <motion.div
          className="progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
        <span className="question-number">
          Питання {currentQuestionIndex + 1}/{questions.length}
        </span>
      </div>

      {isFinished ? (
        <div className="results-card">
          <h2>Тест завершено!</h2>
          <p>Всього питань: {questions.length}</p>
          <p>Правильних відповідей: {correctAnswers}</p>
          <p>Неправильних відповідей: {wrongAnswers}</p>
          <button onClick={handleRestart} className="restart-button">
            Почати знову
          </button>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="question-card"
          >
            <h2>{currentQuestion.question}</h2>
            <div className="options-container">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`option-button ${
                    isAnswered
                      ? index === currentQuestion.correct
                        ? "correct"
                        : index === selectedOption
                        ? "wrong"
                        : ""
                      : ""
                  }`}
                  disabled={isAnswered}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default App;