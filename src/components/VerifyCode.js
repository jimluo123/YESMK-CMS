import { useEffect, useRef, useState } from "react";

const VerifyCode = (props) => {
  const TEXTS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const LINES = 6; // 干扰线数量
  const DOTS = 50; // 干扰点数量

  const {
    width = 120,
    height = 40,
    letters = TEXTS,
    length = 4,
    minFontSize = 20,
    maxFontSize = 30,
    change,
  } = props;
  const verifyCodeRef = useRef(null);
  const [ctx, setCtx] = useState();

  useEffect(() => {
    setCtx(verifyCodeRef.current.getContext("2d"));
  }, [verifyCodeRef]);

  useEffect(() => {
    ctx && drawCodeImg();
  }, [ctx]);

  // 点击
  const handleClick = () => {
    drawCodeImg();
  };

  // 绘制验证码
  const drawCodeImg = () => {
    // 绘制背景
    ctx.fillStyle = randomColor(200, 230);
    ctx.fillRect(0, 0, width, height);

    drawText();
    drawLine();
    drawDot();
  };

  // 随机数
  const randomNum = (min, max) => Math.floor(Math.random() * (max - min) + min);

  // 随机颜色
  const randomColor = (min, max) => {
    return `rgb(${randomNum(min, max)}, ${randomNum(min, max)}, ${randomNum(
      min,
      max
    )})`;
  };

  // 绘制文本
  const drawText = () => {
    let code = "";
    for (let index = 0; index < length; index++) {
      const fontSize = randomNum(minFontSize, maxFontSize); // 字体大小
      const fontWidth = maxFontSize - minFontSize + 6; // 字体宽度
      const textSpace = (width - fontWidth * length) / (length + 1); // 文字间距
      const x = (index + 1) * textSpace + fontWidth * index; // x方向坐标
      const y = randomNum(22, height); // y方向坐标
      const deg = randomNum(-40, 40); // 旋转角度
      const textIdx = randomNum(0, letters.length);
      const letter = letters[textIdx];
      ctx.textBaseline = "alphabetic";
      ctx.font = `${fontSize}px Simhei`;
      ctx.fillStyle = randomColor(40, 100);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((deg * Math.PI) / 180);
      ctx.fillText(letter, 0, 0);
      ctx.restore();
      code += letter;
    }

    change(code);
  };

  // 绘制线
  const drawLine = () => {
    for (let index = 0; index < LINES; index++) {
      const x1 = randomNum(0, ctx.canvas.clientWidth);
      const y1 = randomNum(0, ctx.canvas.clientHeight);
      const x2 = randomNum(0, ctx.canvas.clientWidth);
      const y2 = randomNum(0, ctx.canvas.clientHeight);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = 1;
      ctx.strokeStyle = randomColor(150, 250);
      ctx.stroke();
    }
  };

  // 绘制点
  const drawDot = () => {
    for (let index = 0; index < DOTS; index++) {
      const x = randomNum(0, ctx.canvas.clientWidth);
      const y = randomNum(0, ctx.canvas.clientHeight);
      const r = randomNum(1, 2);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = randomColor(100, 200);
      ctx.fill();
    }
  };

  const canvasStyle = {
    width,
    height,
    border: "1px solid #d9d9d9",
  };

  return (
    <div style={canvasStyle}>
      <canvas
        onClick={handleClick}
        ref={verifyCodeRef}
        width={width - 2}
        height={height - 2}
      ></canvas>
    </div>
  );
};

export default VerifyCode;
