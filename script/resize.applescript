set cropWidth to 0 -- 切り抜きサイズ(中心から)
set cropHeight to 0 -- 切り抜きサイズ(中心から)
set resizeWidth to 0 -- リサイズ横(切り抜く前のサイズ換算=画面横/切り抜き横*仕上がり横)

if cropWidth is not 0 and cropHeight is not 0 then
    if resizeWidth is not 0 then
        do shell script "sips -c " & cropHeight & " " & cropWidth & " --resampleWidth " & resizeWidth & " " & screenshotPath & " --out " & screenshotPath
    else
        do shell script "sips -c " & cropHeight & " " & cropWidth & " " & screenshotPath & " --out " & screenshotPath
    end if
end if