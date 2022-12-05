import React, { useEffect, useState } from "react";
import { createPicture } from "../../lib/api/pictures";
import { ResetButton } from "../atoms/buttons/ResetButton";

import { Grid } from "@material-ui/core";
import { UploadButton } from "../atoms/buttons/UploadButton";
import { SelectBox } from "../atoms/selectBoxes/SelectBox";

import { getThemes } from "../../lib/api/themes";

const Canvas = () => {
  const [drawFlag, setDrawFlag] = useState(0);
  const [theme, setTheme] = useState();
  const [themes, setThemes] = useState([]);
  
  const bgColor = 'rgb(255,255,255)';
  let canvas;
  let ctx;
  let Xpoint, Ypoint;
  let x = "red";
  let y = 2;

  const generateParams = (base64) => {
    const pictureParams = {
      image: base64,
      theme_id: theme,
    };
    return pictureParams;
  };
  
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

  const resetCanvas = () => {
    if (window.confirm('本当にリセットしますか？')) {
      ctx.fillStyle = bgColor;
      ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    }
  }

  const handleGetThemes = async () => {
    try {
      const res = await getThemes();
      if (res.status === 200) {
        const data = res.data;
        setThemes(data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    handleGetThemes();
  }, []);

  const uploadPicture = () => {
    if (window.confirm("保存して良いですか？") === true) {
      canvas.toBlob((blob) => {
        let reader = new FileReader();
        // CSRFトークンを発行（おそらくここの取得はできていない。一旦コメントアウト）
        // const token = document.getElementsByName("csrf-token")[0].content;
        reader.readAsDataURL(blob);

        reader.onload = async (e) => {
          let dataUrlBase64 = reader.result;
          let base64 = dataUrlBase64.replace(/data:.*\/.*;base64,/, '');
          // console.log(base64);
          // paramsにしっかり値が入っていない！！（重要！）
          const params = generateParams(base64);
          console.log(params);
          // console.log(image);
          // console.log(base64.class);
          // エラー回避のメソッドを実行。適切に実行されるかを確認する。
          try {
            const res = await createPicture(params);
            // 確認用コンソール出力です。実装できたら消してください。
            if (res.status === 200) {
              // ページ遷移するようにする
              window.alert("登録されてるかもね。");
            }
          } catch (e) {
            console.log(e);
          }
        };
        // pngファイルで保存するよう第二引数に設定することができる。 
      }, 'image/png');
      ctx.fillStyle = bgColor;
      ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    };
  };
  
  
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
      <Grid container spacing={3}>
        <Grid item  xs={9}>
          <canvas id="canvas" width="700" height="500" style={style}></canvas>
        </Grid>
        <Grid item xs={3}>
          <SelectBox themes={themes} theme={theme} setTheme={setTheme} />
          <ResetButton resetCanvas={resetCanvas}>キャンバスをリセット</ResetButton>
          <UploadButton uploadCanvas={uploadPicture} 
                        theme={theme}>
                          アップロードする
                        </UploadButton>
        </Grid>
      </Grid>
    </>
  )
}

export default Canvas;