async function generateResume() {
function formatResume(text) {
  return text
    .replace(/\n/g, "<br>")
    .replace(/- /g, "• ");
}  
  
  let name = document.getElementById("name").value;
  let education = document.getElementById("education").value;
  let skills = document.getElementById("skills").value;
  let experience = document.getElementById("experience").value;
  let field = document.getElementById("field").value;

  let prompt = `
Create a clean, professional resume in this EXACT format:

Name: ${name}

Professional Summary:
(Write 2-3 lines)

Skills:
- Skill 1
- Skill 2
- Skill 3

Experience:
- Role at Company
  - Responsibility 1
  - Responsibility 2

Education:
- Degree, College

Keep formatting clean, use bullet points, no extra symbols.
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
        model: "meta-llama/llama-3-8b-instruct",
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
        "Authorization": "Bearer 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",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://yashkhadasare-beep.github.io",
        "X-Title": "Resume Builder"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",
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
