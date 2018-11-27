package com.twittopedia.model;

import java.util.Date;

public class Tweet {

	String id;
	String text;
	String location;
	int sentiment;
	String userName;
	String profilePicURL;
	String[] hashTags;
	Date createdTime;
	double latitude;
	double longitude;
	long timeInMilis;
	
	public Tweet() {
	}
	
	public Tweet(String id, String text, String location, int sentiment, String userName, String profilePicURL,
			String[] hashTags, Date createdTime, double latitude, double longitude, long timeInMilis) {
		super();
		this.id = id;
		this.text = text;
		this.location = location;
		this.sentiment = sentiment;
		this.userName = userName;
		this.profilePicURL = profilePicURL;
		this.hashTags = hashTags;
		this.createdTime = createdTime;
		this.latitude = latitude;
		this.longitude = longitude;
		this.timeInMilis = timeInMilis;
	}
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getText() {
		return text;
	}
	
	public void setText(String text) {
		this.text = text;
	}
	
	public String getLocation() {
		return location;
	}
	
	public void setLocation(String location) {
		this.location = location;
	}
	
	public int getSentiment() {
		return sentiment;
	}
	
	public void setSentiment(int sentiment) {
		this.sentiment = sentiment;
	}
	
	public String getUserName() {
		return userName;
	}
	
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public String getProfilePicURL() {
		return profilePicURL;
	}
	
	public void setProfilePicURL(String profilePicURL) {
		this.profilePicURL = profilePicURL;
	}
	public String[] getHashTags() {
		return hashTags;
	}
	
	public void setHashTags(String[] hashTags) {
		this.hashTags = hashTags;
	}
	
	public Date getCreatedTime() {
		return createdTime;
	}
	
	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}
	
	public double getLatitude() {
		return latitude;
	}
	
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	
	public double getLongitude() {
		return longitude;
	}
	
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public long getTimeInMilis() {
		return timeInMilis;
	}

	public void setTimeInMilis(long timeInMilis) {
		this.timeInMilis = timeInMilis;
	}
	
}