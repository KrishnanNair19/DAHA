# Expo

## MacOS Set Up

### Step 1: Install Homebrew:
Open your terminal, and paste the following line there 
`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`. If prompted, type in your password. Click enter and wait for it to finish the installation.
On some newer systems, you may see a message that says `Warning: /opt/homebrew/bin` is not in your PATH. If so, run the suggested commands under `Next Steps`.

### Step 2: Install node:
If you already have node installed, open your terminal, and type in `node -v`. If your version is at least 10.x, you can skip the “Install node” step. Note that for Apple Silicon Macs, the recommended node version is 15.6.0 or later.
If you have a different version, you will need to uninstall node before moving on to the next step. To remove node:
go to `/usr/local/lib` and delete any node and `node_modules` (ex. `rm -f node_modules`)
go to `/usr/local/include` and delete any node and `node_modules` directory
if you installed with `brew install node`, then run `brew uninstall node` in your terminal
check your Home directory for any local or lib or include folders, and delete any node or `node_modules` from there
go to `/usr/local/bin` and delete any node executable
If you do not already have node, or just deleted your existing version, open your terminal, and execute the following commands 
`brew update`
`brew install node`
`brew link node --force`
`npm install -g npm`
Run the following line in your command prompt `npm install -g expo-cli`. Wait for the command to finish running, and make sure you don’t get any errors. You might see warnings/vulnerabilities, this is perfectly fine as long as it finishes downloading without errors. 

### Step 3: Download a word editor
You will need some sort of code editor to make changes to the app. We recommend [Visual Studio Code](https://code.visualstudio.com/). 



### Step 4: Testing Environment

*Setting up an iPhone simulator on your computer
Install [Xcode through the Apple App Store](https://itunes.apple.com/app/xcode/id497799835). It’ll take a while. Next, open up Xcode. In the top bar, go to `XCode > preferences` and click the Components tab. Install iOS 14.x or iOS 15 (as long as you don’t hate the UI updates) simulator from the list.
Once this is done, you should be able to open “simulator” as a separate app on your macOS without needing XCode to be running.

*Using your phone as an iPhone simulator. 
Install the [Expo Go app](https://apps.apple.com/app/apple-store/id982107779). Follow the instructions to create an account. 

### Step 5: Cloning the Environment
* Navigate to your desired directory in terminal. 
* Run the following command to clone the repository `gh repo clone StanfordCS194/Team5-Spring22` or `https://github.com/StanfordCS194/Team5-Spring22.git`
* Enter the Team5 directory (`cd Team5-Spring22`) and run `npm install`. There will be a warning for 14 severe vulnerabilities due to external npm packages. These warnings can be ignored. 
* Enter the DAHA app directory (`cd DAHA`) and run `expo start`. A QR code will be generated. 
* If you would like to run the app on your own iPhone using the Expo Go, scan the QR code using your camera or via the Expo Go app. The app will then proceed to download and run through Expo Go. If you experience issues with a long delay, check your wifi connection (preferably your phone and computer should be on the same wifi network). 
* If you would like to run the app on an iPhone simulator on your computer, simply press `i`. You can use XCode to modify your iPhone and iOS preferences. For the purposes of this app, we tested on an iPhone XS. 


### Step 6: Editing the app
Use your preferred text editor to make changes to the app! When changes are saved, they should be auto-rendered on the Expo Client. If you would like to see yellow-box warning durings development, comment out the following line in the `App.js` file: 
`console.disableYellowBox = true;`

## Windows Set Up 

### Step 1: Install node:
Install node:
If you already have node, open your command prompt, and type in `node -v`. If your version is at least 10.x, you can skip the “Install node” step. If your version is outside of these bounds. You will need to uninstall node before moving on to the next step. To remove node:
Uninstall from Programs & Features with the uninstaller.
Reboot your machine.
Look for these folders and remove them (and their contents) if any still exist.
Make sure that you have hidden files showing.

`C:\Program Files (x86)\Nodejs`
`C:\Program Files\Nodejs`
`C:\Users\{User}\AppData\Roaming\npm (or %appdata%\npm)`
`C:\Users\{User}\AppData\Roaming\npm-cache (or %appdata%\npm-cache)`
`C:\Users\{User}\.npmrc`
`C:\Users\{User}\npmrc`
`C:\Users\{User}\AppData\Local\Temp\npm-*`
In the command prompt, type “where node”. You should get a message saying `INFO: Could not find files for the given pattern(s).`
If you do not already have node, or just deleted your existing version, click [here ](https://nodejs.org/en/download/)to download node installer. Follow the steps in the installer; it should be straightforward.
Reboot your device.
Run the following line in your command prompt “npm install -g expo-cli”. Wait for the command to finish running, and make sure you don’t get any errors. You might see warnings/vulnerabilities, this is perfectly fine as long as it finishes downloading without errors. 

### Step 2: Download a word editor
You will need some sort of code editor to make changes to the app. We recommend [Visual Studio Code](https://code.visualstudio.com/). 

### Step 3: Testing Environment

*Using your phone as an iPhone simulator. 
Install the [Expo Go app](https://apps.apple.com/app/apple-store/id982107779). Follow the instructions to create an account. 
* Note: On Windows, you will not be able to run an iPhone simulator, so you will need to use your iPhone as a proper client. 

### Step 4: Cloning the Environment
* Run the following command to clone the repository `gh repo clone StanfordCS194/Team5-Spring22` or `https://github.com/StanfordCS194/Team5-Spring22.git`. This folder can be cloned in any desired directory. 
* Enter the Team5 directory and run `npm install`. There will be a warning for 14 severe vulnerabilities due to external npm packages. These warnings can be ignored. 
* Enter the DAHA app directory and run `expo start`. A QR code will be generated. 
* Scan the QR code using your iPhone camera or via the Expo Go app. The app will then proceed to download and run through Expo Go. If you experience issues with a long delay, check your wifi connection (preferably your phone and computer should be on the same wifi network). 

### Step 5: Editing the app
Use your preferred text editor to make changes to the app! When changes are saved, they should be auto-rendered on the Expo Client. If you would like to see yellow-box warning durings development, comment out the following line in the `App.js` file: 
`LogBox.ignoreAllLogs();`

# Firebase
### Step 1: Create an account
Go to [firebase.google.com](firebase.google.com) to create your account.

### Step 2: Access the Firebase project
Follow the instructions [here](https://github.com/StanfordCS194/Team5-Spring22/wiki/Database-Architecture-and-Development) to access DAHA?'s Firebase project and use the Firebase Console.

### Step 3: Read up on Firebase Documentation
Here are some useful resources for first-time Cloud Firestore users!
* [Reading data from a Cloud Firestore database](https://firebase.google.com/docs/firestore/query-data/get-data)
* [Performing queries](https://firebase.google.com/docs/firestore/query-data/queries)
* [Ordering and limiting data](https://firebase.google.com/docs/firestore/query-data/order-limit-data)
* [Adding data to a Cloud Firestore database](https://firebase.google.com/docs/firestore/manage-data/add-data)
* [Video on Firestore collections and documents](https://www.youtube.com/watch?v=2Vf1D-rUMwE)
