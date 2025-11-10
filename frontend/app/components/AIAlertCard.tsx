'use client';
import { useState, useEffect } from 'react';
import { getAlert } from '../services/chatApi';

export default function AIAlertCard() {
  const [alert, setAlert] = useState('Loading...');

  useEffect(() => {
    getAlert().then(setAlert);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl p-6 shadow-lg col-span-2">
      <div className="flex gap-3">
        <span className="text-2xl">🤖</span>
        <div>
          <h3 className="font-semibold mb-2">AI Weather Alert</h3>
          <p className="text-sm opacity-90">{alert}</p>
        </div>
      </div>
    </div>
  );
}
