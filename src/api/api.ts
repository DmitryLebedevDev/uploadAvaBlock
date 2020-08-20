import * as axios from 'axios'

export let uploadAvaRequestCancel: {cancel?: axios.Canceler} = {};
export const uploadAvaRequest = (ava: FormData, watchProgress: (value: number) => void) => axios.default
  .post<Promise<string>>(`${process.env.REACT_APP_BACK_URL}upload`, ava, {
    onUploadProgress: (e) => { watchProgress(Math.round(e.loaded / e.total * 100))},
    cancelToken: new axios.default.CancelToken((c) => { uploadAvaRequestCancel.cancel = c })
  })
  .then(reqData => reqData.data)