# GearTrack
## Overview
A web-based software used to collect entries of MPS (Media Production Services) equipment via a QR code Scanner and organize these entries in a database by location and type of equipment. The website will require the student’s GFU login credentials for security and camera permissions to actually scan QR codes. The user will log in to the website, scan the QR Code on the equipment, input the location, and submit the entry. All submitted entries will be seen and managed by the MPS Direct Supervisor. 

## Goal 
The MPS workers are currently struggling with tracking down equipment because there isn’t a proper inventory system, which results in extra time and effort wasted looking for the equipment. Our goal with this project is to create a more efficient and easier way to track MPS equipment to have more time for setup and troubleshooting. 

## Details
A web-based software used to collect entries of MPS (Media Production Services) equipment via a QR code Scanner and organize these entries in a database by location and type of equipment. The website will require the student’s GFU login credentials for security and camera permissions to actually scan QR codes. The user will log in to the website, scan the QR Code on the equipment, input the location, and submit the entry. All submitted entries will be seen and managed by the MPS Direct Supervisor, who will review the information and plan out events and shifts more efficiently. 

The goal of this project is to create a more efficient, easier way to track MPS equipment, freeing up time for setup and troubleshooting. MPS currently relies on memory or written notes to track equipment. This is very inefficient, and most of the time, MPS workers run across campus searching for specific equipment. This removes setup time and adds more stress to MPS workers, as they need to be set up by the time the event starts. This software will save a lot of time because the software will automatically organize the equipment by categories. This is better than manually inputting entries in a spreadsheet. This will also be more efficient because the user will be at the location where the equipment was stored, lowering the chances of making a mistake. 
GearTrack will improve the quality and efficiency of the MPS setup and troubleshooting process for events. We’re in charge of setting up sound, visual, and lighting equipment for GFU’s student activities events (Welcome Weekend, Fox Got Talent, Dating Game, etc.), Chapel events, and sports events (Livestreams for Football, Basketball, Volleyball, etc.), as well as lectures and other events. This project will give us more time for setup and troubleshooting to prevent event delays, cancellations, or possibly lower quality due to improvisation. 

This software will be a website, so it will include HTML, CSS, JavaScript, and React. The software will also need a manageable inventory system, so we will need Supabase and SQL. Because the software needs to be protected, we will need security skills/knowledge. This is a big project, especially when it comes to developing a protected website that uses cameras that scan QR codes and transfers the data to an organized inventory system. So the biggest challenge here would be time management, as we will need to learn some of the mentioned skills and apply them to the project, which will take a lot of time. 

## Repository Organization
The repository will be organized in three folders:

### docs/
A folder with .txt files that will explain what each programming file does, how they communicate with each other, and their purpose.

### src/
A folder with the actual programming files.

### test/ 
A folder with testing builds.

## Functionality
### Major Features
   *Manageable inventory system to hold the equipment inventory
   QR code library + scanner for each piece of equipment
   Simple and easy-to-navigate UI for MPS workers to submit/look for certain items
   George Fox credentials + authentication*

### Non-functional requirements
   *Varying levels of access: some people are granted more or less access than others as their job demands it. 
   Polymorphism to allow future additions and uses to integrate fully with existing systems. 
   Flexibility of inventory types and allowances to allow for good handling of unexpected scenarios and inputs while maintaining functionality.*

   

