import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectMyForm } from "../myForm/myFormSlice";

export function Graph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { r } = useSelector(selectMyForm);

  useEffect(() => {
    drawGraph(r);
  }, [r]);

  const drawGraph = (R: number | null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 500;
    const height = 500;
    const centerX = 250;
    const centerY = 250;
    const scale = 40;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(50, centerY);
    ctx.lineTo(450, centerY);
    ctx.moveTo(centerX, 450);
    ctx.lineTo(centerX, 50);
    ctx.stroke();

    // Draw X ticks
    const xTicks = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
    xTicks.forEach((x) => {
      const posX = centerX + x * scale;
      if (posX >= 0 && posX <= width) {
        ctx.beginPath();
        ctx.moveTo(posX, centerY - 5);
        ctx.lineTo(posX, centerY + 5);
        ctx.stroke();
        ctx.fillText(x.toString(), posX, centerY + 20);
      }
    });

    // Draw Y ticks
    const yTicks = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
    ctx.textAlign = "start";
    yTicks.forEach((y) => {
      const posY = centerY - y * scale;
      if (posY >= 0 && posY <= height) {
        ctx.beginPath();
        ctx.moveTo(centerX - 5, posY);
        ctx.lineTo(centerX + 5, posY);
        ctx.stroke();
        ctx.fillText(y.toString(), centerX + 10, posY + 5);
      }
    });

    // Draw axis labels
    ctx.font = "12px sans-serif";
    ctx.fillText("X", 440, centerY - 10);
    ctx.fillText("Y", centerX + 10, 40);

    if (R && R > 0) {
      const radiusPx = R * scale;
      ctx.fillStyle = "rgba(138,43,226,0.3)";
      ctx.strokeStyle = "#8a2be2";
      ctx.lineWidth = 2;

      // Draw circle sector
      ctx.beginPath();
      ctx.arc(centerX, centerY, radiusPx / 2, Math.PI / 2, Math.PI, false);
      ctx.lineTo(centerX, centerY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw triangle
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX - radiusPx, centerY);
      ctx.lineTo(centerX, centerY - radiusPx);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw rectangle
      const rectX = centerX;
      const rectY = centerY - radiusPx / 2;
      const rectWidth = radiusPx;
      const rectHeight = (R / 2) * scale;
      ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
      ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
    }
  };

  const drawPoint = (x: number, y: number, hit: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = 250;
    const centerY = 250;
    const scale = 40;

    const posX = centerX + x * scale;
    const posY = centerY - y * scale;

    ctx.fillStyle = hit ? "lime" : "lightcoral";
    ctx.strokeStyle = hit ? "green" : "red";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.arc(posX, posY, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!r || r <= 0) {
      alert("Please select R first (R cannot be zero)");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = 250;
    const centerY = 250;
    const scale = 40;

    const graphX = ((x - centerX) / scale).toFixed(4);
    const graphY = ((centerY - y) / scale).toFixed(4);

    // TODO sending request with grapth data
    console.log(`Clicked at X: ${graphX}, Y: ${graphY}`);
  };

  return (
    <div className="card">
      <canvas ref={canvasRef} width="500" height="500" onClick={handleCanvasClick} />
    </div>
  );
}
