document.addEventListener("DOMContentLoaded", () => {
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");
    const newQuoteBtn = document.getElementById("new-quote-btn");
    const emailInput = document.getElementById("email-input");
    const emailQuoteBtn = document.getElementById("email-quote-btn");
  
    const API_KEY = 'cY5eb2ZW0+vU4L4T0l2Jmg==YzmNfsxnguZmjgAD'; 
    const API_URL = 'https://api.api-ninjas.com/v1/quotes';
  
    async function fetchQuote() {
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: { 'X-Api-Key': API_KEY },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        const quote = data[0]; 
        quoteText.textContent = `"${quote.quote}"`;
        quoteAuthor.textContent = `- ${quote.author}`;
      } catch (error) {
        console.error('Error fetching the quote:', error);
        quoteText.textContent = "An error occurred. Please try again.";
        quoteAuthor.textContent = "";
      }
    }
  
    async function emailQuote() {
      const email = emailInput.value;
      if (!email) {
        alert("Please enter a valid email.");
        return;
      }
  
      const quote = quoteText.textContent;
      const author = quoteAuthor.textContent;
  
      try {
        const response = await fetch("http://127.0.0.1:5000/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            quote,
            author,
          }),
        });
  
        const result = await response.json();
        if (result.success) {
          alert("Quote emailed successfully!");
        } else {
          alert("Failed to send the email.");
        }
      } catch (error) {
        alert("An error occurred while sending the email.");
      }
    }
  
    newQuoteBtn.addEventListener("click", fetchQuote);
    emailQuoteBtn.addEventListener("click", emailQuote);
  
   
    fetchQuote();
  });
  
