import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPicture } from "../../lib/api/pictures";
import { ResetButton } from "../atoms/buttons/ResetButton";
import { BsEraserFill } from "react-icons/bs";
import { FaPen, FaUndo, FaRedo, FaTrash } from "react-icons/fa";
import {Grid, 
        makeStyles, 
        Divider, 
        Button, 
        IconButton, 
        Typography, 
        Tooltip, 
        Slider, 
        Box, 
        Card, 
        CardContent, 
        useMediaQuery} from "@material-ui/core";
import { UploadButton } from "../atoms/buttons/UploadButton";
import { SelectBox } from "../atoms/selectBoxes/SelectBox";
import { getThemes } from "../../lib/api/themes";
import styles from "../../css/pages/Canvas.module.css";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '30px',
  },
  midContainer: {
    marginTop: '30px',
    maxWidth: '100%',
  },
  minContainer: {
    marginTop: '20px',
    maxWidth: '100%',
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
    color: 'black',
  },
  item: {
    margin: '0 auto',
  },
  midItem: {
    margin: '0 auto',
    paddingLeft: '10px',
    textAlign: 'left',
  },
  minItem: {
    margin: '0 auto',
    paddingLeft: '10px',
    textAlign: 'left',
  },
  drawSet:{
    paddingRight: '20px',
    paddingLeft: '20px',
  },
  minDrawSet:{
    paddingRight: '20px',
    paddingLeft: '20px',
  },
  canvas: {
    background: "white",
    width: '550px',
    height: '400px',
    border: "1px solid black",
  },
  eraser: {
    opacity: "0.5"
  },
  card: {
    textAlign: 'left',
    padding: '15px',
    margin: '0 auto'
  },
  label: {
    marginTop: '15px',
  },
  slider: {
    margin: "20px 0",
  },
  midSlider: {
    width: '180px',
  },
  minSlider: {
    width: '300px',
  }
}));

const marks = [
  {
    value: 1,
    label: '1px',
  },
  {
    value: 12,
    label: '12px',
  },
]

