async function generateResume() {

  let name = document.getElementById("name").value;
  let education = document.getElementById("education").value;
  let skills = document.getElementById("skills").value;
  let experience = document.getElementById("experience").value;
  let field = document.getElementById("field").value;

  let prompt = `
Create a professional resume:
Name: ${name}
Education: ${education}
Skills: ${skills}
Experience: ${experience}
`;

  let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [{ role: "user", content: prompt }]
    })
  });

  let data = await response.json();
  let resume = data.choices[0].message.content;

  document.getElementById("resumeOutput").innerText = resume;

  // Interview Questions
  let interviewPrompt = `
Based on this resume:
${resume}

Generate 10 interview questions for ${field}
`;

  let response2 = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [{ role: "user", content: interviewPrompt }]
    })
  });

  let data2 = await response2.json();
  let questions = data2.choices[0].message.content;

  document.getElementById("interviewOutput").innerText = questions;
}
