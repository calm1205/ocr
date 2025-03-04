// Kindle ページスクリーンショット用の JavaScript
// JXA (JavaScript for Automation) を使用

function run() {
    // 設定パラメータ
    const pages = 5;                         // ページ数
    const target = "Kindle";                 // 対象アプリ
    const savepath = "~/Desktop/screenshot/"; // 保存フォルダ
    const spage = 1;                         // 開始ファイル番号
    const pagedir = 2;                       // めくり方向(1=左 2=右)
    const pausetime = 1.0;                   // ページめくりウエイト(秒)
    const cropx = 0;                         // 切り抜きサイズX(中心から)
    const cropy = 0;                         // 切り抜きサイズY(中心から)
    const resizew = 0;                       // リサイズ横
    
    // ページめくりキーの設定
    const keychar = (pagedir === 1) ? String.fromCharCode(28) : String.fromCharCode(29);
    
    // アプリをアクティブにする
    if (target !== "") {
        const app = Application(target);
        app.activate();
    }
    
    // 初期ウエイト
    delay(pausetime);
    
    // ページごとの処理
    for (let i = spage; i <= pages; i++) {
        // ファイル名のフォーマット
        let dp;
        if (i < 10) {
            dp = "00" + i;
        } else if (i < 100) {
            dp = "0" + i;
        } else {
            dp = i.toString();
        }
        
        // スクリーンショットのパス
        const spath = savepath + "p" + dp + ".png";
        
        // スクリーンショットを撮る
        const screenCapture = `screencapture ${spath}`;
        $.system(screenCapture);
        
        // 画像処理（切り抜きとリサイズ）
        if (cropx !== 0 && cropy !== 0) {
            let sipsCommand;
            if (resizew !== 0) {
                sipsCommand = `sips -c ${cropy} ${cropx} --resampleWidth ${resizew} ${spath} --out ${spath}`;
            } else {
                sipsCommand = `sips -c ${cropy} ${cropx} ${spath} --out ${spath}`;
            }
            $.system(sipsCommand);
        }
        
        // ページをめくる
        const systemEvents = Application("System Events");
        systemEvents.keystroke(keychar);
        
        // ページめくり後のウエイト
        delay(pausetime);
    }
    
    // 現在のアプリをアクティブにする
    Application.currentApplication().activate();
}

// スクリプトを実行
run();
