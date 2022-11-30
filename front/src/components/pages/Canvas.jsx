import React, { useEffect, useState } from "react";
// import { createPicture } from "../../lib/api/pictures";
import { ResetButton } from "../atoms/buttons/ResetButton";
// import { UploadButton } from "../atoms/buttons/UploadButton";

const Canvas = () => {
  const [drawFlag, setDrawFlag] = useState(0);
  const [drawJudgement, setDrawJudgement] = useState(0);
  const bgColor = 'rgb(255,255,255)';
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
      setDrawJudgement(1);
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

  const resetCanvas = () => {
    if (window.confirm('本当にリセットしますか？')) {
      setDrawJudgement(0);
      ctx.fillStyle = bgColor;
      ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    }
  }

  // 描いた絵をアップロードする機能を実装（無限レンダリングされてるっぽいので一旦コメントアウト）
  // const createPicture = () => {
  //   if (drawJudgement === 0) {
  //     window.alert('何か記入してください');
  //   } else {
  //     canvas.toBlob((blob) => {
  //       let reader = new FileReader();
  //       // CSRFトークンを発行（おそらくここの取得はできていない。一旦コメントアウト）
  //       // const token = document.getElementsByName("csrf-token")[0].content;
  //       reader.readAsDataURL(blob);

  //       reader.onload = async (e) => {
  //         e.preventDefault();
  //         let dataUrlBase64 = reader.result;
  //         let base64 = dataUrlBase64.replace(/data:.*\/.*;base64,/, '');
  //         const data = {
  //           image: base64
  //         }
  //         // エラー回避のメソッドを実行。適切に実行されるかを確認する。
  //         try {
  //           // 確認用コンソール出力です。実装できたら消してください。
  //           console.log("ここだ！");
  //           const res = await createPicture(data);
  //           if (res.status === 200) {
  //             // ページ遷移するようにする
  //             console.log("登録されてるかもね。");
  //           }
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       };
  //     // pngファイルで保存するよう第二引数に設定することができる。 
  //     }, 'image/png');
  //   };
  // };
  
  
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
      <ResetButton resetCanvas={resetCanvas}>キャンバスをリセットする</ResetButton>
      {/* <UploadButton uploadCanvas={createPicture}>画像をアップロード</UploadButton> */}
    </>
  )
}

export default Canvas;