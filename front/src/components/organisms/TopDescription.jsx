import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Card } from "@material-ui/core";
import firstImage from '../../assets/img/firstTopIcon.png';
import secondImage from '../../assets/img/secondTopIcon.png';
import thirdImage from '../../assets/img/thirdTopIcon.png';
import styles from "../../css/organisms/TopDescription.module.css";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    maxWidth: 250,
    backgroundColor: 'rgba(190,184,245,0.5)',
    borderRadius: '18px',
    margin: '0 auto 5px',
  },
  secondCard: {
    padding: theme.spacing(2),
    maxWidth: 300,
    backgroundColor: 'rgba(190,184,245,0.5)',
    borderRadius: '18px',
    margin: '0 auto 5px',
  },
  thirdCard: {
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
              <Typography variant="h5" style={{ fontWeight: 'bold' }} >サービスについて</Typography>
              <p className={`${styles.description}`}>お題に沿った絵を描き、投稿できるサービスです。<br/> 童心に返って、自由に絵を描きましょう！！</p>
            </div>
          </Grid>
        </Grid>
        <Grid className={`${styles.cardWrapper}`} container>
          <Grid item xs={12}>
            <Typography variant="h5" style={{ fontWeight: 'bold' }} >サービスの使い方</Typography>
          </Grid>
        </Grid>
        <Grid className={`${styles.cardWrapper}`} container >
          <Grid className={`${styles.item}`} item xs={12} md={8}> 
            <Card
              className={classes.card}
            ><strong>お題に沿って絵を描こう！！</strong></Card>
            <p className={`${styles.leftDescription}`} >
                お題に沿って絵を描きましょう！<br/>
                投稿すれば、誰かいいねしてくれるかも！？<br />
                お題は定期的に更新追加をしていく予定です！</p>
          </Grid>
          <Grid className={`${styles.item}`} item xs={12} md={4}>
            <img className={`${styles.rightImage}`} src={firstImage} alt="firstImage" />
          </Grid>
        </Grid>
        <Grid className={`${styles.rightCardWrapper}`} container >
          <Grid className={`${styles.item}`} item xs={12} md={7}> 
            <Card
              className={classes.secondCard}
            ><strong>Twitterでシェアしよう！（実装中）</strong></Card>
            <p className={`${styles.rightDescription}`}>描いた絵をTwitterでシェアしましょう！<br/> 
                ちょっとしたクイズ形式で投稿ができます！<br/>
                あなたの画才が注目されるチャンスかも！？</p>
          </Grid>
          <Grid className={`${styles.item}`} item xs={12} md={5}>
            <img className={`${styles.image}`} src={secondImage} alt="secondImage" />  
          </Grid>
        </Grid>
        <Grid className={`${styles.cardWrapper}`} container >
          <Grid className={`${styles.item}`} item xs={12} md={8}>  
            <Card
              className={classes.thirdCard}
            ><strong>たくさん「いいね」しよう！！</strong></Card>  
            <p className={`${styles.leftDescription}`}>いいな、と思った絵にいいねしましょう！<br/> 
              人気のユーザーは月間ランキングに表示されます。<br/>
              光る才能を見つけたら迷わず「いいね」しましょう！</p>
          </Grid>
          <Grid className={`${styles.item}`} item xs={12} md={4}>
            <img className={`${styles.rightImage}`} src={thirdImage} alt="thirdImage" />
          </Grid>
        </Grid>
      </div>
    </>
  )
};

export default TopDescription;
