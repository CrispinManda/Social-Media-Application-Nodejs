-- Create the database
CREATE DATABASE IF NOT EXISTS ReactSocialPlatform;

-- Switch to the newly created database
USE SocialMediaPlatform;

-- Create the tbl_user table
CREATE TABLE IF NOT EXISTS tbl_user (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    isWelcomed BIT DEFAULT 0, -- Added field: indicates whether the user has been welcomed or not
    join_date DATE NOT NULL
);

-- Create the Groups table
CREATE TABLE IF NOT EXISTS Groups (
    group_id INT IDENTITY(1,1) PRIMARY KEY,
    group_name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    created_by INT NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (created_by) REFERENCES tbl_user(user_id)
);

-- Create the Friendship table
CREATE TABLE IF NOT EXISTS Friendship (
    friendship_id INT IDENTITY(1,1) PRIMARY KEY,
    user1_id INT NOT NULL,
    user2_id INT NOT NULL,
    status BIT NOT NULL, -- BIT datatype for status: 1 for accepted, 0 for pending
    action_user_id INT, -- user who initiated the action
    action_date DATETIME,
    FOREIGN KEY (user1_id) REFERENCES tbl_user(user_id),
    FOREIGN KEY (user2_id) REFERENCES tbl_user(user_id),
    FOREIGN KEY (action_user_id) REFERENCES tbl_user(user_id)
);

-- Create the Photos table
CREATE TABLE IF NOT EXISTS Photos (
    photo_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    photo_url VARCHAR(255) NOT NULL,
    upload_date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES tbl_user(user_id)
);

-- Create the Posts table
CREATE TABLE IF NOT EXISTS Posts (
    post_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    post_date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES tbl_user(user_id)
);

-- Create the Comments table
CREATE TABLE IF NOT EXISTS Comments (
    comment_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    comment TEXT NOT NULL,
    comment_date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES tbl_user(user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);

-- Create the Events table
CREATE TABLE IF NOT EXISTS Events (
    event_id INT IDENTITY(1,1) PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    created_by INT NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (created_by) REFERENCES tbl_user(user_id)
);

-- Create the Group_members table
CREATE TABLE IF NOT EXISTS Group_members (
    group_member_id INT IDENTITY(1,1) PRIMARY KEY,
    group_id INT NOT NULL,
    user_id INT NOT NULL,
    is_admin BIT NOT NULL DEFAULT 0, -- BIT datatype for admin status: 1 for admin, 0 for non-admin
    FOREIGN KEY (group_id) REFERENCES Groups(group_id),
    FOREIGN KEY (user_id) REFERENCES tbl_user(user_id)
);

-- Create the Event_attendees table
CREATE TABLE IF NOT EXISTS Event_attendees (
    event_attendee_id INT IDENTITY(1,1) PRIMARY KEY,
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    is_organizer BIT NOT NULL DEFAULT 0, -- BIT datatype for organizer status: 1 for organizer, 0 for non-organizer
    FOREIGN KEY (event_id) REFERENCES Events(event_id),
    FOREIGN KEY (user_id) REFERENCES tbl_user(user_id)
);

-- Create the Messages table
CREATE TABLE IF NOT EXISTS Messages (
    message_id INT IDENTITY(1,1) PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message_text TEXT NOT NULL,
    sent_at DATETIME NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES tbl_user(user_id),
    FOREIGN KEY (receiver_id) REFERENCES tbl_user(user_id)
);
