export default function Chatbot({
  courseId,
  lessonId,
  orgId,
}: {
  courseId: string;
  lessonId: string;
  orgId: number;
}) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const question = formData.get("question") as string;
    console.log("Question submitted:", question);
    console.log("Calling API with courseId:", courseId, "lessonId:", lessonId, "orgId:", orgId);

    console.log("API URL:", process.env.NEXT_PUBLIC_FASTAPI_URL);

    const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 7, // Replace with actual user ID
        lesson_id: lessonId,
        question,
        course_id: courseId,
        org_id: orgId,
      }),
    });
    console.log("API response status:", response.status);
    const data = await response.json();
    console.log(data);
  };
  return (
    <div>
      <h1>Jarvis</h1>
      <p>
        Jarvis, a AI tutor to assist to understand the lecture well in your own
        way.
      </p>
      <div>
        Chatbot for Course ID: {courseId}, Lesson ID: {lessonId}, Org ID:{" "}
        {orgId}
      </div>

      <div>
        <form onSubmit={handleSubmit} action="">
          <input
            type="text"
            name="question"
            placeholder="Type your question..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
