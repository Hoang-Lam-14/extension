console.log('popup hello world')

const $btn_check = document.querySelector('#btn_check')
const $btn_reset = document.querySelector('#btn_reset')

$btn_check.addEventListener('click', function (e) {
	;(async () => {
		const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true})
		console.log('111111111', tab)
		const response = await chrome.tabs.sendMessage(tab.id, {type: 'check_widget_code'})
		// do something with response here, not outside the function
		console.log(response)
		buildResultHtml(response)
	})()
})

$btn_reset.addEventListener('click', function (e) {
	let $result = document.querySelector('#result')
	$result.innerHTML = ''
})

function buildResultHtml({subiz_widget_loaded, subiz_code_in_source, has_time_out}) {
	let $code = subiz_code_in_source
		? '<div class="has-text-success">✓ Phát hiện mã nhúng trong code web</div>'
		: '<div class="has-text-danger">✕ Không có mã nhúng trong code web</div>'
	let $loaded = subiz_widget_loaded
		? '<div class="has-text-success">✓ Tải cửa sổ chat thành công</div>'
		: '<div class="has-text-danger">✕ Không tải đc cửa sổ chat</div>'
	let reason = ''
	if (!subiz_widget_loaded && subiz_code_in_source) {
		reason = 'Mã nhúng có thể bị đặt sai vị trí hoặc sai cú pháp, vui lòng báo đội Tech kiểm tra'
    if (has_time_out) {
		  reason = 'Mã nhúng nằm trong <code>setTimeout</code>, vui lòng đợi giây lát và check lại'
    }
	} else if (subiz_widget_loaded && !subiz_code_in_source) {
    reason = 'Mã nhúng có thể được đặt trong các công cụ khác như Google Tag Manager, ...'
	}

	let $result = document.querySelector('#result')
  let resultHTML = `${$code} ${$loaded}`
  if (reason) resultHTML += `<div class="has-text-gray">${reason}</div>`
	$result.innerHTML = resultHTML
}
