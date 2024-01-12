import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const api_key = process.env.THE_B_AI_API;
    const { question } = await req.json();

    const data = JSON.stringify({
      model: 'theb-ai',
      messages: [
        {
          role: 'user',
          content: `请回答以下问题：${question}`
        }
      ],
      stream: false
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.theb.ai/v1/chat/completions',
      // url: 'https://api.baizhi.ai/v1/chat/completions',
      headers: {
        Authorization: `Bearer ${api_key}`,
        'Content-Type': 'application/json'
      },
      data
    };

    const response = await axios.request(config);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'An error occurred' }), {
      status: 500
    }); // 处理错误并返回 NextResponse
  }
};
