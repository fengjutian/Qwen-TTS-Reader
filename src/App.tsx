import { useState } from "react";
import "./App.css";
import { AntDesignOutlined } from '@ant-design/icons';

import { Input, Button, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';

import React from 'react';
import stylesModule from './app.module.css';

const { TextArea } = Input;

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));


function App() {

  const { styles } = useStyle();

  const [baseRoles, setBaseRoles] = useState([
    {
      name: 'Chelsie',
      gender: '女',
      audio: '/audio/Chelsie_ZH.wav',
      isChoiced: true
    },
    {
      name: 'Cherry',
      gender: '女',
      audio: '/audio/Cherry_ZH.wav',
      isChoiced: false
    },
    {
      name: 'Ethan',
      gender: '男',
      audio: '/audio/Ethan_ZH.wav',
      isChoiced: false
    },
    {
      name: 'Serena',
      gender: '女',
      audio: '/audio/Serena_ZH.wav',
      isChoiced: false
    },
        {
      name: 'Dylan',
      gender: '北京话-男',
      audio: '/audio/北京话-zh.wav',
      isChoiced: false
    },
    {
      name: 'Jada',
      gender: '吴语-女',
      audio: '/audio/上海话-zh.wav',
      isChoiced: false
    },
    {
      name: 'Sunny',
      gender: '四川话-女',
      audio: '/audio/四川话-zh.wav',
      isChoiced: false
    }
  ]);

  const [newBaseRoles] = useState([

  ]);

  const selectedAudioType = (data: any) => {
    console.log('selectedAudioType', data); 
    const updatedRoles = baseRoles.map(role => {
      return {
        ...role,
        isChoiced: role.name === data.name
      };
    });
    console.log('updatedRoles', updatedRoles);
    setBaseRoles(updatedRoles);
  }

  const [inputContent, setInputContent] = useState('');


  return (
    <main >
      <h1>通义千问的语音合成模型, 语音阅读</h1>
      <h3>Qwen-TTS 是通义千问系列的语音合成模型，支持输入中文、英文、中英混合的文本，并流式输出音频。</h3>
      {/* <h1>支持的音色</h1> */}
      <p>第0步：输入 API Key &nbsp;&nbsp;&nbsp; 链接：<a href='https://help.aliyun.com/zh/model-studio/get-api-key?spm=a2c4g.11186623.0.0.2dd320de5tPfm2'>阿里云百炼的模型服务</a></p>
      <p></p>
      <Input.Password size="large" placeholder="请输入 Token" />
      <p>第1步：选择音色</p>
      <div className={stylesModule['role-list']} >
        {
          baseRoles.map((role, index) => (
            <div key={index} onClick={() => selectedAudioType(role)}
              className={[stylesModule['role-item'], role.isChoiced && stylesModule['border-seleced']].join(' ')}>
              <div>{role.name} ({role.gender})</div>
              <audio src={role.audio} controls/>
            </div>
          ))
        }
      </div>

      {/* <p>qwen-tts-2025-05-22 与 qwen-tts-latest 还支持以下三种音色：</p> */}
      {/* <div className={stylesModule['role-list']} >
        {
          newBaseRoles.map((role, index) => (
            <div key={index} className={stylesModule['role-item']}>
              <div>{role.name} ({role.gender})</div>
              <audio src={role.audio} controls/>
            </div>
          ))
        }
      </div> */}
      <p>第2步：输入内容</p>
      <TextArea rows={10} placeholder="请输入文本。最大10000字符" 
        maxLength={10000} 
        count={{show:true}}
        value={inputContent}
        onChange={(e) => setInputContent(e.target.value)}
        className={stylesModule['margin-bottom']}/>
      <p>第3步：生成内容</p>  
      <ConfigProvider
        button={{
          className: styles.linearGradientButton,
        }}
        >
        <Button type="primary" size="large" icon={<AntDesignOutlined />}>
          生成音频
        </Button>
      </ConfigProvider>
      <p></p>
    </main>
  );
}

export default App;
