import * as axios from 'axios'

export let uploadAvaRequestCancel: {cancel?: axios.Canceler} = {};
export const uploadAvaRequest = (ava: FormData, watchProgress: (value: number) => void) => axios.default
  .post<IdefaultRequest<{link: string}>>(`${process.env.REACT_APP_BACK_URL}loadImage`, ava, {
    onUploadProgress: (e) => { watchProgress(Math.round(e.loaded / e.total * 100))},
    cancelToken: new axios.default.CancelToken((c) => { uploadAvaRequestCancel.cancel = c })
  })
  .then(reqData => reqData.data)


export enum resultCodeInfo {
  sicces = 0,
  error = 1
}
export interface IerrorRequest {
  resultCode: resultCodeInfo.error
  messag: string
}
export interface IsuccesRequest<R> {
  resultCode: resultCodeInfo.sicces
  data?: R
}
export type IdefaultRequest<R=void> = IerrorRequest | IsuccesRequest<R>