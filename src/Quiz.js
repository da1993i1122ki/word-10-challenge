import React, { useState, useEffect } from "react";

export default function Quiz({ words, onBack }) {
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);

  const currentWord = words[current];

  const handleSubmit = () => {
    const isCorrect = answer.trim().toLowerCase() === currentWord.word.toLowerCase();
    if (isCorrect) setScore(score + 1);
    setResults([...results, { ...currentWord, answer, isCorrect }]);
    setAnswer("");
    setCurrent(current + 1);
  };

  if (current >= 10) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">結果発表！</h2>
        <p>得点: {score} / 10</p>
        <ul className="mt-4 space-y-2">
          {results.map((r, i) => (
            <li key={i} className={r.isCorrect ? "text-green-600" : "text-red-600"}>
              {i + 1}. {r.日本語} → {r.answer}（正解: {r.word}）
            </li>
          ))}
        </ul>
        <button className="mt-4" onClick={onBack}>もう一度</button>
      </div>
    );
  }

  return (
    <div>
      <p>{current + 1} / 10</p>
      <p className="mb-2">次の日本語を英語に：<strong>{currentWord.日本語}</strong></p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="border p-1"
      />
      <button onClick={handleSubmit} className="ml-2">答える</button>
    </div>
  );
}
