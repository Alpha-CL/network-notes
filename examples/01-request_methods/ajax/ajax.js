function _addURL(url, param) {
	if (param && Object.keys(param).length) {
		url += (url.indexOf('?') === -1 ? '?' : '&');
		Object.keys(param).map(key => {
			url += encodeURIComponent(key) + '=' + encodeURIComponent(param[key])
		})
	}
	return url;
}

function ajax({
	              url,
	              data = {},
	              method = 'get',
	              header = {},
	              async = true,
	              timeout = 60 * 1000
              }) {
	
	return new Promise((resolve, reject) => {
		
		const requestURL = method === 'get' ? _addURL(url, data) : url;
		const sendData = method === 'get' ? null : data;
		
		const xhr = new XMLHttpRequest();
		
		header = Object.assign({}, {
			'Content-Type': 'application/json'
		});
		
		if (header && Object.keys(header).length) {
			Object.keys(header).forEach(key => {
				xhr.setRequestHeader(key, header[key]);
			})
		}
		
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				try {
					if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
						const response = xhr.responseText;
						resolve({
							code: xhr.status,
							message: xhr.statusText,
							data: JSON.parse(response)
						});
					} else {
						const error = xhr.status + xhr.statusText;
						reject({
							code: xhr.status,
							message: xhr.statusText,
							data: error
						});
					}
				} catch (ex) {
					console.error(ex);
				}
			}
		}
		
		xhr.open(method, requestURL, async);
		
		xhr.timeout = timeout;
		xhr.ontimeout = () => {
			console.log('ajax request timeout');
		}
		
		xhr.send(sendData);
	})
}

ajax.get = (url, query) => {
	return ajax({
		url,
		data: query,
	});
};

ajax.post = (url, data) => {
	return ajax({
		url,
		data,
		method: 'post',
	});
};
