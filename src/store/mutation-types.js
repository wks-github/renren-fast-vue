export const ACCESS_TOKEN = 'Access-Token'
export const USER_INFO = 'User-Info'

export const DEBUG_HASH = 'Debug-Hash'
export const CLIENT_ID = 'Client-Id'
export const NONCE = 'Nonce'
export const TIMESTAMP = 'Timestamp'
export const X_LC_VERSION = 'Version'
export const SIGNATURE = 'Signature'
export const AUTHORIZATION = 'Authorization'

export const SIDEBAR_TYPE = 'sidebar_type'
export const TOGGLE_MOBILE_TYPE = 'is_mobile'
export const TOGGLE_NAV_THEME = 'nav_theme'
export const TOGGLE_LAYOUT = 'layout'
export const TOGGLE_FIXED_HEADER = 'fixed_header'
export const TOGGLE_FIXED_SIDEBAR = 'fixed_sidebar'
export const TOGGLE_CONTENT_WIDTH = 'content_width'
export const TOGGLE_HIDE_HEADER = 'auto_hide_header'
export const TOGGLE_COLOR = 'color'
export const TOGGLE_WEAK = 'weak'
export const TOGGLE_MULTI_TAB = 'multi_tab'
export const APP_LANGUAGE = 'app_language'

export const CONTENT_WIDTH_TYPE = {
  Fluid: 'Fluid',
  Fixed: 'Fixed'
}

export const NAV_THEME = {
  LIGHT: 'light',
  DARK: 'dark'
}

/*
     视频类型
    MP4("mp4", "video", 1),video/mp4
    MOV("mov", "video", 1),video/vnd.sealedmedia.softseal.mov   video/quicktime
    AVI("avi", "video", 1),video/av
    MPEG("mpeg", "video", 1),video/mpg
    FLV("flv", "video", 1),video/x-flv
    RMVB("rmvb", "video", 1),application/vnd.rn-realmedia

    图片类型
    BMP("bmp", "photo", 3),image/bmp
    JPG("jpg", "photo", 3),image/jpeg
    JPEG("jpeg", "photo", 3),image/jpeg
    PNG("png", "photo", 3),image/png
    GIF("gif", "photo", 3),image/gif

    音频类型
    MP3("mp3", "audio", 2),audio/mpeg
    AAC("aac", "audio", 2),audio/aac
    WAV("wav", "audio", 2),audio/wav
   */
const fixes_video = ['mp4', 'mov', 'avi', 'mpeg', 'flv', 'rmvb']
const fixes_audio = ['mp3', 'acc', 'wav']
const fixes_photo = ['bmp', 'jpg', 'jpeg', 'png', 'gif']
export const FILE_CUSTOM = {
  RESOURCE_TYPE: function (parameterType, parameterName) {
    const fix = parameterName.substring(parameterName.lastIndexOf('.') + 1, parameterName.length)
    let resobj
    switch (parameterType) {
      case 'video/mp4':
        resobj = {
          code: '1',
          type: 'video',
          postfix: 'mp4'
        }
        break
      case 'video/quicktime':
        resobj = {
          code: '1',
          type: 'video',
          postfix: 'mov'
        }
        break
      case 'video/av':
        resobj = {
          code: '1',
          type: 'video',
          postfix: 'avi'
        }
        break
      case 'video/mpg':
        resobj = {
          code: '1',
          type: 'video',
          postfix: 'mpeg'
        }
        break
      case 'video/x-flv':
        resobj = {
          code: '1',
          type: 'video',
          postfix: 'flv'
        }
        break
      case 'application/vnd.rn-realmedia':
        resobj = {
          code: '1',
          type: 'video',
          postfix: 'rmvb'
        }
        break
      case 'audio/mpeg':
        resobj = {
          code: '2',
          type: 'audio',
          postfix: 'mp3'
        }
        break
      case 'audio/aac':
        resobj = {
          code: '2',
          type: 'audio',
          postfix: 'aac'
        }
        break
      case 'audio/wav':
        resobj = {
          code: '2',
          type: 'audio',
          postfix: 'wav'
        }
        break
      case 'image/png':
        resobj = {
          code: '3',
          type: 'photo',
          postfix: 'png'
        }
        break
      case 'image/jpg':
        resobj = {
          code: '3',
          type: 'photo',
          postfix: 'jpg'
        }
        break
      case 'image/jpeg':
        resobj = {
          code: '3',
          type: 'photo',
          postfix: 'jpeg'
        }
        break
      // case 'image/png':
      //   resobj = {
      //     code: '3',
      //     type: 'photo',
      //     postfix: 'png'
      //   }
      //   break
      case 'image/gif':
        resobj = {
          code: '3',
          type: 'photo',
          postfix: 'gif'
        }
        break
      default:
        const v = fixes_video.includes(fix)
        if (v) {
          resobj = {
            code: '1',
            type: 'video',
            postfix: fix
          }
          break
        }
        const a = fixes_audio.includes(fix)
        if (a) {
          resobj = {
            code: '2',
            type: 'audio',
            postfix: fix
          }
          break
        }
        const p = fixes_photo.includes(fix)
        if (p) {
          resobj = {
            code: '3',
            type: 'photo',
            postfix: fix
          }
          break
        }
        resobj = {
          code: '4',
          type: 'other',
          postfix: fix
        }
    }
    return resobj
  }
}