const Canvas = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const classes = useStyles();
  const [lineWidth, setLineWidth] = useState(2);
  const [drawFlag, setDrawFlag] = useState(0);
  // 1: ペンモード、2:消しゴムモード
  const [drawMode, setDrawMode] = useState(1);
  const [theme, setTheme] = useState();
  const [themes, setThemes] = useState([]);
  const [eraser, setEraser] = useState(false);
  const [color, setColor] = useState("black");
  setTimeout(() => { setLoad(false) }, 0);
  const matches = useMediaQuery('(min-width:800px)');
  const minMatches = useMediaQuery('(min-width:575px)');

  const bgColor = 'rgb(255,255,255)';
  const line_color = document.getElementById("line_color");
  let canvas;
  let ctx;
  let temp = [];
  let Xpoint, Ypoint;
  let myStorage = localStorage;

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
    if (drawMode === 1) {
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;
    } else {
      ctx.lineWidth = 12;
    }

    if (load) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      initLocalStorage();
    }
    canvas.addEventListener('mousedown', startPoint, false);
    canvas.addEventListener("mousemove", movePoint, false);
    canvas.addEventListener("mouseup", endPoint, false);
    canvas.addEventListener("touchstart", touchStartPoint, false);
    canvas.addEventListener("touchmove", touchMovePoint, false);
    canvas.addEventListener("touchend", touchEndPoint, false);
  });

  const initLocalStorage = () => {
    myStorage.setItem("__log", JSON.stringify([]));
  }

  const setLocalStorage = () => {
    let png = canvas.toDataURL();
    let logs = JSON.parse(myStorage.getItem("__log"));

    setTimeout(() => {
      logs.unshift({png:png});
      myStorage.setItem("__log", JSON.stringify(logs));
    }, 0);
  }


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
    setLocalStorage();
  }

  const touchStartPoint = (e) => {
    e.preventDefault();
    ctx.beginPath();
    const touches = e.touches;
    const offset = e.target.getBoundingClientRect();
    for (let i=0; i<touches.length; i++ ){
      Xpoint = Math.floor(touches[i].pageX - offset.left);
      Ypoint = Math.floor(touches[i].pageY - offset.top);
      ctx.moveTo(Xpoint, Ypoint);
    }
  }

  const touchMovePoint = (e) => {
    e.preventDefault();
    const touches = e.changedTouches;
    const offset = e.target.getBoundingClientRect();
    for (let i=0; i < touches.length; i++ ) {
      Xpoint = Math.floor(touches[i].pageX - offset.left);
      Ypoint = Math.floor(touches[i].pageY - offset.top);
      ctx.lineTo(Xpoint, Ypoint);
    }
    setDrawFlag(1);
    ctx.lineCap = "round";
    ctx.stroke();
  }

  const touchEndPoint = (e) => {
    e.preventDefault();
    const touches = e.changedTouches;
    const offset = e.target.getBoundingClientRect();
    if (drawFlag === 0) {
      for (let i=0; i<touches.length; i++) {
        Xpoint = Math.floor(touches[i].pageX - offset.left);
        Ypoint = Math.floor(touches[i].pageY - offset.top);
        ctx.lineTo(Xpoint-1, Ypoint-1);
      }
      ctx.lineCap = "round";
      ctx.stroke();
    }
    setDrawFlag(0);
    setLocalStorage();
  }

  const resetCanvas = () => {
    if (window.confirm('リセットしますか？')) {
      ctx.fillStyle = bgColor;
      initLocalStorage();
      ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    }
  }

  const undo = () => {
    let logs = JSON.parse(myStorage.getItem('__log'));
    if (logs.length > 0) {
      temp.unshift(logs.shift());
      setTimeout(() => {
        myStorage.setItem('__log', JSON.stringify(logs))
        ctx.fillStyle = bgColor;
        ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
        if( logs[0]){
          draw(logs[0]['png']);
        }
      }, 0)
    }
  }

  const redo = () => {
    let logs = JSON.parse(myStorage.getItem('__log'));
    console.log(logs)
    if (temp.length > 0) {
      logs.unshift(temp.shift());

      setTimeout(() => {
        myStorage.setItem('__log', JSON.stringify(logs));
        ctx.fillStyle = bgColor;
        ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
        if( logs[0]){
          draw(logs[0]['png']);
        }
      }, 0)
    }
  }

  const draw = (src) => {
    let img = new Image();
    img.src = src;
    img.onload = function(){
      ctx.drawImage(img, 0, 0);
    }
  }

  const changeEraser = () => {
    if (drawMode === 1) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 12;
      setDrawMode(2);
    } else {
      ctx.globalCompositeOperation = 'source-over';
      setDrawMode(1);
    }
    setEraser(!eraser);
  };

  const changeColor = () => {
    setColor(prev => line_color.value);
    if (eraser) {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.strokeStyle = color;
    }
  };

  const handleLineWidth = (e, newVal) => {
    setLineWidth(prev => newVal);
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
          const params = generateParams(base64, dataUrlBase64);
          try {
            const res = await createPicture(params);
            if (res.status === 200) {
              navigate(`/pictures/${res.data.id}`, {state: { successMessageOpen: true }})
            }
          } catch (e) {
            console.log(e);
          }
        };
      }, 'image/png');
      ctx.fillStyle = bgColor;
      ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    };
  };

  return (
    <>
      { matches ? (
        <>
          <Grid className={classes.container} container spacing={3}>
            <Grid item xs={12} md={7}>
              <div className={`${styles.canvasParent}`} id="canvasParent">
                <canvas 
                  id="canvas"
                  className={`${styles.canvas}`} 
                ></canvas>
              </div>
            </Grid>
            <Grid item className={classes.item} xs={10} md={5}>
              <div className={classes.drawSet}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      メニュー
                    </Typography>
                    <Divider />
                    {eraser ? (
                      <>
                        <Tooltip title="ペン">
                          <IconButton
                            className={classes.submitBtn}
                            onClick={changeEraser}
                          >
                            <FaPen size="2rem"/>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="消しゴム">
                          <IconButton
                            type='submit'
                            id='erase'
                            className={classes.submitBtn}
                            color="default"
                          >
                            <BsEraserFill size="2rem" className={classes.eraser} />
                          </IconButton>
                        </Tooltip>
                      </>
                      ) : (
                        <>
                          <Tooltip title="ペン">
                            <IconButton
                              className={classes.submitBtn}
                            >
                              <FaPen size="2rem" className={classes.eraser} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="消しゴム">
                            <IconButton
                              type='submit'
                              id='erase'
                              className={classes.submitBtn}
                              color="default"
                              onClick={changeEraser}
                            >
                                <BsEraserFill size="2rem" />
                            </IconButton>
                          </Tooltip>
                        </>
                    )}
                    <Tooltip title="一つ前へ">
                      <IconButton
                        className={classes.submitBtn}
                        onClick={undo}
                      >
                        <FaUndo size="2rem" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="一つ先へ">
                      <IconButton
                        className={classes.submitBtn}
                        onClick={redo}
                      >
                        <FaRedo size="2rem" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="パレット">
                      <Button
                        className={classes.submitBtn}
                        onChange={changeColor}
                      >
                        <input type="color" id="line_color" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="リセット">
                      <ResetButton resetCanvas={resetCanvas}>
                        <FaTrash size="2rem" />
                      </ResetButton>
                    </Tooltip>
                    <Box className={classes.slider} sx={{ width: 300 }}>
                      <Typography className={classes.label} gutterBottom>
                        ペンの太さ
                      </Typography>
                      <Slider
                        aria-label="Custom marks"
                        value={lineWidth}
                        onChange={handleLineWidth}
                        step={1}
                        min={1}
                        max={12}
                        valueLabelDisplay="auto"
                        marks={marks}
                      />
                    </Box>
                    <SelectBox
                      placeholder={'テーマを選んでください'} 
                      option={theme}
                      options={themes}
                      setOption={setTheme}
                      />
                    <UploadButton uploadCanvas={uploadPicture} 
                                  theme={theme}>
                      アップロードする
                    </UploadButton>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
        { minMatches ? (
          <>
            <Grid className={classes.midContainer} container spacing={1}>
              <Grid item xs={8}>
                <div className={`${styles.canvasParent}`} id="canvasParent">
                  <canvas 
                    id="canvas"
                    className={`${styles.canvas}`} 
                  ></canvas>
                </div>
              </Grid>
              <Grid item className={classes.midItem} xs={3}>
                <div className={classes.midDrawSet}>
                  <Typography variant="h5" component="div">
                    メニュー
                  </Typography>
                  <Divider />
                  {eraser ? (
                    <>
                      <Tooltip title="ペン">
                        <IconButton
                          className={classes.submitBtn}
                          onClick={changeEraser}
                        >
                          <FaPen size="1.5rem"/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="消しゴム">
                        <IconButton
                          type='submit'
                          id='erase'
                          className={classes.submitBtn}
                          color="default"
                        >
                          <BsEraserFill size="1.5rem" className={classes.eraser} />
                        </IconButton>
                      </Tooltip>
                    </>
                    ) : (
                      <>
                        <Tooltip title="ペン">
                          <IconButton
                            className={classes.submitBtn}
                          >
                            <FaPen size="1.5rem" className={classes.eraser} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="消しゴム">
                          <IconButton
                            type='submit'
                            id='erase'
                            className={classes.submitBtn}
                            color="default"
                            onClick={changeEraser}
                          >
                              <BsEraserFill size="1.5rem" />
                          </IconButton>
                        </Tooltip>
                      </>
                  )}
                  <Tooltip title="一つ前へ">
                    <IconButton
                      className={classes.submitBtn}
                      onClick={undo}
                    >
                      <FaUndo size="1.5rem" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="一つ先へ">
                    <IconButton
                      className={classes.submitBtn}
                      onClick={redo}
                    >
                      <FaRedo size="1.5rem" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="パレット">
                    <Button
                      className={classes.submitBtn}
                      onChange={changeColor}
                    >
                      <input type="color" id="line_color" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="リセット">
                    <ResetButton resetCanvas={resetCanvas}>
                      <FaTrash size="1.5rem" />
                    </ResetButton>
                  </Tooltip>
                  <Box className={classes.midSlider} >
                    <Typography className={classes.label} gutterBottom>
                      ペンの太さ
                    </Typography>
                    <Slider
                      aria-label="Custom marks"
                      value={lineWidth}
                      onChange={handleLineWidth}
                      step={1}
                      min={1}
                      max={12}
                      valueLabelDisplay="auto"
                      marks={marks}
                    />
                  </Box>
                  <SelectBox
                    placeholder={'テーマを選んでください'} 
                    option={theme}
                    options={themes}
                    setOption={setTheme}
                    />
                  <UploadButton uploadCanvas={uploadPicture} 
                                theme={theme}>
                    アップロードする
                  </UploadButton>
                </div>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid className={classes.minContainer} container spacing={1}>
              <Grid item xs={12}>
                <div className={`${styles.canvasParent}`} id="canvasParent">
                  <canvas 
                    id="canvas"
                    className={`${styles.canvas}`} 
                  ></canvas>
                </div>
              </Grid>
              <Grid item className={classes.minItem} xs={12}>
                <div className={classes.minDrawSet}>
                  <Typography variant="h7" component="div">
                    メニュー
                  </Typography>
                  <Divider />
                  {eraser ? (
                    <>
                      <Tooltip title="ペン">
                        <IconButton
                          className={classes.submitBtn}
                          onClick={changeEraser}
                        >
                          <FaPen size="1.2rem"/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="消しゴム">
                        <IconButton
                          type='submit'
                          id='erase'
                          className={classes.submitBtn}
                          color="default"
                        >
                          <BsEraserFill size="1.2rem" className={classes.eraser} />
                        </IconButton>
                      </Tooltip>
                    </>
                    ) : (
                      <>
                        <Tooltip title="ペン">
                          <IconButton
                            className={classes.submitBtn}
                          >
                            <FaPen size="1.2rem" className={classes.eraser} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="消しゴム">
                          <IconButton
                            type='submit'
                            id='erase'
                            className={classes.submitBtn}
                            color="default"
                            onClick={changeEraser}
                          >
                              <BsEraserFill size="1.2rem" />
                          </IconButton>
                        </Tooltip>
                      </>
                  )}
                  <Tooltip title="一つ前へ">
                    <IconButton
                      className={classes.submitBtn}
                      onClick={undo}
                    >
                      <FaUndo size="1.2rem" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="一つ先へ">
                    <IconButton
                      className={classes.submitBtn}
                      onClick={redo}
                    >
                      <FaRedo size="1.2rem" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="パレット">
                    <Button
                      className={classes.submitBtn}
                      onChange={changeColor}
                    >
                      <input type="color" id="line_color" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="リセット">
                    <ResetButton resetCanvas={resetCanvas}>
                      <FaTrash size="1.2rem" />
                    </ResetButton>
                  </Tooltip>
                  <Box className={classes.minSlider} >
                    <Typography className={classes.minLabel}>
                      ペンの太さ
                    </Typography>
                    <Slider
                      aria-label="Custom marks"
                      value={lineWidth}
                      onChange={handleLineWidth}
                      step={1}
                      min={1}
                      max={12}
                      valueLabelDisplay="auto"
                      marks={marks}
                    />
                  </Box>
                  <SelectBox
                    placeholder={'テーマを選んでください'} 
                    option={theme}
                    options={themes}
                    setOption={setTheme}
                    />
                  <UploadButton uploadCanvas={uploadPicture} 
                                theme={theme}>
                    アップロードする
                  </UploadButton>
                </div>
              </Grid>
            </Grid>
          </>
        )}
        </>
      )}
    </>
  )
}

export default Canvas;
