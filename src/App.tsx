import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";

import React from 'react';
import styles from './app.module.css';
import { Input } from 'antd';

const { TextArea } = Input;

  const baseRoles = [
    {
      name: 'Chelsie',
      gender: '女',
      audio: '/audio/Chelsie_ZH.wav'
    },
    {
      name: 'Cherry',
      gender: '女',
      audio: ''
    },
    {
      name: 'Ethan',
      gender: '',
      audio: ''
    },
    {
      name: 'Serena',
      gender: '女',
      audio: ''
    }
  ];

  const newBaseRoles = [
    {
      name: 'Chelsie',
      gender: '女',
      audio: '/audio/Chelsie_ZH.wav'
    },
    {
      name: 'Chelsie',
      gender: '女',
      audio: '/audio/Chelsie_ZH.wav'
    },
        {
      name: 'Chelsie',
      gender: '女',
      audio: '/audio/Chelsie_ZH.wav'
    },
  ]


function App() {


  return (
    <main >
      <h1>通义千问的语音合成模型</h1>
      <h3>Qwen-TTS 是通义千问系列的语音合成模型，支持输入中文、英文、中英混合的文本，并流式输出音频。</h3>
      <h1>支持的音色</h1>
      <div className={styles['role-list']} >
        {
          baseRoles.map((role, index) => (
            <div key={index} className={styles['role-item']}>
              <div>{role.name} ({role.gender})</div>
              <audio src={role.audio} controls/>
            </div>
          ))
        }
      </div>

      <p>qwen-tts-2025-05-22 与 qwen-tts-latest 还支持以下三种音色：</p>
      <div className={styles['role-list']} >
        {
          newBaseRoles.map((role, index) => (
            <div key={index} className={styles['role-item']}>
              <div>{role.name} ({role.gender})</div>
              <audio src={role.audio} controls/>
            </div>
          ))
        }
      </div>





      <TextArea rows={4} />
      <br />
      <br />
      <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />

    </main>
  );
}

export default App;
