import { useState, useEffect } from 'react';
import insertAtRandomIndex from './functions/insertAtRandomIndex';
import nanoid from './functions/nanoid';
import Quiz from './Quiz';
import Intro from './Intro';

function App() {
  const [quiz, setQuiz] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(false); 

  const correctAnswersCount = quiz.filter(
    (elem) => elem.correctAnswer === elem.selectedAnswer
  ).length;
  const totalQuestions = quiz.length;

  const clicked = (e) => {
    const { value, id } = e.target;
    setQuiz((prev) =>
      prev.map((elem) =>
        elem.id === id
          ? { ...elem, selectedAnswer: value,}
          : elem
      )
    );
  };

  const newGame = () => {
    setQuizComplete(false);
    setFetchTrigger((prev) => !prev);
  };

  const startQuiz = () => {
    setGameStart(true);
    setQuizComplete(false);
  };

  const checkAnswers = () => {
    const selectedCount = quiz.filter((elem) => elem.selectedAnswer).length;
    const resultDiv = document.getElementById("result--div")
    if (selectedCount !== quiz.length) {
      alert("Answer all questions");
    } else {
      setQuizComplete(true);
    }
  };
  

  useEffect(() => {
    const fetchQuizData = async () => {
      console.log('Fetching quiz data...');
      try {
        const response = await fetch(
          'https://opentdb.com/api.php?amount=5'
        );
        const data = await response.json();
        const quizData = data.results.map((elem) => {
          const incorrectAnswers = elem.incorrect_answers;
          const answers = insertAtRandomIndex(
            incorrectAnswers,
            elem.correct_answer
          );
          return {
            question: elem.question,
            correctAnswer: elem.correct_answer,
            choices: answers,
            id: nanoid(),
            selectedAnswer: '',
          };
        });
        setQuiz(quizData);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };
    fetchQuizData();
  }, [fetchTrigger]); 

  const quizElements = quiz.map((data) => (
    <Quiz
      key={data.id}
      id={data.id}
      value={data.selectedAnswer}
      question={data.question}
      correctAnswer={data.correctAnswer}
      choices={data.choices}
      handleClick={(e) => clicked(e)}
      quizComplete={quizComplete}
    />
  ));

  return (
    <main>
      {!gameStart ? (
        <Intro handleClick={startQuiz} />
      ) : (
        <>
          {quizElements}
          {quizComplete ? (
            <div id='result--div'>
              <p id="result--paragraph">
                Du fikk {correctAnswersCount} av {totalQuestions} rette
              </p>
              <button onClick={newGame}>New game</button>
            </div>
          ) : (
            <button onClick={checkAnswers}>Check Answers</button>
          )}
        </>
      )}
    </main>
  );
};

export default App;
