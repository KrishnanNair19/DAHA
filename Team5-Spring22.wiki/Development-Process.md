# Brainstorming

Coming into this project, many of our members were meeting for the first time. We didn't have much of a conception of what kind of a project we wanted to make, so we each individually brainstormed ideas, grouping our thoughts into buckets. To brainstorm we used both Google Docs and Mural. The sticky note feature made it easy to perform affinity grouping and find trends and particular areas of interest among our group members. Below is an image of our brainstorming ideas which can also be found on this [Mural](https://app.mural.co/t/cs194seniorproject1728/m/cs194seniorproject1728/1649376115342/e3e77c60a9b836ac8981c40f8706417eb1fe8f3e?sender=ucae3abaa6ee0f822554b3440). Here is a google doc [link](https://docs.google.com/document/d/1A_M4eHQv-i2joInp9SoVWOWVARCuXgYFHQOhQNOkhHk/edit?usp=sharing) with our brainstormed ideas and individual favorites for easier viewing. 
[[https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/Brainstorm%20Mural.png]]

We eventually came to the consensus that the one thing unifying all of us was the fact that we were all graduating seniors. Over the past four years, we have accumulated a bunch of decorations, clothes, and appliances that we no longer needed. As a result, we wanted to get rid of them quickly. Disappointed by our experiences on Facebook Marketplace and unsure of what we could feasibly sell quickly, we decided to create a platform where the supply and demand of goods within the community could be more appropriately balanced. 

