// script to inject to webpage so if you want to retrieve GLOBAL_VARIABLE from webpage

console.log('script.jssssssssssssss')
setTimeout(function () {
	/* Example: Send data from the page to your Chrome extension */
	document.dispatchEvent(
		new CustomEvent('SBZ_2023', {
			detail: window.sbz_store, // Some variable from Gmail.
		}),
	)
	console.log('111111111111', window.sbz_store)
}, 0)
