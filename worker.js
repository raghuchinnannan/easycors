addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const apiUrl = url.searchParams.get('url')

  if (!apiUrl) {
    return new Response('Please provide a valid API URL.', { status: 400 })
  }

  let modifiedRequest = new Request(apiUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow'
  })

  // Remove the 'Origin' header from the request
  // modifiedRequest.headers.delete('Origin')

  // Add the necessary authentication headers to the request (if required)
  // modifiedRequest.headers.set('Authorization', 'Bearer YOUR_API_KEY')

  const response = await fetch(modifiedRequest)

  // Create a new Response object
  const modifiedResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  })

  // Add CORS headers to the response
  modifiedResponse.headers.set('Access-Control-Allow-Origin', '*')
  modifiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  modifiedResponse.headers.set('Access-Control-Allow-Headers', '*')

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '86400'
      }
    })
  }

  return modifiedResponse
}

