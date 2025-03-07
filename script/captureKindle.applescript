set numberOfPages to 3
set targetApplication to "Kindle"
set saveAbsolutePath to "~/dev/ocr/screenshot/"
set startPageNumber to 1
set pageDirection to "right"
if pageDirection = "right" then set keyCharacter to (ASCII character 29)
if pageDirection = "left" then set keyCharacter to (ASCII character 28)
set pageTurnDelay to 1.0

on paddingWithZero(num)
	return text -3 thru -1 of ("000" & num)
end paddingWithZero

on cropScreenshot(screenshotPath)
	set cropWidth to 3600
	set cropHeight to 2200
	
	do shell script "sips -c " & cropHeight & " " & cropWidth & " " & screenshotPath & " --out " & screenshotPath
end cropScreenshot

activate application targetApplication

repeat with pageIndex from startPageNumber to numberOfPages
	set screenshotPath to (saveAbsolutePath & "page" & paddingWithZero(pageIndex) & ".png")
	
	delay pageTurnDelay
	do shell script "screencapture " & screenshotPath
	cropScreenshot(screenshotPath)
	tell application "System Events" to keystroke keyCharacter
end repeat
