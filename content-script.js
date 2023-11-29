chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')
	console.log('ssssssssss', request)
	if (request.type !== 'check_widget_code') {
		sendResponse('received')
	}

	let $widget = document.querySelector('#wpwidget, [sbz-data="widget"]')
	let accId = $widget ? $widget.getAttribute('sbz-plugin-account-id') : null
	let {subiz_code_in_source, has_time_out} = findSubizScriptTag()

	let $widgetLayout = document.querySelector('.desktop .widget-layout, .mobile .widget-layout')

	sendResponse({
		subiz_code_in_source,
		has_time_out,
		subiz_widget_loaded: $widget ? true : false,
		subiz_widget_displayed: $widgetLayout ? true : false,
		subiz_widget_opacity_1: $widgetLayout ? $widgetLayout.style.opacity === '1' : false,
		accId,
	})
})

console.log('content_scriptssssssss')

function hasEmbededCode(str = '') {
	return (
		str.indexOf('!function') > -1 &&
		str.indexOf('setAccount') > -1 &&
		str.indexOf('_subiz_init_') > -1 &&
		str.indexOf('widget.subiz.net')
	)
}

function findSubizScriptTag() {
	let $scripts = document.querySelectorAll('script')
	let result = false
	let hasTimeout = false
	for (let i = 0; i < $scripts.length; i++) {
		let $script = $scripts[i]
		let text = $script.innerHTML || ''
		if (hasEmbededCode(text)) {
			result = true
			let textTrim = (text || '').trim()
			// setTimeout before subiz function
			hasTimeout = textTrim.indexOf('setTimeout') < textTrim.indexOf('!function')
			break
		}
	}

	return {subiz_code_in_source: result, has_time_out: hasTimeout}
}