# Measuring Success
We initially defined our measures of success via OKRs and KPIs which can be found on [here](https://docs.google.com/document/d/1rQfA9gZizIOvKFoGaDZQEfXTm13bZOT1NFT3zTw1ziU/edit?usp=sharing). These goals primarily represented our desires for development if this were a long term project. However, they provided a good basis of where we wanted our progress to head over the course of the quarter, even if we were not able to gather metric data of success such as the number of users and posts. 
 
We measured our progress and assigned tasks to work on via this [document](https://docs.google.com/document/d/18LsLj73BVqVPnIfx6cAQlgRNCBfPW03iFjejUT19XtU/edit?usp=sharing), but then we switched to Github issues. 

# Original Design

## The MoodBoard, Color Pallete, and Style Tile

To come up with the design for our app, we started with a moodboard. We originally conjured images of garage sales, moving into a new home, and starting a new beginning. After all, these items were starting the next chapter of their life and so were some of the people selling them as they graduated from Stanford. 

[[https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/Original%20Mood%20Board.png]]

Our color scheme as a result relied heavily on earth tones. To minimize that overwhelming feeling that users sometimes receive when logging onto Facebook Marketplace, we used our color scheme to create a calming and relaxing experience. The green and blue shades provide a sense of sustainability, as these belongings find new homes instead of ending up in the trash. 

[[https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/Original%20Color%20Palette.png]]

## The Original Prototype

After sketching screens, we decided to prototype our app on Figma. The prototype can be explored at this [link](https://www.figma.com/proto/5iqFcefv6XsGIcdrvZhkxT/CS194---Senior-Project-team-library?node-id=511%3A6302&starting-point-node-id=511%3A6302). Note that this prototype does not have the original color palette as we experimented with various color schemes.  For simplicity, we have included a [video walkthrough](https://drive.google.com/file/d/155tZjHu2GB8gCr4GDy80joHgdcAx-8Wy/view?usp=sharing) of the prototype as well.


# Prototyping Interviews and Main Takeaways

Once we completed our prototype and simulated a walkthrough of it on Figma, we began running interviews with people to gather feedback on the state of our design. To do this, we put together an [Interview Protocol](https://docs.google.com/document/d/1QV2abBp-KwDVZqQMIGmKWCf16PuDy_7ibq4hyDymEVc/edit?usp=sharing) which let the user know what kind of feedback we were looking for, walked them through the simulated tasks that we wanted them to complete, and concluded with a set of targeted questions that we wanted feedback on concerning specific aspects of the process and design. The complete user feedback can be viewed in [this document](https://docs.google.com/document/d/1EvjBcEqvhM0lxtcs1gLPmVNL9oZ4tp8LqWtsqkWTTpo/edit?usp=sharing) which includes the answers to our questions as well as general thoughts the users had while going through the prototype. In this document, we organized the most common suggestions into four categories which are also shown below:
| **Layout**  |  **Wording** | **Style**  | **General**  |
|---|---|---|---|
| Combine New Request/Post into the same button, not on the same page  | In the New Request form, change “Buying Options” to “I’m looking to…”  | Colors are too muted, more vibrancy would increase the appeal of the app  | Users had difficulty marking requests as complete  |
| Shop icon should be next to the Requests icon on the bottom bar  | General confusion about the difference between “Requests” and “Shop”  | Use the main color and shades of it more frequently  | Completed requests should not appear on the Request page  |
| Profile page should instead be a Settings page with a Profile tab  | In the New Post form, replace all instances of “buy” with “sell”  | Buy/Rent Tags on requests are hard to read and look like buttons  | Add capability for a description for each request  |
| Sign Out button should be deeper in the profile  | Shorten “Does anyone have a…” to “DAHA…”  | Orange clashes with blue and green  | Add tags to sort by item type  |  

These suggestions were very impactful on our subsequent design choices however, we weren't able to address them all due to the time constraints of the project. What we focused on were the following:
1. Changes to the color palette: many of the users noted that our colors were more muted than they expected of a mobile app and pointed us to examples such as Facebook and Yelp whose signature colors are very vibrant. Additionally, we had included two other muted colors which users thought clashed with our signature orange color. As will be discussed in detail in the subsequent section, we decided to incorporate more of our signature color and less of the others, sticking to only three colors total so as to be less distracting and more cohesive.
2. Filtering: when observing our DAWA and DAHA screens, several users said that they would want to see the ability to filter by item type. As such we decided to try and implement this however, due to time constraints we were only able to add filters to the DAHA screen which were not by item type, since we assumed that would make our database structure more difficult to implement, but by time posted and completion status.
3. Wording Changes: while going through the prototype, some users were confused about how to indicate in a new DAWA post that they wanted to sell their item because of the wording of the New Request screen. As a result, we changed how we worded our new request and new post form so that it seemed more intuitive walking through it. We also changed the names of the tabs displayed at the bottom of the app so that there was not any confusion over what the difference between a "request" and a "shop" was.
4. Profile Changes: Many users indicated that they thought the profile page should instead reflect account settings and be named as such. We considered doing this however, we determined that our app would not be advanced enough by the end of the quarter to need a settings page and so we kept the Profile screen simple, allowing the users to change their profile picture, view their information, see their requests and offers, and sign out, but nothing more.

# Revised Aesthetic Design

We found that our core users thought that the original color palette, although calming, felt dreary. Furthermore, they found the lack of cohesiveness between the warm and cool colors to be confusing. As a result, we wanted to go back to our moodboard and rethink how we wanted our users to feel. Considering that the greatest influx of buying/selling goods happens right before summer, we were inspired to use bright oranges and yellows to emphasize the excitement of starting the next chapter of one's life. We wanted to show that this app is where people can be excited and let go to grow. For our fonts, we decided to use Montserrat and Lato (which comes from the Polish word Summer). 

We also wanted to create an experience of being more playful and soft. In order to do this, we changed the sharp edges on our input boxes and command buttons to be rounded. 

Finally our original design used IconPark, which tended to be simplistic line art. However, we learned through our user interviews that these icons were too minimal and didn't pop out or draw the attention of users. As a result, we opted to use MaterialCommunity Icons for an added boldness that would draw the users' eyes to important buttons and information. 


[[https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/Revised%20Mood%20Board.png]]

[[https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/Revised%20Style%20Tile.png]]