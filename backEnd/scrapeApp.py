from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import requests
from bs4 import BeautifulSoup
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/scrape', methods=['POST'])
def scrape():
    data = request.get_json()
    if not data:
        print("No input data provided")
        return jsonify({'error': 'No input data provided'}), 400

    genre = data.get('genre')
    location = data.get('location')
    start_date = data.get('startDate')
    end_date = data.get('endDate')

    if start_date and end_date:
        search_url = f"https://www.eventbrite.com/d/{location}/music--events/{genre}/?page=1&start_date={start_date}&end_date={end_date}"
    else:
        search_url = f"https://www.eventbrite.com/d/{location}/music--events/{genre}/?page=1"
    
    response = requests.get(search_url)
    
    soup = BeautifulSoup(response.content, 'html.parser')

    section = soup.find('ul', class_='SearchResultPanelContentEventCardList-module__eventList___1YEh_')

    if section is None:
        raise Exception("Failed to find the section containing the event listings")

    events = section.find_all('li')

    eventList = []

    for event in events:
        
        linkTag = event.find('a', class_='event-card-link')
        hrefUrl = linkTag['href'] if linkTag else 'N/A'
        
        imgTag = linkTag.find('img') if linkTag else None
        imgSourceUrl = imgTag['src'] if imgTag else 'N/A'

        name = event.find('h2', class_='Typography_root__487rx #3a3247 Typography_body-lg__487rx event-card__clamp-line--two Typography_align-match-parent__487rx').get_text(strip=True)
        date_time = event.find('p', class_='Typography_root__487rx #3a3247 Typography_body-md-bold__487rx Typography_align-match-parent__487rx').get_text(strip=True)
        place = event.find('p', class_='Typography_root__487rx #585163 Typography_body-md__487rx event-card__clamp-line--one Typography_align-match-parent__487rx').get_text(strip=True)

        eventData = {
            "Name": name,
            "Date": date_time,
            "Place": place,
            "Price": 'N/A',
            "EventURL": hrefUrl,
            "ImageURL": imgSourceUrl
        }

        eventList.append(eventData)

    with open('events.json', 'w') as json_file:
        json.dump(eventList, json_file, indent=4)
        print("Events saved to events.json")

    with open('events.json', 'r') as json_file:
        try:
            events = json.load(json_file)
            print("JSON file read successfully")
            return jsonify(events)
        except json.JSONDecodeError as e:
            print(f'Error decoding JSON: {e}')
            return jsonify({'error': 'Error decoding JSON'}), 500

if __name__ == '__main__':
    app.run(debug=True)
