# Handling Private Information

One of our primary concerns with our app was maintaining user privacy and security of sensitive information. Because we are using Firebase to demo our app (which has numerous security issues with Test Mode security rules when it comes to user authentication), we decided to minimize the amount of private information we collected from users. As of now, we only ask for users to include their name, email, password, and optionally a profile photo. We originally planned to also include another form of communication that users would like to provide as a point of contact, including phone number or social media accounts. However, we decided that the lack of security made this a threat to our user's privacy, as this information could easily be retrieved by malevolent adversaries. As a result, we decided to use email and comments as the main forms of communication between users. This is because the majority of Stanford students will use their Stanford email to create accounts, and these emails are already public. Because of potential security issues with passwords, we also used Firebase Authentication services for user sign-up and login, which encrypts passwords (see more details [here](https://firebaseopensource.com/projects/firebase/scrypt/)). Passwords also are not stored in our Firestore database. If we were to continue this project, we would likely create stronger security rules (changing the default Test Mode security rules) for our Firestore database. 

# Reviews

In many shopping/selling apps, it is common to have reviews and ratings associated with a user or product. We decided to exclude this feature in our app because Stanford is a very close community (in terms of social life and proximity). We believe that these ratings could be perceived as a reflection of one's character rather than the product itself, creating hostilities and tensions between users outside of the app. Because the stakes of these transactions are relatively low, and because users will be able to see the product before paying for it, the use of ratings and reviews becomes unnecessary. 





