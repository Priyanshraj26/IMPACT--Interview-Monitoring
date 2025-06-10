from dotenv import load_dotenv
from google import genai
import os

# Initialize the GenAI client with your API key
load_dotenv()
client = genai.Client(api_key= os.getenv("OPENAI_API_KEY"))

# Function to get grammar improvement suggestions
def wpm_suggestions(wpm, wpm_category):
    # Prompt for grammar suggestions based on the score
    prompt = f"""
    You are sitting in an interview and you're proficient in speaking english. Based on the words per minute score and category provided, give:
    2-3 suggestions for improving formal speech.
    Give only text output without any additional formatting or explanations. Make your tone humorous and friendly.
    WPM Score: {wpm}
    WPM Category: {wpm_category}

    Suggestions:
    """
    try:
        # Call Google GenAI to generate content
        response = client.models.generate_content(
            model="gemini-2.0-flash",  # Use the appropriate GenAI model
            contents=prompt
        )
        # Extract and return the suggestions
        return response.text
    except Exception as e:
        return f"Error: {e}"

# Example usage
if __name__ == "__main__":
    # Example grammar score
    wpm = 155
    wpm_category = "fast"
    # Get suggestions
    suggestions = wpm_suggestions(wpm, wpm_category)

    # Print the suggestions
    print("Dynamic Suggestions:")
    print(suggestions)