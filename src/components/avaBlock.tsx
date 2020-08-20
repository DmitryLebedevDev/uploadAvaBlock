import React, { useState, useRef, useEffect } from 'react';
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
  btnsBlock: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '25px',
  },
  btns: {
    paddingBottom: 10,
    '& > button + button': {
      marginLeft: 10
    }
  },
  uploadProgress: {
    position: 'absolute',
  },
  infoError: {
    position: 'absolute',
    top: 2,
    color: 'red',
  }
});

interface Iprops {
  avaUrl: string
  textError?: string
  isUploadingAva: boolean
  uploadProgress: undefined | number
  resetError: () => void
  uploadAvaRequestCancelThunk: () => void
  uploadAvaThunk: (ava?: File) => void
}

function AvaBlock(props: Iprops) {
  const [isEditMod, setIsEditMod] = useState(false);
  const [imgInfo, setImgInfo] = useState({url:props.avaUrl, file: undefined as undefined | File});
  const imgRef = useRef<HTMLImageElement|null>(null);
  
  const clearLocalImgAndResetError = () => {
    setImgInfo({
      url:props.avaUrl, 
      file: undefined
    });
    setIsEditMod(false);

    if (props.textError) {
      props.resetError();
    }
  };
  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (imgRef.current && e.target.files && e.target.files[0]) {
      const oFReader = new FileReader();
      const file = e.target.files[0];
      oFReader.readAsDataURL(e.target.files[0]);
      oFReader.onload = function (oFREvent) {
        if (oFREvent.target) {
          if (typeof oFREvent.target.result === 'string') {
            setIsEditMod(true);
            setImgInfo({
              url:oFREvent.target.result,
              file
            });
          }
        }
      };
    }
  }

  useEffect(() => {
    setImgInfo({
      url: props.avaUrl,
      file: undefined
    });
    setIsEditMod(false);
  }, [props.avaUrl])

  const styles = useStyles();
  return (
    <>
      <div className={styles.avaBlock}>
        <div className={styles.avgWrap}>
          <img className={styles.avaImg}
             ref={imgRef}
             src={imgInfo.url} 
             alt=""
          />
          <CircularProgress className={styles.uploadProgress}
                            variant="static"
                            value={props.uploadProgress}
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
      <div className={styles.btnsBlock}>
          { isEditMod ?
          <>
            {props.textError && !props.isUploadingAva &&
              <div className={styles.infoError}>
                {props.textError}
              </div>
            }
            <div className={styles.btns}>
              <Button onClick={() => props.uploadAvaThunk(imgInfo.file)}
                  disabled={props.isUploadingAva} 
                  variant="contained">
                {props.textError ? 'try again' : 'upload'}
              </Button>
              <Button onClick={clearLocalImgAndResetError}
                      disabled={props.isUploadingAva} 
                      variant="contained"
              >
                reset
              </Button>
            </div>
            <Button onClick={props.uploadAvaRequestCancelThunk}
                    disabled={!props.isUploadingAva}
                    variant="contained" style={{opacity: props.isUploadingAva ? 1 : 0, transition: '0.5s'}}
            >
              stop upload
            </Button>
          </>
          :
            <label htmlFor="uploadUserAva" >
              <Button variant="contained" 
                      component="span">
                change
              </Button>
            </label>
          }
      </div>
    </>
  );
}

export default AvaBlock