import csv
import json
import random
import re
from collections import defaultdict

from textblob import TextBlob

negative = [4, 5]
positive = [0, 1]
neutral = [2, 3, 6]
path = "output.csv"
path2 = "output_tweet.csv"
countries = []
n_array = [1, 2, 3, 4, 5]
favoring_countries = ["US", "India", "UK", "France", "Argentina", "Portugal", "Italy", "Spain", "Brazil", "Netherlands"]


def readcountries():
    with open('WebContent/Web-INF/countries.geojson') as json_data:
        d = json.load(json_data)
        for row in d['features']:
            try:
                countries.append(str(row['properties']['ADMIN']))
            except:
                continue


def clean_tweet(tweet):
    return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])| (\w +:\ / {2}/ \S +)", " ", tweet).split())


def get_tweet_sentiment(tweet):
    analysis = TextBlob(clean_tweet(tweet))
    p = analysis.sentiment.polarity
    if p > 0:
        return random.choice(positive)
    elif p == 0:
        return random.choice(neutral)
    else:
        return random.choice(negative)


def get_tweets():
    tweets = []
    # f2_write.writerow()
    with open(path) as f1, open(path2, 'wb') as f2:
        isr = csv.reader(f1, delimiter=',')
        f2_write = csv.writer(f2)
        x = 0
        for row in isr:
            x = x + 1
            if x == 1:
                f2_write.writerow(row)
                continue
            if x % 3 == 0:
                row[2] = str(random.choice(countries))
                print row[2]
            else:
                row[2] = random.choice(favoring_countries)
            parsed_tweet = {'text': row[1], 'sentiment': get_tweet_sentiment(row[1])}
            tweets.append(parsed_tweet)
            row[3] = parsed_tweet['sentiment']
            row[-1] = random.choice(n_array)
            f2_write.writerow(row)
            if x == 5000:
                break
    return tweets


def createData():
    readcountries()
    print countries
    tweets = get_tweets()
    ptweets = [tweet for tweet in tweets if tweet['sentiment'] in positive]
    print("Positive tweets percentage: {} %".format(100 * len(ptweets) / len(tweets)))
    ntweets = [tweet for tweet in tweets if tweet['sentiment'] in negative]
    print("Negative tweets percentage: {} %".format(100 * len(ntweets) / len(tweets)))
    print("Neutral tweets percentage: {} % \
          ".format(100 * (len(tweets) - len(ntweets) - len(ptweets)) / len(tweets)))


def createChoroMapData():
    countries_tweet = defaultdict(int)
    countries_tweet1 = defaultdict(int)
    countries_tweet2 = defaultdict(int)
    countries_tweet3 = defaultdict(int)
    countries_tweet4 = defaultdict(int)
    countries_tweet5 = defaultdict(int)

    with open(path2) as f1:
        isr = csv.reader(f1, delimiter=',')
        for row in isr:
            countries_tweet[row[2]] += 1
            if row[-1] == 1:
                countries_tweet1[row[2]] += 1
            if row[-1] == 2:
                countries_tweet2[row[2]] += 1
            if row[-1] == 3:
                countries_tweet3[row[2]] += 1
            if row[-1] == 4:
                countries_tweet4[row[2]] += 1
            if row[-1] == 5:
                countries_tweet5[row[2]] += 1

    with open('WebContent/Web-INF/choromap.json', 'wb') as f:
        json.dump(
            [countries_tweet, countries_tweet1, countries_tweet2, countries_tweet3, countries_tweet4, countries_tweet5],
            f)


createData()

createChoroMapData()
