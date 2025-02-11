# IgniteCove App

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

First things first, checkout from the main Development branch, create your dev branch.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```
2. Install an Emulator: Specifically Android. Set up instructions: [Link to installation](https://developer.android.com/studio/install)

3. Set up Android Studio. Please don't use Expo Go. Ensure adb is reachable. [Comprehensive setup instructions](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&platform=android&device=simulated)

4. Create a Development Build either locally or ,preferably, use EAS. [Comprehensive setup instructions](https://docs.expo.dev/develop/development-builds/create-a-build/). Automatically installs the APK to the emulator.

5. Run ``` npm expo start ``` and eventually type "a" to run the Android-build.

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

------------------------------------------------------------------------------------------------------------
## Tools & Guidelines

1. To convert normal SVG to expo-friendly React components. Visit: [react-svgr](https://react-svgr.com/playground/?native=true&typescript=true)
2. Try to have all the component files within the same feature be as close as they possibly can. Adopt a feature-based folder structure where shared features have their own dedicated place, same applies to unique ones.
3. On Android, when adding new libraries, strictly use Expo guidelines to avoid manual linking. You might notice that new libraries are not immediately reflecting. You have to create a new development build each time. 
4. Use Prettier for linting.

## API:
[Swagger](https://sandbox.ignitecove.com/swagger-ui/index.html#/account-resource/createAccount)


## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
