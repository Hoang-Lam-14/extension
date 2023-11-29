console.log('Background.js')

chrome.tabs.onCreated.addListener(async function (tab) {
	setTimeout(async () => {
		const response = await chrome.tabs.sendMessage(tab.id, {type: 'check_widget_code'})
		console.log('response', response)
		if (response.subiz_code_in_source && response.subiz_widget_loaded)
			chrome.action.setIcon({path: '/images/subiz_icon_active.png', tabId: tab.id})
		else chrome.action.setIcon({path: '/images/subiz_icon_inactive.png', tabId: tab.id})
	}, 1000)
})

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
	if (changeInfo.status !== 'complete') {
		chrome.action.setIcon({path: '/images/subiz_icon_inactive.png', tabId: tab.id})
	}

	if (changeInfo.status === 'complete') {
		setTimeout(async () => {
			const response = await chrome.tabs.sendMessage(tab.id, {type: 'check_widget_code'})
			console.log('response', response)
			if (response.subiz_code_in_source && response.subiz_widget_loaded)
				chrome.action.setIcon({path: '/images/subiz_icon_active.png', tabId: tab.id})
			else chrome.action.setIcon({path: '/images/subiz_icon_inactive.png', tabId: tab.id})
		}, 1000)
	}
})
