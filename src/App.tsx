import React, { useState, useRef } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const widthAva = 200;

const useStyles = makeStyles({
  avgWrap: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: widthAva,
    width: widthAva,
    borderRadius: widthAva/2,
    overflow: 'hidden',
  },
  avaImg: {
    height: 'inherit',
  },
  avaBlock: {
    display: 'flex',
    justifyContent: 'center'
  },
  btsBlock: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '10px',
    '& > button + button': {
      marginLeft: 10
    }
  },
  uploadProgress: {
    position: 'absolute',
  }
});

function App() {
  const [isEditMod, setIsEditMod] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const imgRef = useRef<HTMLImageElement|null>(null);
  const clearLocalImg = () => {setImgUrl(''); setIsEditMod(false)};
  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (imgRef.current && e.target.files && e.target.files[0]) {
      var oFReader = new FileReader();
      oFReader.readAsDataURL(e.target.files[0]);
      oFReader.onload = function (oFREvent) {
        if (oFREvent.target) {
          if (typeof oFREvent.target.result === 'string') {
            setIsEditMod(true);
            setImgUrl(oFREvent.target.result);
          }
        }
      };
    }
  }

  const styles = useStyles();
  return (
    <div className="App">
      <div className={styles.avaBlock}>
        <div className={styles.avgWrap}>
          <img className={styles.avaImg}
             ref={imgRef}
             src={imgUrl} 
             alt=""
          />
          <CircularProgress className={styles.uploadProgress}
                            variant="static"
                            value={95}
                            size={widthAva+(widthAva/8)}
          />
        </div>
        <input id="uploadUserAva" 
               type="file" 
               style={{display: 'none'}} 
               onChange={handleChangeImg}
               accept=".png,.jpg"
               size={2000000}
        />
      </div>
      <div className={styles.btsBlock}>
        {isEditMod ? <>
          <Button variant="contained">
            upload
          </Button>
          <Button variant="contained" onClick={clearLocalImg}>
            reset
          </Button>
        </> :
          <label htmlFor="uploadUserAva" >
            <Button variant="contained" component="span">
              change
            </Button>
          </label>
        }
      </div>
    </div>
  );
}

export default App;
