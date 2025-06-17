'use client';

import { useState } from 'react';
import { getCardRecommendations } from '@/lib/agents';

export default function Home() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({});
  const [result, setResult] = useState('');

  const questions = [
    { key: 'income', label: 'What is your monthly income?' },
    { key: 'spending', label: 'Where do you spend the most? (fuel, travel, dining)?' },
    { key: 'benefits', label: 'What benefits do you prefer? (cashback, travel)?' },
    { key: 'credit_score', label: 'Your credit score? (or type "unknown")' },
  ];

  const handleAnswer = (answer: string) => {
    const key = questions[step].key;
    setProfile({ ...profile, [key]: answer });
    if (step + 1 < questions.length) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
  const res = await fetch('/api/recommend', {
    method: 'POST',
    body: JSON.stringify({ profile }),
  });

  const data = await res.json();
  setResult(data.response);
};


  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Credit Card Advisor</h1>
      {result ? (
        <pre className="whitespace-pre-wrap text-black bg-gray-100 p-4 rounded shadow w-full max-w-2xl">
          {result}
        </pre>
      ) : (
        <div className="bg-white shadow-md p-6 rounded w-full max-w-md">
          <p className="mb-4 text-black font-medium">{questions[step].label}</p>
          <input
            type="text"
            onKeyDown={(e) => e.key === 'Enter' && handleAnswer((e.target as HTMLInputElement).value)}
            className="w-full text-black border px-3 py-2 rounded"
            placeholder="Type your answer and press Enter"
          />
        </div>
      )}
    </div>
  );
}
