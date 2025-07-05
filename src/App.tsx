import { useState } from "react";
import "./App.css";
import { AntDesignOutlined } from '@ant-design/icons';
import { Input, Button, ConfigProvider, message } from 'antd';
import { createStyles } from 'antd-style';
import { fetch } from '@tauri-apps/plugin-http';
import { request } from './request';
import axios from 'axios';

// import React from 'react';
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

const url = '/api/v1/services/aigc/multimodal-generation/generation'

function App() {

  const { styles } = useStyle();
  const val = localStorage.getItem('DASHSCOPE_API_KEY') ?? '';
  const [DASHSCOPE_API_KEY, setDASHSCOPE_API_KEY] = useState(val);
  const [audioConfig, setAudioConfig] = useState({
    model: 'qwen-tts',
    voice: 'Chelsie',
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [inputContent, setInputContent] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const [baseRoles, setBaseRoles] = useState([
    {
      name: 'Chelsie',
      gender: '女',
      audio: '/audio/Chelsie_ZH.wav',
      isChoiced: true,
      model: 'qwen-tts'
    },
    {
      name: 'Cherry',
      gender: '女',
      audio: '/audio/Cherry_ZH.wav',
      isChoiced: false,
       model: 'qwen-tts'
    },
    {
      name: 'Ethan',
      gender: '男',
      audio: '/audio/Ethan_ZH.wav',
      isChoiced: false,
      model: 'qwen-tts'
    },
    {
      name: 'Serena',
      gender: '女',
      audio: '/audio/Serena_ZH.wav',
      isChoiced: false,
      model: 'qwen-tts'
    },
        {
      name: 'Dylan',
      gender: '北京话-男',
      audio: '/audio/北京话-zh.wav',
      isChoiced: false,
      model: 'qwen-tts-latest'
    },
    {
      name: 'Jada',
      gender: '吴语-女',
      audio: '/audio/上海话-zh.wav',
      isChoiced: false,
      model: 'qwen-tts-latest'
    },
    {
      name: 'Sunny',
      gender: '四川话-女',
      audio: '/audio/四川话-zh.wav',
      isChoiced: false,
      model: 'qwen-tts-latest'
    }
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
    setAudioConfig({
      ...audioConfig,
      voice: data.name,
      model: data.model,
    });
    setBaseRoles(updatedRoles);
  }

  const genderAudio = async () => {
    if(!inputContent){
      messageApi.open({
        type: 'warning',
        content: '请输入文本内容',
      });
      return
    }
    // 设置请求头
    const headers = {
      'Authorization': `Bearer ${DASHSCOPE_API_KEY}`,
      'Content-Type': 'application/json'
    };

    const data = {
      model: audioConfig.model,
      input: {
        text: inputContent,
        voice: audioConfig.voice
      }
    };

    setLoading(true);

    axios({
      url,
      method: 'POST',
      headers: headers,
      data: data,
      // withCredentials: true, // 如果需要携带cookie
      responseType: 'json' // 如果需要返回json格式
    }).then((response) => {
      setLoading(false);
      console.log('response', response);
      if (response.status === 200) {
        console.log('response data', response.data);
        const audioUrl = response.data.output.audio;
        if(audioUrl) {
          messageApi.open({
            type: 'success',
            content: '文件已经生成，请点击播放按钮试听',
          });
           setAudioUrl(audioUrl.url)
        }
      }}).catch((error) => {
        setLoading(false);
        console.error('Error:', error);
        messageApi.open({
          type: 'error',
          content: error.message || '请求失败，请检查API Key或网络连接',
        });
      });
  }

  const getApiKey = (e: any) => {
    console.log('getApiKey', e.target);
    setDASHSCOPE_API_KEY(e.target.value);
    localStorage.setItem('DASHSCOPE_API_KEY', e.target.value);
  }

  return (
    <main >
      {contextHolder}
      <h1>语音阅读, 通义千问的语音合成模型</h1>
      <h3>Qwen-TTS 是通义千问系列的语音合成模型，支持输入中文、英文、中英混合的文本，并流式输出音频。</h3>
      <a href='https://help.aliyun.com/zh/model-studio/qwen-tts' target='_blank'>了解更多</a>
      {/* <h1>支持的音色</h1> */}
      <p>第0步：输入 API Key &nbsp;&nbsp;&nbsp; 链接：<a href='https://help.aliyun.com/zh/model-studio/get-api-key?spm=a2c4g.11186623.0.0.2dd320de5tPfm2' target="_blank">阿里云百炼的模型服务</a></p>
      <p></p>
      <Input.Password size="large" value={DASHSCOPE_API_KEY} onChange={getApiKey} placeholder="请输入 API Key" />
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
        <Button type="primary" size="large" loading={loading} icon={<AntDesignOutlined />} onClick={genderAudio}>
          生成音频
        </Button>
      </ConfigProvider>
      <p>
        <audio src={audioUrl} controls />
      </p>
    </main>
  );
}

export default App;
