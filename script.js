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

  try {
    let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://yashkhadasare-beep.github.io",
        "X-Title": "Resume Builder"
      },
      body: JSON.stringify({
        model: "openchat/openchat-7b",
        messages: [{ role: "user", content: prompt }]
      })
    });

    let data = await response.json();
    console.log("Resume API:", data);

    if (!data.choices) {
      alert("Resume generation failed");
      return;
    }

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
        "Content-Type": "application/json",
        "HTTP-Referer": "https://yashkhadasare-beep.github.io",
        "X-Title": "Resume Builder"
      },
      body: JSON.stringify({
        model: "openchat/openchat-7b",
        messages: [{ role: "user", content: interviewPrompt }]
      })
    });

    let data2 = await response2.json();
    console.log("Interview API:", data2);

    if (!data2.choices) {
      alert("Interview question generation failed");
      return;
    }

    let questions = data2.choices[0].message.content;
    document.getElementById("interviewOutput").innerText = questions;

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Check console.");
  }
}
