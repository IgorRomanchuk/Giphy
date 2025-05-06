export const downloadGif = async (gifSrc: string, gifName: string) => {
  const gifBlob = await fetch(gifSrc)
    .then((res) => res.arrayBuffer())
    .then((buffer) => new Blob([buffer], { type: 'image/gif' }))

  const link = document.createElement('a')
  link.href = URL.createObjectURL(gifBlob)
  link.download = gifName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
