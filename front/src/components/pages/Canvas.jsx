import React, { useEffect, useState } from "react";

const Canvas = () => {
  const [drawFlag, setDrawFlag] = useState(0);
  let canvas;
  let ctx;
  let Xpoint, Ypoint;
  let x = "red";
  let y = 2;
  
  useEffect(() => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.addEventListener('mousedown', startPoint, false);
    canvas.addEventListener("mousemove", movePoint, false);
    canvas.addEventListener("mouseup", endPoint, false);
    canvas.addEventListener("touchstart", touchStartPoint, false);
    canvas.addEventListener("touchmove", touchMovePoint, false);
    canvas.addEventListener("touchend", touchEndPoint, false);
  });

  const startPoint = (e) => {
    e.preventDefault();
    ctx.beginPath();
    let rect = e.target.getBoundingClientRect();
    Xpoint = e.clientX - rect.left;
    Ypoint = e.clientY - rect.top;
    ctx.moveTo(Xpoint, Ypoint);
  }

  const movePoint = (e) => {
    if (e.buttons === 1 || e.witch === 1 || e.type === 'touchmove') {
      let rect = e.target.getBoundingClientRect();
      Xpoint = e.clientX - rect.left;
      Ypoint = e.clientY - rect.top;
      setDrawFlag(1);
      ctx.lineTo(Xpoint, Ypoint);
      ctx.lineCap = "round";
      ctx.strokeStyle = x;
      ctx.lineWidth = y;
      ctx.stroke();
    }
  }
  
  const endPoint = (e) => {
    if (drawFlag === 0) {
      ctx.lineTo(Xpoint-1, Ypoint-1);
      ctx.lineCap = "round";
      ctx.stroke();
    }
    setDrawFlag(0);
  }

  const touchStartPoint = (e) => {
    e.preventDefault();
    ctx.beginPath();
    Xpoint = e.layerX;
    Ypoint = e.layerY;
    ctx.moveTo(Xpoint, Ypoint);
  }

  const touchEndPoint = (e) => {
    if (drawFlag === 0) {
      ctx.lineTo(Xpoint-1, Ypoint-1);
      ctx.lineCap = "round";
      ctx.stroke();
    }
    setDrawFlag(0);
  }

  const touchMovePoint = (e) => {
    if (e.buttons === 1 || e.witch === 1 || e.type === 'touchmove') {
      Xpoint = e.layerX;
      Ypoint = e.layerY;
      setDrawFlag(1);
      ctx.lineTo(Xpoint, Ypoint);
      ctx.lineCap = "round";
      ctx.stroke();
    }
  }


  
  
  const style = {
    minWidth: 64,
    lineHeight: "32px",
    borderRadius: 4,
    border: "1px solid black",
    padding: "0 16px",
    color: "black",
    background: "white",
  };

  return (
    <>
      <canvas id="canvas" width="700" height="500" style={style}></canvas>
    </>
  )
}

export default Canvas;