import React, { useEffect, useState } from "react";
import { createPicture } from "../../lib/api/pictures";
import { ResetButton } from "../atoms/buttons/ResetButton";

import { Grid, makeStyles, Button, Slider } from "@material-ui/core";
import { UploadButton } from "../atoms/buttons/UploadButton";
import { SelectBox } from "../atoms/selectBoxes/SelectBox";

import { getThemes } from "../../lib/api/themes";

const useStyles = makeStyles((theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
  },
}));

const Canvas = () => {
  const classes = useStyles();
  const [drawFlag, setDrawFlag] = useState(0);
  const [theme, setTheme] = useState();
  const [themes, setThemes] = useState([]);
  const [eraser, setEraser] = useState(false);
  const [lineWidth, setLineWidth] = useState(2);
  const [color, setColor] = useState("black");
  
  console.log(lineWidth);
  const bgColor = 'rgb(255,255,255)';
  const line_color = document.getElementById("line_color");
  let canvas;
  let ctx;
  let Xpoint, Ypoint;
  let eraser_x = 'white';
  let eraser_y = 12;

  const generateParams = (base64) => {
    const pictureParams = {
      image: base64,
      theme_id: theme.id,
    };
    return pictureParams;
  };
  
  useEffect(() => {
    canvas = document.getElementById("canvas"); // eslint-disable-line
    ctx = canvas.getContext("2d"); // eslint-disable-line
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
      ctx.strokeStyle = eraser ? eraser_x : color;
      ctx.lineWidth = lineWidth;
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
    if (window.confirm('リセットしますか？')) {
      ctx.fillStyle = bgColor;
      ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    }
  }
  
  const changeEraser = () => {
    setEraser(!eraser)
  };

  const changeColor = () => {
    setColor(prev => line_color.value);
    ctx.strokeStyle = eraser ? eraser_x : color;
  };

  const handleLineWidth = (e, newVal) => {
    setLineWidth(prev => newVal);
    ctx.lineWidth = eraser ? eraser_y : lineWidth;
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
        reader.readAsDataURL(blob);
        reader.onload = async (e) => {
          let dataUrlBase64 = reader.result;
          let base64 = dataUrlBase64.replace(/data:.*\/.*;base64,/, '');
          const params = generateParams(base64);
          try {
            const res = await createPicture(params);
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
          <SelectBox 
            placeholder={'テーマを選んでください'} 
            option={theme} 
            options={themes} 
            setOption={setTheme} 
            />
          <Button
            className={classes.submitBtn}
            onChange={changeColor}
          >
            <input type="color" id="line_color" />
          </Button>
          <Button
            type='submit'
            id='erase'
            className={classes.submitBtn}
            color="default"
            onClick={changeEraser}
          >
            {eraser ? (
              <p>Eraserモード</p>
            ) : (
              <p>Penモード</p>
            )}
          </Button>
          <Slider
            value={lineWidth}
            defaultValue={2}
            onChange={handleLineWidth}
            min={1}
            max={12}
            valueLabelDisplay="on"
          />
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