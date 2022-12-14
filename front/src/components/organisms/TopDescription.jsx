import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Card } from "@material-ui/core";
import firstImage from '../../assets/img/firstTopIcon.png';
import secondImage from '../../assets/img/secondTopIcon.png';
import thirdImage from '../../assets/img/thirdTopIcon.png';
import styles from "../../css/organisms/TopDescription.module.css";

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: '300px'
  },
  top: {
    padding: '20px 0'
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 250,
    backgroundColor: 'rgba(190,184,245,0.5)',
    borderRadius: '18px',
    margin: '0 auto 5px',
  },
  rightCard: {
    padding: theme.spacing(2),
    maxWidth: 250,
    backgroundColor: 'rgba(190,184,245,0.5)',
    borderRadius: '18px',
    margin: '0 auto 5px',
  },
}));

const TopDescription = () => {
  const classes = useStyles();
  return (
    <>
      <div className={`${styles.container}`}>
        <Grid className={`${styles.cardWrapper}`} container>
          <Grid item xs={12}>
            <div>
              <Typography variant="h5">サービスについて</Typography>
              <p className={`${styles.description}`}>お題に沿った絵を描き、投稿できるサービスです。<br/> 童心に返って、自由に絵を描きましょう！！</p>
            </div>
          </Grid>
        </Grid>
        <Grid className={`${styles.cardWrapper}`} container>
          <Grid item xs={12}>
            <Typography variant="h5">サービスの使い方</Typography>          
          </Grid>
        </Grid>
        <Grid className={`${styles.cardWrapper}`} container >
          <Grid className={`${styles.item}`} item xs={12} md={6}> 
            <Card
              className={classes.card}
            ><strong>お題に沿って絵を描こう！！</strong></Card>
            <p className={`${styles.leftDescription}`} >アプリ内のお絵かき機能を準備しています。<br/> 
                お絵かき機能を活用してお題に沿った絵を描きましょう。<br/>
                お題は定期的に更新追加をしていく予定です！</p>
          </Grid>
          <Grid className={`${styles.item}`} item xs={12} md={6}>
            <img className={`${styles.image}`} src={firstImage} alt="firstImage" />
          </Grid>
        </Grid>
        <Grid className={`${styles.rightCardWrapper}`} container >
          <Grid className={`${styles.item}`} item xs={12} md={6}> 
            <Card
              className={classes.rightCard}
            ><strong>Twitterでシェアしよう！！</strong></Card>
            <p className={`${styles.rightDescription}`}>描いた絵をTwitterでシェアしましょう！<br/> 
                ちょっとしたクイズ形式で投稿ができます！<br/>
                あなたの画才が注目されるチャンスかも！？</p>
          </Grid>
          <Grid className={`${styles.item}`} item xs={12} md={6}>
            <img className={classes.image} src={secondImage} alt="secondImage" />  
          </Grid>
        </Grid>
        <Grid className={`${styles.cardWrapper}`} container >
          <Grid className={`${styles.item}`} item xs={12} md={6}>  
            <Card
              className={classes.card}
            ><strong>たくさん「いいね」しよう！！</strong></Card>  
            <p className={`${styles.leftDescription}`}>いいな、と思った絵には積極的にいいねをしましょう！<br/> 
              今後月間MVPとして「ベスト・オブ・画伯」賞を贈呈する予定です。<br/>
              光る画才を見つけたら迷わず「いいね」しましょう！</p>
          </Grid>
          <Grid className={`${styles.item}`} item xs={12} md={6}>
            <img className={classes.image} src={thirdImage} alt="thirdImage" />
          </Grid>
        </Grid>
      </div>
    </>
  )
};

export default TopDescription;
