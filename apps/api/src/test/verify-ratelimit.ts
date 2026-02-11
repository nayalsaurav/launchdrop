const API_URL = "http://localhost:3005/api/health";

async function testRateLimit() {
  console.log("Starting rate limit test...");
  
  for (let i = 1; i <= 510; i++) {
    try {
      const response = await fetch(API_URL);
      const status = response.status;
      
      if (status === 429) {
        console.log(`✅ Success! Received 429 Too Many Requests at request #${i}`);
        return;
      }
      
      if (i % 50 === 0) {
        console.log(`Request #${i}: Status ${status}`);
      }
    } catch (error) {
       // @ts-ignore
      console.error(`Request #${i} failed: ${error.message}`);
      return;
    }
  }
  
  console.log("❌ Failed: Did not receive 429 after 210 requests.");
}

testRateLimit();
