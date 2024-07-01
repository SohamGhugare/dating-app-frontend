"use client"
import React from 'react';
import Image from 'next/image';

import arrow from "@/public/arrow.svg"
import info from "@/public/info.svg"
import send from "@/public/send.svg"
import LoadingDots from './LoadingDots';

const MobileChat = () => {
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
          <div className="self-start p-2 px-4 bg-white rounded-e-3xl shadow rounded-ss-3xl rounded-es-md">Hi! How can I help you today</div>
          <div className="self-end p-2 px-4 bg-rose-400 text-white rounded-s-2xl rounded-se-xl rounded-ee-md shadow flex flex-col">
            I need to plan for a date. 
            <span>Where all can we go for a first date?</span>
          </div>
          <div className='self-start bg-white p-3 rounded-e-3xl shadow rounded-ss-3xl rounded-es-md'>
            <LoadingDots />
          </div>
        </div>
      </div>
      <div className="flex items-center p-4 border-t border-gray-200">
        <input
          type="text"
          className="flex-grow p-2 mr-2 border rounded-full"
        />
        <Image 
            src={send}
            alt={"send"}
        />
      </div>
    </div>
  );
};

export default MobileChat;
