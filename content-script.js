chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')
	console.log('ssssssssss', request)
	if (request.type !== 'check_widget_code') {
		sendResponse('received')
	}

	let $widget = document.querySelector('#wpwidget')
	let {subiz_code_in_source, has_time_out} = findSubizScriptTag()

	sendResponse({
		subiz_code_in_source,
		has_time_out,
		subiz_widget_loaded: $widget ? true : false,
	})
})

console.log('content_scriptssssssss')

function isEmbededCodeValid(str = '') {
	return (
		str.indexOf('!function(') > -1 &&
		str.indexOf('s,u,b,i,z') > -1 &&
		str.indexOf('setAccount') > -1 &&
		str.indexOf('_subiz_init_') > -1
	)
}

function findSubizScriptTag() {
	let $scripts = document.querySelectorAll('script')
	let result = false
	let hasTimeout = false
	for (let i = 0; i < $scripts.length; i++) {
		let $script = $scripts[i]
		let text = $script.innerHTML || ''
		console.log('script texttttt', text)
		if (isEmbededCodeValid(text)) {
			result = true
			let textTrim = (text || '').trim()
			hasTimeout = textTrim.startsWith('setTimeout')
			break
		}
	}

	return {subiz_code_in_source: result, has_time_out: hasTimeout}
}
