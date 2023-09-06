# Stacks 
Each tab in our app and the account sign in/creation flows are controlled via a React `StackNavigator` component. Thus, each tab functions independently of each other. Switching between tabs does not affect the position of another tab. 

`DahaStack.js` - Controls the navigation for the DAHA tab. This navigator allows users to go between the `DahaScreen` and the `NewRequestScreen`. 

`DawaStack.js` - Controls the navigation for the DAWA tab. This navigator allows users to go between the `ShopScreen`, `ItemScreen` and `CommentScreen`. 

`FavoritesStack.js` - Controls the navigation for the Favorites tab. This navigator allows users to go between the `FavoritesScreen` and `ItemScreen` when an item is selected. 

`ProfileStack.js` - Controls the navigation for Profile Tab. This navigator allows users to go between the `ProfileScreen`, `DahaScreen` and 

`SignInStack.js` - Controls the navigation for the login/sign in user flows. Allows the user to go between the `SignUpScreen` and `LogInScreen`. 

# Screens

`CommentsScreen.js`- This screen is responsible for displaying the comments associated with a particular item. It renders as a flat list of items that shows a profile picture (currently a dummy headshot), the poster, and the comment. 

`DahaScreen.js`= This screen renders all of the DAHA requests that have been made by community members. The DAHA requests can be sorted by date (increasing or decreasing) and can also be filtered by completion status. Because of the limited capabilities fo firebase to implement searching on a free-tier membership, we decided to go with basic filtering/sorting functionality for this demo. 

`FavoritesScreen.js` - This screen renders all of the users favorited DAWA posts (as indicated by the red heart icon on the product card). This screen is to help users keep track of items that they are interested in purchasing or learning more about. 

`ItemScreen.js` - This screen shows the information associated with a particular item shown in the shop. When clicked, it will render a carousel of images of the item along with the description, seller, and price. 

`LoginScreen.js` - This is the first screen that will appear when a new user opens the app. It will ask for a user's username/email and password. This screen also allows users to navigate to a separate screen that allows to them to create a new account. 

`MyRequestsScreen.js` - This screen is similar to the `DAHA` screen, but only contains the requests made by a specific user. On this screen, users can mark their DAHA requests as complete/incomplete by clicking on the orange/green circle on the left side of the card. 

`NewPostDAWA.js` - This screen is for adding an item to the marketplace, either for rent or sale. It asks the user to input the title, description, and price they are asking for. Additionally, the user has the option to select up to three photos of the item to accompany its description.

`NewRequestScreen.js`- This screen enables users to create a new DAHA request. The user will be asked to include the following information: 
* Title of the Product
* Images (at least one)
* Description of the product
* Whether they would like to buy or rent the product
* The desired date of purchase or renting

`ProfileScreen.js` - This screen provides users with access to their own DAWA and DAHA posts on the app. This screen provides navigation to the `MyOffers` and `MyRequests`. Via the profile, users can check off their DAHA requests as completed or their DAWA posts as sold. 

`ShopScreen.js` - This screen shows the list of items being offered in the market place. It is a two column grid, with pictures for each item. Clicking on any of these pictures navigates to the ItemScreen for that particular item. 

`SignUpScreen.js`- This screen allows users to create a new account. The screen will ask for basic information, including name, email and password. When signing up, the user will receive a verification link to their email that must be clicked before they can successfully log in. 


# Components

`CarouselCardItem.js`- This is a component that defines the way that one image will render within a carousel for an item. 

`CarouselCards.js`- This is an image carousel that renders atop the ItemScreen for an item. 

`CheckBoxHideable.js`- A component that doesn’t render when on the DAWA page. 

`CheckBoxLabeled.js` - This basic component creates a checkbox component with a desired label. 

`CommentCard.js`- This is a component that represents one comment in the CommentsScreen for an item. 

`CustButton.js` - This button is a custom component that is used throughout the app. This button signifies major actions that the user can take, including login/signup, creating new posts, or viewing comments of a post. 

`DahaCard.js` - This component represents a single DAHA request on the DAHA list. It will display information including the requester's name, requester's email, the item being requested, when the user would like to have the item, and whether they are looking to buy or rent. 

`Product.js` - This component represents a single product card that is rendered in the DAWA shop list. This card will display basic information about the item being sold, including the name of the product, the seller's name, and the price. Users can also favorite the product by clicking on the heart on this component. When the card itself is clicked, the user will be navigated to an `ItemScreen` that has more info on the product. 


# Themes

`colors.js` - This screen contains the hex-values of the colors that we used throughout the app. The choices in color are explored more thoroughly in the Development process page. The colors that we used were: 


