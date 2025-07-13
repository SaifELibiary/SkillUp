
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, Star, RotateCcw, Home, Share2, CheckCircle, XCircle, Clock } from 'lucide-react';

interface TestResults {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  answers: number[];
  questions: any[];
}

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<TestResults | null>(null);
  const [animateScore, setAnimateScore] = useState(0);

  useEffect(() => {
    const storedResults = localStorage.getItem('testResults');
    if (storedResults) {
      const parsedResults = JSON.parse(storedResults);
      setResults(parsedResults);
      
      // Animate score counter
      let counter = 0;
      const target = parsedResults.score;
      const increment = target / 30; // Animate over 30 frames
      
      const timer = setInterval(() => {
        counter += increment;
        if (counter >= target) {
          setAnimateScore(target);
          clearInterval(timer);
        } else {
          setAnimateScore(Math.floor(counter));
        }
      }, 50);

      return () => clearInterval(timer);
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading your results...</p>
        </div>
      </div>
    );
  }

  const percentage = Math.round((results.score / results.totalQuestions) * 100);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { level: 'Excellent', color: 'text-green-500', bgColor: 'bg-green-500' };
    if (percentage >= 80) return { level: 'Very Good', color: 'text-blue-500', bgColor: 'bg-blue-500' };
    if (percentage >= 70) return { level: 'Good', color: 'text-yellow-500', bgColor: 'bg-yellow-500' };
    if (percentage >= 60) return { level: 'Fair', color: 'text-orange-500', bgColor: 'bg-orange-500' };
    return { level: 'Needs Improvement', color: 'text-red-500', bgColor: 'bg-red-500' };
  };

  const performance = getPerformanceLevel(percentage);
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getFeedbackMessage = (percentage: number) => {
    if (percentage >= 90) return "Outstanding performance! You've mastered these concepts.";
    if (percentage >= 80) return "Great job! You have a strong understanding of the material.";
    if (percentage >= 70) return "Good work! Consider reviewing a few topics to strengthen your knowledge.";
    if (percentage >= 60) return "You're on the right track. Focus on practicing more to improve.";
    return "Keep learning and practicing. Every expert was once a beginner!";
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="w-20 h-20 bg-skillup-gradient rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Test Completed!</h1>
          <p className="text-xl text-muted-foreground">Here's how you performed</p>
        </div>

        {/* Score Circle */}
        <div className="flex justify-center mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative w-80 h-80">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-secondary"
              />
              {/* Progress circle */}
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="text-primary transition-all duration-2000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-6xl font-bold bg-skillup-gradient bg-clip-text text-transparent">
                {animateScore}
              </div>
              <div className="text-2xl text-muted-foreground">
                / {results.totalQuestions}
              </div>
              <div className={`text-lg font-semibold mt-2 ${performance.color}`}>
                {percentage}%
              </div>
            </div>
          </div>
        </div>

        {/* Performance Level */}
        <div className="text-center mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-2xl ${performance.bgColor}/10 ${performance.color} font-semibold text-lg`}>
            <Star className="h-6 w-6" />
            <span>{performance.level}</span>
          </div>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            {getFeedbackMessage(percentage)}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="skillup-card p-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-green-500">{results.score}</div>
            <div className="text-muted-foreground">Correct Answers</div>
          </div>
          
          <div className="skillup-card p-6 text-center">
            <XCircle className="h-8 w-8 text-red-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-red-500">{results.totalQuestions - results.score}</div>
            <div className="text-muted-foreground">Incorrect Answers</div>
          </div>
          
          <div className="skillup-card p-6 text-center">
            <Clock className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-blue-500">{formatTime(results.timeSpent)}</div>
            <div className="text-muted-foreground">Time Taken</div>
          </div>
        </div>

        {/* Question Review */}
        <div className="skillup-card p-8 mb-8 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <Star className="h-6 w-6 text-primary" />
            <span>Question Review</span>
          </h2>
          
          <div className="space-y-4">
            {results.questions.map((question, index) => {
              const userAnswer = results.answers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={index} className="border border-border rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-white" />
                      ) : (
                        <XCircle className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-2">{question.question}</p>
                      <div className="text-sm space-y-1">
                        <p className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                          Your answer: {question.options[userAnswer] || 'Not answered'}
                        </p>
                        {!isCorrect && (
                          <p className="text-green-600">
                            Correct answer: {question.options[question.correctAnswer]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '1s' }}>
          <Link
            to="/test"
            className="skillup-button flex items-center justify-center space-x-2"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Take Another Test</span>
          </Link>
          
          <Link
            to="/"
            className="px-6 py-3 rounded-xl border border-primary text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105 font-medium flex items-center justify-center space-x-2"
          >
            <Home className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'SkillUp Test Results',
                  text: `I scored ${results.score}/${results.totalQuestions} (${percentage}%) on SkillUp!`,
                  url: window.location.origin
                });
              } else {
                navigator.clipboard.writeText(`I scored ${results.score}/${results.totalQuestions} (${percentage}%) on SkillUp! Check it out at ${window.location.origin}`);
                alert('Results copied to clipboard!');
              }
            }}
            className="px-6 py-3 rounded-xl bg-secondary hover:bg-secondary/70 transition-all duration-300 hover:scale-105 font-medium flex items-center justify-center space-x-2"
          >
            <Share2 className="h-5 w-5" />
            <span>Share Results</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
