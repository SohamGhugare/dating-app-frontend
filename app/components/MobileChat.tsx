"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

import arrow from "@/public/arrow.svg"
import info from "@/public/info.svg"
import send from "@/public/send.svg"
import LoadingDots from './LoadingDots';

interface Message {
  type: 'bot' | 'user';
  text: string;
}

function MobileChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchQuestion([], []);
  }, []);

  const fetchQuestion = async (previousQuestions: string[], previousAnswers: string[]) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/generate_question', {
        previous_questions: previousQuestions,
        previous_answers: previousAnswers
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const newMessage: Message = { type: 'bot', text: response.data.question };
      setMessages(prevMessages => [...(prevMessages || []), newMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { type: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    const previousQuestions = newMessages.filter(m => m.type === 'bot').map(m => m.text);
    const previousAnswers = newMessages.filter(m => m.type === 'user').map(m => m.text);

    fetchQuestion(previousQuestions, previousAnswers);
  };

  return (
    <div className="sm:hidden flex flex-col h-screen bg-[#F9ECDA]">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <Image 
            src={arrow}
            alt={"arrow"}
        />
        <h1 className="text-lg font-bold">Capybara</h1>
        <Image 
            src={info}
            alt={"info"}
        />
      </div>
      <div className="flex flex-col flex-grow p-4 space-y-4 overflow-auto">
        <div className="self-center text-sm bg-[#FFF6E9] py-1 px-3 rounded-xl">Today</div>
        <div className="flex flex-col space-y-4 text-sm">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`self-${message.type === 'bot' ? 'start' : 'end'} p-2 px-4 ${message.type === 'bot' ? 'bg-white' : 'bg-rose-400 text-white'} rounded-e-3xl shadow rounded-ss-3xl rounded-es-md`}
            >
              {message.text}
            </div>
          ))}
          {loading && (
            <div className="self-start bg-white p-3 rounded-e-3xl shadow rounded-ss-3xl rounded-es-md">
              <LoadingDots />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center p-4">
        <input
          type="text"
          className="flex-grow p-2 mr-2 border rounded-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Image 
            src={send}
            alt={"send"}
            onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default MobileChat;
