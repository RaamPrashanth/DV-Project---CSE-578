package com.twittopedia.server;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import com.opencsv.CSVReader;
import com.twittopedia.model.Tweet;

public class JSONInputConstructor {
	private static int events = 4;
	
	public static void main(String[] args) {
		constructInputForMaps(readDataLineByLine("output.csv"));		
	}
	

	@SuppressWarnings("unchecked")
	private static void constructInputForMaps(List<Tweet> list) {
		JSONArray hashArray = new JSONArray();
		JSONArray newHash = new JSONArray();
		JSONArray linksArray = new JSONArray();
		JSONArray tweetsArray = new JSONArray();
		JSONArray lineArray = new JSONArray();
		JSONArray newLine = new JSONArray();
		lineArray.add(new JSONObject());
		JSONArray donut = new JSONArray();
		
		//newLine.add(new JSONArray());
		
		int i = 0;
		while (i <= events+1) {
			hashArray.add(new JSONObject());
			linksArray.add(new JSONObject());
			tweetsArray.add(new JSONArray());
			newHash.add(new JSONArray());
			donut.add(new JSONObject());
			i++;
		}

		System.out.println("total" + list.size());
		int k=0;
		int[] countArr = new int[6];
		for (Tweet tweet : list) {
			//hash gen
			int eventId = ThreadLocalRandom.current().nextInt(1, 4 + 1); 
			countArr[eventId]++;
			
					//ThreadLocalRandom.current().nextInt(1, 4 + 1);
					//tweet.getEventID();
			String[] tags = tweet.getHashTags(); 
			for (String tag : tags) {
				int count = 1;
				if (((JSONObject) hashArray.get(0)).containsKey(tag)) {
					count = (int) ((JSONObject) hashArray.get(0)).get(tag)+1;
				}
				((JSONObject) hashArray.get(0)).put(tag, count);
				
				if (((JSONObject) hashArray.get(eventId)).containsKey(tag)) {
					count = (int) ((JSONObject) hashArray.get(eventId)).get(tag)+1;
				}
				((JSONObject) hashArray.get(eventId)).put(tag, count);
			}
			
			//tweet gen
			int sentiment = tweet.getSentiment();
					//ThreadLocalRandom.current().nextInt(0, 6 + 1);
					//
			JSONObject obj = new JSONObject();
			obj.put("text", tweet.getText());
			obj.put("userName", tweet.getUserName());
			obj.put("sentiment", sentiment);
			obj.put("profilePicURL", tweet.getProfilePicURL());
			obj.put("createdTime", tweet.getCreatedTime().toGMTString().substring(0, tweet.getCreatedTime().toGMTString().length()-3));
			if (((JSONArray)tweetsArray.get(eventId)).size() <= 100) {
			((JSONArray)tweetsArray.get(0)).add(obj);
			((JSONArray)tweetsArray.get(eventId)).add(obj);
			}
			
			//line gen
			String date = tweet.getCreatedTime().toGMTString().substring(0, tweet.getCreatedTime().toGMTString().length()-3);
			if (date.contains("2018")) {
				int count = 1;
				if (((JSONObject) lineArray.get(0)).containsKey(date.substring(2,6).trim())) {
					count = (int) ((JSONObject) lineArray.get(0)).get(date.substring(2,6).trim())+1;
				}
				((JSONObject) lineArray.get(0)).put(date.substring(2,6).trim(), count);
			}
			
			//donut gen
			int count = 1;
			if (((JSONObject) donut.get(0)).containsKey(sentiment)) {
				count = (int) ((JSONObject) donut.get(0)).get(sentiment)+1;
			}
			((JSONObject) donut.get(0)).put(sentiment, count);
			count = 1;
			if (((JSONObject) donut.get(eventId)).containsKey(sentiment)) {
				count = (int) ((JSONObject) donut.get(eventId)).get(sentiment)+1;
			}
			((JSONObject) donut.get(eventId)).put(sentiment, count);
			
		}
		
		for (i = 0; i <= events+1; i++) {
			Iterator<String> keys = ((JSONObject)hashArray.get(i)).keySet().iterator();

			while(keys.hasNext()) {
			    String key = keys.next();
			    JSONObject obj = new JSONObject();
			    obj.put("tag", key);
			    obj.put("count", ((JSONObject)hashArray.get(i)).get(key));
			    ((JSONArray)newHash.get(i)).add(obj);
			}
		}
		
		Iterator<String> keys = ((JSONObject)lineArray.get(0)).keySet().iterator();

		while(keys.hasNext()) {
		    String key = keys.next();
		    JSONObject obj = new JSONObject();
		    obj.put("date", key);
		    obj.put("count", ((JSONObject)lineArray.get(0)).get(key));
		    obj.put("peak", "");
		    newLine.add(obj);
		}
		
		try (FileWriter file = new FileWriter("hashTag.json")) {
			file.write(newHash.toJSONString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try (FileWriter file = new FileWriter("tweets.json")) {
			file.write(tweetsArray.toJSONString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try (FileWriter file = new FileWriter("donut.json")) {
			file.write(donut.toJSONString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		try (FileWriter file = new FileWriter("cloud.json")) {
			file.write(hashArray.toJSONString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		try (FileWriter file = new FileWriter("line.json")) {
			file.write(newLine.toJSONString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		for (int j : countArr) {
			System.out.println(j);
		}
	}


	public static List<Tweet> readDataLineByLine(String file) 
	{ 
        List<Tweet> list = new ArrayList<Tweet>();
	    try { 
	   
	        FileReader filereader = new FileReader(file); 
	  
	        CSVReader csvReader = new CSVReader(filereader); 
	        String[] nextRecord; 
	        csvReader.readNext();
	        
	        int i = 0;
	        int j = 0;
	        while ((nextRecord = csvReader.readNext()) != null) { 
	        	try {
	        		if(nextRecord.length < 12) {
	        			System.out.println("unprocessed" + i + " " + nextRecord[0]);
	        			i++;
	        			continue;
	        		} else {
	        			System.out.println("processed" + j+ " " + nextRecord[0] + " unprocessed " + i);
	        		}
	            	Tweet tweet = new Tweet();
	            	tweet.setId(nextRecord[0]);
	            	tweet.setText(nextRecord[1]);
	            	tweet.setLocation(nextRecord[2]);
	            	tweet.setSentiment(Integer.parseInt(nextRecord[3]));
	            	tweet.setUserName(nextRecord[4]);
	            	tweet.setProfilePicURL(nextRecord[5]);
	            	if (!nextRecord[6].isEmpty()) {
	            		String[] tags = nextRecord[6].substring(1, nextRecord[6].length()).split("#");
	            		tweet.setHashTags(tags);
	            	} else {
	            		tweet.setHashTags(new String[] {});
	            	}
	            	//21 Nov 2012 18:09:54 GMT
	            	String date = nextRecord[7].substring(0, nextRecord[7].length()-4);
					 SimpleDateFormat sf = new SimpleDateFormat("dd MMM yyyy HH:mm:ss");
					 sf.setLenient(true);
					  
					 Date createdTime = null;
					try {
						createdTime = sf.parse(date);
					} catch (java.text.ParseException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
	            	tweet.setCreatedTime(createdTime);
	            	tweet.setLatitude(Double.parseDouble(nextRecord[8]));
	            	tweet.setLongitude(Double.parseDouble(nextRecord[9]));
	            	tweet.setTimeInMilis(Long.parseLong(nextRecord[10]));
	            	tweet.setEventID(Integer.parseInt(nextRecord[11]));
	            	list.add(tweet);
	            	j++;
	        } catch (Exception e) { 
		        e.printStackTrace(); 
		        System.out.println("exception unprocessed" + i + " " + nextRecord[0]);
    			i++;
		    }
	        	
	    }
	    }
	    catch (Exception e) { 
	        e.printStackTrace(); 
	    }
	    return list;
	} 
}
