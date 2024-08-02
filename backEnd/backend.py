from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from openai import OpenAI
import logging

app = Flask(__name__)
CORS(app)

# Load environment variables from .env file
load_dotenv()

# Access the OpenAI API key from the environment variable
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Configure logging
logging.basicConfig(level=logging.DEBUG)

@app.route('/recommend', methods=['POST'])
def recommend():
    preferences = request.json
    user_input = f"""
    Setting: {preferences.get('setting')}
    Current Mood: {preferences.get('currentMood')}
    Desired Mood: {preferences.get('desiredMood')}
    Duration: {preferences.get('duration')} minutes
    Genre: {preferences.get('genre')}
    Favorite Actors: {preferences.get('actors')}
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # Using the specified model
            messages=[
                {"role": "system", "content": "You are a movie and TV show recommender. Make responses as short and direct as possible. Provide a short description of the title and the relevant genre(s) after the title name."},
                {"role": "user", "content": f"Recommend some movies or TV shows based on: {user_input}. Provide names the relevant hosting sites (like Netflix, Hulu, Amazon Prime, etc.) where these can be watched prefaced with the words 'Available on:'. Format each recommendation as follows: \n### \nTitle: *Title Name*  \nGenre: Genre(s)  \nDescription: Description of the movie or TV show.  \nAvailable on: Hosting site \n###\nMake sure to separate each recommendation with '###' delimiters and include the required fields exactly as specified."}
            ]
        )

        recommendations = response.choices[0].message.content.strip()
        return jsonify(recommendations=recommendations)

    except Exception as e:
        logging.error("Error occurred: %s", str(e))
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
