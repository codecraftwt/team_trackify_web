const https = require('https');

https.get('https://talk2site.com/widget.js', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const match = data.match(/id\s*:\s*["']([^"']+)["']/g);
    console.log("IDs found:", match);
    const className = data.match(/class(?:Name)?\s*:\s*["']([^"']+)["']/g);
    console.log("Classes found:", className);
    // Print first 500 characters to get a sense
    console.log(data.substring(0, 500));
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
