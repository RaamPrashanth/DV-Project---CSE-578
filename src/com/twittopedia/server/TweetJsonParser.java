package com.twittopedia.server;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.opencsv.CSVWriter;
import com.twittopedia.model.*;

public class TweetJsonParser {
	public static void main(String[] args) {
		
		 HashMap<Integer, HashMap<String, Integer>> hashTagMap = new HashMap<Integer, HashMap<String, Integer>>();
		 JSONParser parser = new JSONParser();
		 List<Tweet> list = new ArrayList<Tweet>();
		 try {
			 //JSONArray jsonFile = (JSONArray) parser.parse(new FileReader(""));
			 System.out.println(System.getProperty("user.dir"));
	         String textFile = new String(Files.readAllBytes(Paths.get("TweetsChampions.json")), StandardCharsets.UTF_8);

			 String[] textObj = textFile.split("\\r?\\n");
			 System.out.println("textObj" + textObj);
			 for (String obj : textObj) {
				 if (obj.trim().isEmpty()) {
					 continue;
				 }
				 JSONObject unparsedObject = (JSONObject) parser.parse(obj);
						 //(JSONObject) obj;
				 JSONObject userObject = (JSONObject) unparsedObject.get("user");
				 
				 JSONArray hashTagArray = new JSONArray();
				 if (unparsedObject.get("entities") != null)
				 hashTagArray = (JSONArray) ((JSONObject) unparsedObject.get("entities")).get("hashtags");
				 String id = (String) unparsedObject.get("id_str");
				 String text = (String) unparsedObject.get("text");
				 if (userObject == null || userObject.get("location") == null) 
					 continue;
				 String location = (String) userObject.get("location");
				 int sentiment = 0;
				 String userName = (String) userObject.get("screen_name");
				 String profilePicURL = (String) userObject.get("profile_image_url");
				 
				 List<String> hashTagsList = new ArrayList<String>();
				 for (Object hashObject : hashTagArray) {
					 JSONObject hashTagObject = (JSONObject) hashObject;
					 hashTagsList.add((String)hashTagObject.get("text"));
				 }
				 
				 String[] hashTags = new String[hashTagsList.size()];
				 hashTags = hashTagsList.toArray(hashTags);
	                
				 SimpleDateFormat sf = new SimpleDateFormat("EEE MMM dd HH:mm:ss ZZZZZ yyyy");
				 sf.setLenient(true);
				  
				 Date createdTime = null;
				try {
					createdTime = sf.parse((String) userObject.get("created_at"));
				} catch (java.text.ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				 long timeInMilis = Long.parseLong((String) unparsedObject.get("timestamp_ms"));
				 double latitude = 0.0;
				 double longitude = 0.0;
				 System.out.println(id + "," + text.trim() + "," + location + ","  + sentiment + "," + userName + "," + profilePicURL + "," + hashTags + ","  + createdTime + "," + latitude + ","  + longitude);
				 list.add(new Tweet(id, text, location, sentiment, userName, profilePicURL, hashTags, createdTime, latitude, longitude, timeInMilis));
			 }
			 
			 
		 }	catch (FileNotFoundException e) {
	         e.printStackTrace();
	     } catch (IOException e) {
	         e.printStackTrace();
	     } catch (ParseException e) {
	         e.printStackTrace();
	     }
		 
		 writeToCSV(list);
	}

	//TODO
	private static void writeToCSV(List<Tweet> list) {
        FileWriter outputfile = null;
		try {
			outputfile = new FileWriter("output.csv");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
        CSVWriter writer = new CSVWriter(outputfile);
        
        String[] header = { "id", "text", "location", "sentiment", "userName", "profilePicURL", "hashTags", "createdTime", "latitude", "longitude", "timeInMilis"}; 
        writer.writeNext(header);
        
        for (Tweet tweet : list) {
        	String hashtags = "";
        	for (String tags : tweet.getHashTags()) {
        		hashtags = hashtags + "#" + tags;
        	}
        	
        	writer.writeNext(new String[] {tweet.getId(), tweet.getText(), tweet.getLocation(), tweet.getSentiment()+"", tweet.getUserName(), tweet.getProfilePicURL(), hashtags, tweet.getCreatedTime().toGMTString(), tweet.getLatitude()+"", tweet.getLongitude()+"", tweet.getTimeInMilis()+""});
	
        }
        try {
			writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
