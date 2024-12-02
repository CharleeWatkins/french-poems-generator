async function generatePoem(event) {
  event.preventDefault();  // Prevent the form from submitting

  const topic = document.querySelector("input[type='text']").value;

  if (!topic) {
    alert("Please enter a topic!");
    return;
  }

  const poemDiv = document.getElementById('poem');
  poemDiv.innerHTML = "Generating poem...";  // Show loading text

  try {
    // API call to OpenAI to generate a poem
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `2t5o813b3caa04b3457d8dcba10d7a3f`,  // Replace YOUR_API_KEY with your actual OpenAI API key
      },
      body: JSON.stringify({
        model: "text-davinci-003",  // Use a language model like davinci
        prompt: `Write a French poem about ${topic}`,  // Dynamic prompt based on user input
        max_tokens: 150,  // Limit the number of tokens in the response
      }),
    });

    // Parse the JSON response from OpenAI
    const data = await response.json();
    const poem = data.choices[0].text.trim();  // Extract the poem text

    // Use Typewriter.js to animate the poem
    new Typewriter("#poem", {
      strings: [poem],  // Poem to display
      autoStart: true,
      delay: 75,  // Delay between typing (milliseconds)
      cursor: "|",
    });
  } catch (error) {
    console.error("Error generating poem:", error);
    poemDiv.innerHTML = "Sorry, there was an error generating the poem. Please try again later.";
  }
}

// Add event listener to the form
let poemFormElement = document.querySelector("#poem-generator-form");
poemFormElement.addEventListener("submit", generatePoem);
