# Firebase
## Cloud Firestore Database Architecture
Our database architecture went through several iterations before we settled on our final structure. Our initial notes on our Firebase database can be found [here](https://docs.google.com/document/d/1TSux8icqV9P10c_XI-csU7A_bzCPnDG0sH1voB7Ct-Y/edit?usp=sharing). 

The finalized Firestore database has the following overarching structure:

* offers (root collection)
> * offer UID (document)
> > * comments (collection)
> > > * comment UID (document)
> > > > * text (string) - the text content of the comment
> > > > * timestamp (timestamp) - the time the user posted the comment
> > > > * user (reference) - a reference to the commenter
> > > * comment UID (document)
> > > > * ...
> > * completed (boolean) - represents whether the DAWA post is marked as sold
> > * description (string) - a description of the product for sale
> > * endDate (timestamp) - the last preferred sell date provided by the seller (used with renting)
> > * photos (array) - photos of the product
> > > * \[0\] link to photo (string)
> > > * \[1\] link to photo (string)
> > * price (string) - represents the price of the product for sale
> > * priceTimeFrame (string) - applies to rented products, and can be "per day", "per week", "per month", "per year", or "per specified date range"
> > * purchaseOptions (string) - can be "Buy" or "Rent"
> > * specifyDates (boolean) - a true value means that the user has chosen preferred sell/rent date(s), and false means that there is no preferred date
> > * startDate (timestamp) - the first or only available preferred sell date provided by the seller (used with both selling and renting)
> > * timestamp (timestamp) - the time the user created the DAWA post
> > * title (string) - the name of the product
> > * user (reference) - a reference to the seller
> * offer UID (document)
> > * ...
* requests (root collection)
> * request UID (document)
> > * buy (boolean) - represents whether the requester wishes to buy the requested product
> > * completed (boolean) - represents whether the DAHA request is marked as fulfilled
> > * endDate (timestamp) - the last preferred buy date provided by the requester (used with renting)
> > * rent (boolean) - represents whether the requester wishes to rent the requested product
> > * startDate (timestamp) - the first or only available preferred buy date provided by the requester (used with both buying and renting)
> > * text (string) - the text content of the DAHA request
> > * timestamp (timestamp) - the time the user created the DAHA request
> > * user (reference) - a reference to the requester
> * request UID (document)
> > * ...
* users (root collection)
> * user UID (document)
> > * email (string) - user's email
> > * favorites (array) - list of DAWA posts that the user has favorited
> > > * [0] reference to offer (reference)
> > > * [1] reference to offer (reference)
> > * firstName (string) - user's first name
> > * lastName (string) - user's last name
> > * offers (array) - list of DAWA posts that the user has made
> > > * [0] reference to offer (reference)
> > * photoURL (string) - link to user profile photo
> > * requests (array) - list of DAHA requests that the user has made
> > > * [0] reference to request (reference)
> > > * [1] reference to request (reference)
> * user UID (document)
> > * ...

## Navigating the Firebase Console
To receive access to our Firebase project, contact one of the owners. After you have been approved, you can access the Firebase console [here](https://console.firebase.google.com/u/0/project/cs194-daha/overview). 

### Firestore Database

To access the project's database from the Firebase project overview page, click on the Firestore Database tab pictured below.

<img src="https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/Firestore-home.png"  width=100% height=100%>

#### Offers
To access an offer from the Firebase console, click on the "offers" root collection. You can then access an individual offer document by clicking on the desired offer UID.

<img src="https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/Firestore-offers.png"  width=100% height=100%>


Some offer documents may include a "comments" collection. This indicates that one or more comments have been made on the DAWA post.


<img src="https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/Firestore-offer-comments.png"  width=100% height=100%>


To access comments on an offer, click on the "comments" collection. To see an individual comment, click on the comment UID.


<img src="https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/Firestore-comments.png"  width=100% height=100%>

#### Requests
To access a request from the Firebase console, click on the "requests" root collection. You can then access an individual request document by clicking on the desired request UID.

<img src="https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/Firestore-requests.png"  width=100% height=100%>

#### Users
To access a user's data from the Firebase console, click on the "users" root collection. You can then access an individual user document by clicking on the desired user UID.

<img src="https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/Firestore-users.png"  width=100% height=100%>


#### Editing/Deleting a Field

To manually edit or delete a document field from the Firebase Console, hover over the field you wish to edit or delete and click on the appropriate icon. Edits can include changes to the field type (e.g. boolean, string) or value.

<img src="https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/Firestore-editing.png"  width=70% height=70%>

#### Deleting a Document
To delete a document (e.g. offer, request, user) from the Firebase Console, click on the three vertical dots on the upper right corner of the document box and then click "Delete document".

<img src="https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/Firestore-delete-document.png"  width=100% height=100%>

### Cloud Storage

For storing user-generated content for our app, we used Firebase Cloud Storage. Cloud Storage, like other aspects of Firebase, provides robust operations, strong security, and high scalability. The only types of files users upload to our app are photos. Photos are always found under the directory of the user who uploaded them. There are two possible file path schemes for locating a user's photos: (1) users/{userId}/profile.jpg, (2) users/{userId}/offers/{DAWAPostID}/photo-{i}.jpg, which respectively refer to a user's profile photo and the photos they upload for any DAWA post they create.

#### Navigation

To access Cloud Storage from the Firebase console, click the "Storage" tab under the "Build" menu on the left hand side of the screen.

<img src="https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/CloudStorage-navigation.png"  width=100% height=100%>

The root of our storage scheme is the directory root/users.

<img src="https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/CloudStorage-root.png"  width=100% height=100%>

To navigate to the files uploaded by a specific user, click the userID of the user whose photos you wish to view. Each user is assigned an ID generated at account creation via Firebase Authentication.

<img src="https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/CloudStorage-root-users.png"  width=100% height=100%>

To view the user's profile photo, click "profile.jpg." If the user has not uploaded a profile photo, there will be no such file.

<img src="https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/CloudStorage-root-users-userID.png"  width=100% height=100%>
<img src="https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/CloudStorage-root-users-userID-profile.png"  width=100% height=100%>

To view the photos associated with all the DAWA posts the user has made, click the "offers" directory. If the user has not made any DAWA posts, there will be no such directory.

<img src="https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/CloudStorage-root-users-userID-offers.png"  width=100% height=100%>

To view the photos associated with a specific DAWA post the user has made, click the postID of the DAWA post of interest. Each DAWA document in the Firestore Database is given an ID generated at the time the document is made. See Firestore Database section for more details.

<img src="https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/CloudStorage-root-users-userID-offers-postID.png"  width=100%
height=100%>
<img src="https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/CloudStorage-root-users-userID-offers-postID-photo.png"  width=100%
height=100%>

To delete a photo the user has uploaded, select the file with with the checkbox to the left of the file name and click "Delete" from the pop-up. Any directory and the files it contains can be deleted in the same manner.

<img src="https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/CloudStorage-root-users-userID-offers-postID-photo-delete.png"  width=100%
height=100%>

NOTE: Their is a documented [bug](https://github.com/firebase/firebase-js-sdk/issues/5848) with the `uploadBytes()` function provided by Firebase to upload files to Cloud Storage. Because of this bug Google has yet to fix, occasionally uploading photos to Cloud Storage will not succeed.

### Firebase Authentication

We use Firebase Authentication to manage users of our app. Firebase Authentication provides a secure way to create new users and to know the identity of any user logged into the app. To access Firebase Authentication from the Firebase console, click the "Authentication" tab under the "Build" menu on the left hand side of the screen. We create accounts with an email/password associated with each user. The email/password sign-in method is supported by Firebase as seen under the "Sign-in method" tab. One of many major benefits to using Firebase Authentication is that Firebase handles the secure one-way hashing of user passwords for us. A unique UID is also generated for each user at account creation. This UID is used in Firestore Database and Cloud Storage to refer to the content associated with a specific user.

<img src="https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/Firebase-Authentication-sign-in-method.PNG" width=100% height=100%>

Under the "Users" tab, we are able to view and manage all users of our app. We can see each identifier email associated with each user, the date their account was created, and their UID. We can reset passwords, and disable accounts, and delete accounts from this tab as well. Lastly, we have the option to set more granular details like password hashing parameters.

<img src="https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/Firebase-Authentication.PNG" width=100% height=100%>
<img src="https://github.com/KrishnanNair19/DAHA/blob/main/Wiki_Images/Firebase-Authentication-options.PNG" width=100% height=100%>
