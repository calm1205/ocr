/**
 * 指定されたページ数分のKindleのスクリーンショットを撮影
 * @param {{ totalPages: number }} 撮影するページ数
 * @param {{ saveScreenshotPath: string }} スクリーンショットの保存先
 * @param {{ turnPageDirection: "left" | "right" }} ページを切り替える方向
 */
const captureKindleScreenshots = ({ totalPages, saveScreenshotPath, turnPageDirection }) => {
  const targetApplication = "Kindle"
  const startPage = 1
  const pauseTime = 1.0
  const cropX = 0
  const cropY = 0
  const resizeWidth = 0
  const LEFT_ARROW_KEY_CODE = 28 // 左矢印キーのキーコード
  const RIGHT_ARROW_KEY_CODE = 29 // 右矢印キーのキーコード
  const keyChar = turnPageDirection === "right" ? RIGHT_ARROW_KEY_CODE : LEFT_ARROW_KEY_CODE

  const app = Application(targetApplication)
  app.activate()

  delay(pauseTime)

  for (let i = startPage; i <= totalPages; i++) {
    const pageNumber = String(i).padStart(3, "0") // ページ番号を3桁に0パディング
    const savePathName = `${saveScreenshotPath}${pageNumber}.png`

    Application.currentApplication().doShellScript(`screencapture ${savePathName}`)

    if (cropX !== 0 && cropY !== 0) {
      let cropCommand = `sips -c ${cropY} ${cropX} ${savePathName} --out ${savePathName}`
      if (resizeWidth !== 0) {
        cropCommand = `sips -c ${cropY} ${cropX} --resampleWidth ${resizeWidth} ${savePathName} --out ${savePathName}`
      }
      Application.currentApplication().doShellScript(cropCommand)
    }

    Application("System Events").keyCode(keyChar)
    delay(pauseTime)
  }
}

captureKindleScreenshots({
  totalPages: 5,
  saveScreenshotPath: "~/Desktop/screenshot/",
  turnPageDirection: "right",
})
