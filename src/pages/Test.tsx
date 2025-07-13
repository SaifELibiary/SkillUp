
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { getRandomQuestions, Question, getDifficultyColor } from '../data/questions';

const Test = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize test
    const testQuestions = getRandomQuestions(5);
    setQuestions(testQuestions);
    setSelectedAnswers(new Array(testQuestions.length).fill(-1));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Timer countdown
    if (timeLeft > 0 && questions.length > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinishTest();
    }
  }, [timeLeft, questions.length]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinishTest();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinishTest = () => {
    const score = calculateScore();
    const timeSpent = 300 - timeLeft;
    
    // Store results in localStorage for the results page
    localStorage.setItem('testResults', JSON.stringify({
      score,
      totalQuestions: questions.length,
      timeSpent,
      answers: selectedAnswers,
      questions: questions
    }));
    
    navigate('/results');
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === questions[index]?.correctAnswer ? score + 1 : score;
    }, 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Preparing your test...</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold">Skill Assessment</h1>
            <div className="flex items-center space-x-2 bg-secondary/50 px-4 py-2 rounded-xl">
              <Clock className="h-5 w-5 text-primary" />
              <span className={`font-mono text-lg font-semibold ${timeLeft < 60 ? 'text-red-500' : 'text-foreground'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-3 mb-6">
            <div 
              className="bg-skillup-gradient h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Question Card */}
        <div className="skillup-card p-8 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-6">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {currentQ.category}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQ.difficulty)} bg-current/10`}>
              {currentQ.difficulty.charAt(0).toUpperCase() + currentQ.difficulty.slice(1)}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold mb-8 leading-relaxed">
            {currentQ.question}
          </h2>

          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 hover:scale-[1.02] ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-border hover:border-primary/50 hover:bg-secondary/30'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-primary bg-primary'
                      : 'border-border'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <span className="text-base">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className="px-6 py-3 rounded-xl border border-border hover:bg-secondary/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex space-x-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-full transition-all duration-300 ${
                  index === currentQuestion
                    ? 'bg-primary text-white'
                    : selectedAnswers[index] !== -1
                    ? 'bg-green-500 text-white'
                    : 'bg-secondary hover:bg-secondary/70'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleFinishTest}
              disabled={selectedAnswers[currentQuestion] === -1}
              className="skillup-button flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Finish Test</span>
              <CheckCircle className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQuestion] === -1}
              className="skillup-button flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to restart the test? All progress will be lost.')) {
                window.location.reload();
              }
            }}
            className="inline-flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Restart Test</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;
