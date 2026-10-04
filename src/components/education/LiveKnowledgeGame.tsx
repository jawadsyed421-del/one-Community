import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Users, 
  Trophy, 
  Clock, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Flame, 
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award
} from 'lucide-react';
import { MOCK_LIVE_GAME_QUESTIONS, MOCK_LIVE_LEADERBOARD } from '../../data/mockData';

interface LiveKnowledgeGameProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export const LiveKnowledgeGame: React.FC<LiveKnowledgeGameProps> = ({
  isOpen,
  onClose,
  userName
}) => {
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'post_question' | 'final'>('lobby');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(10);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [playerCount, setPlayerCount] = useState(128);
  const [liveLeaderboard, setLiveLeaderboard] = useState(MOCK_LIVE_LEADERBOARD);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  // Timer countdown when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, timer]);

  // Subtle live player count jitter for realism
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setPlayerCount((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const currentQuestion = MOCK_LIVE_GAME_QUESTIONS[currentQuestionIndex];

  const handleStartGame = () => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setTimer(10);
    setSelectedOption(null);
    setUserScore(0);
    setCorrectAnswersCount(0);
  };

  const handleTimeUp = () => {
    setGameState('post_question');
  };

  const handleSelectAnswer = (index: number) => {
    if (selectedOption !== null || gameState !== 'playing') return;
    setSelectedOption(index);

    const isCorrect = index === currentQuestion.correctIndex;
    if (isCorrect) {
      const points = 250 + timer * 25; // Speed bonus
      setUserScore((prev) => prev + points);
      setCorrectAnswersCount((prev) => prev + 1);

      // Update user position on leaderboard
      setLiveLeaderboard((prev) => {
        const updated = [...prev];
        const userEntry = updated.find(p => p.name.includes('(You)'));
        if (userEntry) {
          userEntry.score += points;
          userEntry.streak += 1;
        }
        return updated.sort((a, b) => b.score - a.score).map((p, idx) => ({ ...p, rank: idx + 1 }));
      });
    }

    setTimeout(() => {
      setGameState('post_question');
    }, 800);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < MOCK_LIVE_GAME_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setTimer(10);
      setGameState('playing');
    } else {
      setGameState('final');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Game Top Navigation */}
        <div className="p-4 border-b border-neutral-800 bg-neutral-950/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <span>Vifaq Live Knowledge Arena</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-950 text-red-400 font-mono flex items-center gap-1 border border-red-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  LIVE
                </span>
              </h3>
              <p className="text-[10px] text-neutral-400">Weekly Community Multiplayer Bowl</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-800/80 text-xs font-mono text-neutral-300">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>{playerCount} Active</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content depending on state */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 flex flex-col justify-center">

          {/* LOBBY STATE */}
          {gameState === 'lobby' && (
            <div className="text-center space-y-6 max-w-md mx-auto py-6">
              <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-xl shadow-amber-950/30 animate-bounce">
                <Trophy className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-neutral-800 text-[11px] font-mono text-neutral-300 border border-neutral-700">
                  GAME CODE: <strong className="text-amber-400">VFQ-782</strong>
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-3">
                  Islamic Heritage & Tech Bowl
                </h2>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                  Join 128 community peers in a live 4-question speed round testing history, computing, and ethics. Points awarded for accuracy and speed!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Player Name:</span>
                  <span className="font-semibold text-white">{userName}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Format:</span>
                  <span className="text-neutral-200">10 Seconds per question · Speed multiplier</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Category:</span>
                  <span className="text-emerald-400 font-medium">Ethics, Systems & History</span>
                </div>
              </div>

              <button
                onClick={handleStartGame}
                className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 group"
              >
                <span>Enter Live Arena</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* PLAYING STATE */}
          {gameState === 'playing' && (
            <div className="space-y-6">
              
              {/* Question metadata & Timer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-neutral-800 text-xs font-mono text-neutral-300">
                    Question {currentQuestionIndex + 1} of {MOCK_LIVE_GAME_QUESTIONS.length}
                  </span>
                  <span className="text-xs text-neutral-400">
                    Score: <strong className="text-amber-400 font-mono">{userScore}</strong>
                  </span>
                </div>

                {/* Countdown ring */}
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-sm font-bold ${
                  timer <= 3 ? 'bg-red-950 text-red-400 border border-red-500 animate-pulse' : 'bg-neutral-800 text-amber-400'
                }`}>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{timer}s</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-1000 ease-linear"
                  style={{ width: `${(timer / 10) * 100}%` }}
                />
              </div>

              {/* Question Card */}
              <div className="p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800">
                <h3 className="font-display text-base sm:text-lg font-semibold text-white leading-relaxed">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const letter = String.fromCharCode(65 + idx);

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(idx)}
                      disabled={selectedOption !== null}
                      className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                        isSelected
                          ? 'bg-amber-950/60 border-amber-400 text-white shadow-lg'
                          : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-200'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-md font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-amber-400 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {letter}
                      </span>
                      <span className="text-xs sm:text-sm font-medium leading-snug">
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selectedOption !== null && (
                <div className="text-center text-xs text-neutral-400 flex items-center justify-center gap-1.5 animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Answer locked! Awaiting round reveal...</span>
                </div>
              )}
            </div>
          )}

          {/* POST QUESTION REVEAL & LEADERBOARD */}
          {gameState === 'post_question' && (
            <div className="space-y-6">
              
              {/* Answer verification banner */}
              <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                selectedOption === currentQuestion.correctIndex
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
              }`}>
                {selectedOption === currentQuestion.correctIndex ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="text-sm font-semibold">
                    {selectedOption === currentQuestion.correctIndex ? 'Correct! Quick thinking.' : 'Time / Incorrect'}
                  </h4>
                  <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                    <strong>Correct Answer:</strong> {currentQuestion.options[currentQuestion.correctIndex]}
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    {currentQuestion.fact}
                  </p>
                </div>
              </div>

              {/* Live Leaderboard */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    Live Leaderboard
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">128 Players</span>
                </div>

                <div className="space-y-1.5">
                  {liveLeaderboard.slice(0, 4).map((p) => {
                    const isUser = p.name.includes('(You)');
                    return (
                      <div
                        key={p.rank}
                        className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                          isUser
                            ? 'bg-emerald-950/40 border-emerald-500/30 font-semibold'
                            : 'bg-neutral-900 border-neutral-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-5 font-mono text-xs ${
                            p.rank === 1 ? 'text-amber-400 font-bold' : p.rank === 2 ? 'text-neutral-300 font-bold' : 'text-neutral-500'
                          }`}>
                            #{p.rank}
                          </span>
                          <span className="text-neutral-200">{p.name}</span>
                          <span className="text-[10px] text-neutral-500">({p.city})</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-amber-400 flex items-center gap-0.5 font-mono">
                            <Flame className="w-3 h-3 fill-amber-400" />
                            {p.streak}x
                          </span>
                          <span className="font-mono text-neutral-100 font-bold">{p.score} pts</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-semibold text-xs flex items-center gap-2 transition-colors"
                >
                  <span>{currentQuestionIndex + 1 < MOCK_LIVE_GAME_QUESTIONS.length ? 'Next Question' : 'View Final Podium'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* FINAL PODIUM & WINNER STATE */}
          {gameState === 'final' && (
            <div className="text-center space-y-6 max-w-md mx-auto py-4">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border-2 border-amber-400 text-amber-400 flex items-center justify-center mx-auto shadow-2xl">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  Round Concluded
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                  Final Tournament Results
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Congratulations! You finished in the top percentile of this community bowl.
                </p>
              </div>

              {/* Stats card */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-center">
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase">Your Rank</p>
                  <p className="font-mono text-base font-bold text-amber-400">#2</p>
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase">Total Score</p>
                  <p className="font-mono text-base font-bold text-white">{userScore} pts</p>
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase">Accuracy</p>
                  <p className="font-mono text-base font-bold text-emerald-400">
                    {Math.round((correctAnswersCount / MOCK_LIVE_GAME_QUESTIONS.length) * 100)}%
                  </p>
                </div>
              </div>

              {/* Top 3 Podium */}
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-left space-y-2">
                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  🏆 Top Community Champions
                </p>
                {liveLeaderboard.slice(0, 3).map((champion) => (
                  <div key={champion.rank} className="flex items-center justify-between text-xs py-1 border-b border-neutral-800/60 last:border-none">
                    <div className="flex items-center gap-2">
                      <span className="w-4 text-amber-400 font-bold font-mono">#{champion.rank}</span>
                      <span className="font-medium text-neutral-200">{champion.name}</span>
                    </div>
                    <span className="font-mono font-bold text-neutral-300">{champion.score} pts</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleStartGame}
                  className="flex-1 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Play Again</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 text-xs font-bold transition-colors"
                >
                  Return to Platform
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
