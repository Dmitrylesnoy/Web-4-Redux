import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectMyForm, submitFormDataThunk } from "../myForm/myFormSlice";
import { useAppDispatch } from "../../app/hooks";
import { addPointDataThunk } from "../myTable/myTableSlice";

const CENTER_X = 250;
const CENTER_Y = 250;
const SCALE = 40;

export function drawPoint(canvas: HTMLCanvasElement | null, x: number, y: number, hit: boolean) {
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const posX = CENTER_X + x * SCALE;
  const posY = CENTER_Y - y * SCALE;

  ctx.fillStyle = hit ? "lime" : "lightcoral";
  ctx.strokeStyle = hit ? "green" : "red";
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.arc(posX, posY, 3, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}

export function Graph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { r } = useSelector(selectMyForm);
  const dispatch = useAppDispatch();

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

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(50, CENTER_Y);
    ctx.lineTo(450, CENTER_Y);
    ctx.moveTo(CENTER_X, 450);
    ctx.lineTo(CENTER_X, 50);
    ctx.stroke();

    // Draw X ticks
    const xTicks = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
    xTicks.forEach((x) => {
      const posX = CENTER_X + x * SCALE;
      if (posX >= 0 && posX <= width) {
        ctx.beginPath();
        ctx.moveTo(posX, CENTER_Y - 5);
        ctx.lineTo(posX, CENTER_Y + 5);
        ctx.stroke();
        ctx.fillText(x.toString(), posX, CENTER_Y + 20);
      }
    });

    // Draw Y ticks
    const yTicks = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
    ctx.textAlign = "start";
    yTicks.forEach((y) => {
      const posY = CENTER_Y - y * SCALE;
      if (posY >= 0 && posY <= height) {
        ctx.beginPath();
        ctx.moveTo(CENTER_X - 5, posY);
        ctx.lineTo(CENTER_X + 5, posY);
        ctx.stroke();
        ctx.fillText(y.toString(), CENTER_X + 10, posY + 5);
      }
    });

    // Draw axis labels
    ctx.font = "12px sans-serif";
    ctx.fillText("X", 440, CENTER_Y - 10);
    ctx.fillText("Y", CENTER_X + 10, 40);

    if (R && R > 0) {
      const radiusPx = R * SCALE;
      ctx.fillStyle = "rgba(138,43,226,0.3)";
      ctx.strokeStyle = "#8a2be2";
      ctx.lineWidth = 2;

      // Draw circle sector
      ctx.beginPath();
      ctx.arc(CENTER_X, CENTER_Y, radiusPx / 2, Math.PI / 2, Math.PI, false);
      ctx.lineTo(CENTER_X, CENTER_Y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw triangle
      ctx.beginPath();
      ctx.moveTo(CENTER_X, CENTER_Y);
      ctx.lineTo(CENTER_X - radiusPx, CENTER_Y);
      ctx.lineTo(CENTER_X, CENTER_Y - radiusPx);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw rectangle
      const rectX = CENTER_X;
      const rectY = CENTER_Y - radiusPx / 2;
      const rectWidth = radiusPx;
      const rectHeight = (R / 2) * SCALE;
      ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
      ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
    }
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

    const graphX = ((x - CENTER_X) / SCALE).toFixed(4);
    const graphY = ((CENTER_Y - y) / SCALE).toFixed(4);

    // TODO sending request with grapth data
    const graphData = {
      x: +graphX,
      y: +graphY,
      r,
      graphFlag: true,
    };

    console.log(`Clicked at X: ${graphX}, Y: ${graphY}`);
    dispatch(submitFormDataThunk(graphData)).then((result: any) => {
      if (result.type === "myForm/submitForm/fulfilled" && result.payload) {
        const data = result.payload;
        dispatch(
          addPointDataThunk({
            pointData: {
              x: data.x,
              y: data.y,
              r: data.r,
              hit: data.hit,
              execTime: data.execTime,
              dataFormatted: data.date,
            },
            canvas: canvas,
          })
        );
      }
    });
  };

  return (
    <div className="card">
      <canvas ref={canvasRef} width="500" height="500" onClick={handleCanvasClick} />
    </div>
  );
}
