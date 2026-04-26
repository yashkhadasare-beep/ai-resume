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
- ${skills}

Experience:
- ${experience}

Education:
- ${education}

Keep formatting clean, use bullet points, no extra symbols.
`;

  try {
    // ✅ CALL VERCEL API
    let response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    let data = await response.json();
    console.log("Resume API:", data);

    if (!data.choices) {
      alert("Resume generation failed");
      return;
    }

    let resume = data.choices[0].message.content;
    document.getElementById("resumeOutput").innerHTML = formatResume(resume);

    // 🔁 Interview Questions
    let interviewPrompt = `
Based on this resume:
${resume}

Generate 10 interview questions for ${field}
`;

    let response2 = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: interviewPrompt })
    });

    let data2 = await response2.json();
    console.log("Interview API:", data2);

    if (!data2.choices) {
      alert("Interview question generation failed");
      return;
    }

    let questions = data2.choices[0].message.content;
    document.getElementById("interviewOutput").innerHTML = formatResume(questions);

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Check console.");
  }
}
