export const getDeviceType = () => {
  const ios = isIOS() 
  const android = isAndroid() 
  const harmonyos = isHarmonyos() 
  if (ios || android || harmonyos) {
    return 'h5';
  } 
  return 'pc';
}

export const isIOS = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent) 
}

export const isAndroid = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return /android/.test(userAgent) 
}

export const isHarmonyos = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return /harmonyos/.test(userAgent) 
}