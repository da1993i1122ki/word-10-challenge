import React, { useState } from "react";
import Quiz from "./Quiz";

export default function App() {
  const [step, setStep] = useState(0);
  const [grade, setGrade] = useState("");
  const [unit, setUnit] = useState("");
  const [words, setWords] = useState([]);

  const loadWords = async (g, u) => {
    const res = await fetch("/data.json");
    const json = await res.json();
    return json[g][u];
  };

  const startQuiz = async () => {
    const w = await loadWords(grade, unit);
    setWords(w);
    setStep(1);
  };

  const grades = ["中1", "中2", "中3"];
  const units = grade ? ["Unit1"] : [];

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">単語チャレンジ10</h1>
      {step === 0 && (
        <div className="space-y-4">
          <div>
            <label>学年:</label>
            <select onChange={(e) => setGrade(e.target.value)} className="ml-2">
              <option value="">選択してください</option>
              {grades.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          {grade && (
            <div>
              <label>出題範囲:</label>
              <select onChange={(e) => setUnit(e.target.value)} className="ml-2">
                <option value="">選択してください</option>
                {units.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          )}
          {unit && <button onClick={startQuiz}>スタート</button>}
        </div>
      )}
      {step === 1 && <Quiz words={words} onBack={() => setStep(0)} />}
    </div>
  );
}
