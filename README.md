# 🌐 easyCORS
easyCORS is a simple Cloudflare Workers based CORS Proxy

# 🌐 Public CORS Proxy – `https://cors.raghu.workers.dev`

A free, public CORS proxy powered by **Cloudflare Workers** that allows you to bypass CORS issues while developing client-side applications.

## 🔧 How It Works

Browsers restrict cross-origin API requests unless the server sends appropriate CORS headers. This proxy:

- Accepts a URL via `?url=...`
- Forwards your request to that URL
- Returns the response **with CORS headers**, so your browser accepts it

---

## 📥 Usage

### 📌 Endpoint
`https://cors.raghu.workers.dev/?url=TARGET_URL`

### 🧪 Example (GET Request)

```javascript
const target = 'https://api.publicapis.org/entries';
const proxy = `https://cors.raghu.workers.dev/?url=${encodeURIComponent(target)}`;

fetch(proxy)
  .then(res => res.json())
  .then(data => console.log(data));
```

## 🔐 Supported Features
- ✅ GET, POST, PUT, DELETE, OPTIONS

- ✅ Preflight OPTIONS requests handled

- ✅ Adds CORS headers:

  - `Access-Control-Allow-Origin: *`

  - `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`

  - `Access-Control-Allow-Headers: *`

## 🚧 Usage Notes
- ⚠️ For development, testing, and open APIs only.

- ❌ Do not use to bypass auth-protected APIs unless you add your own auth logic.

- 🔐 Want to add auth? Customize the code:

```js
// modifiedRequest.headers.set('Authorization', 'Bearer YOUR_API_KEY');
```

## 💡 Curl Example
```bash
curl "https://cors.raghu.workers.dev/?url=https://api.publicapis.org/entries"
```

## 👨‍💻 Hosted & Maintained by
[Raghu Chinnannan](https://github.com/raghuchinnannan)

Built using [Cloudflare Workers](https://developers.cloudflare.com/workers/).


