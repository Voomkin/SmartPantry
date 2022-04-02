
// Top Header
<Tab.Screen
           name="Home"
           component={HomeStackScreen}
           options={({ navigation }) => ({
             title: "Home",
             // Sets up header buttons for notifications and sign out
             headerRight: () => (
               <Button
                 icon={
                   <Icon name="circle-notifications" size={25} color="#000000" />
                 }
                 type="clear"
               ></Button>
             ),
             headerLeft: () => (
               <View>
                 <Button
                   icon={<Icon name="logout" size={25} color="#000000" />}
                   onPress={signOutAlert}
                   type="clear"
                 ></Button>
               </View>
             ),
             // sets the icon for the home bottom tab screen
             tabBarIcon: () => {
               return <Icon name="home" />;
             },
             headerShown: true,
           })}
         />


// Bottom Fotter
<Tab.Screen
           name="Shopping"
           component={ShoppingStackScreen}
           style={{backgroundColor:'black'}}
           options={{
             tabBarIcon: () => {
               return <Icon name="store" color="green" backgroundColor="black"/>;
             },
             tabBarInactiveBackgroundColor: "black",
             headerShown: true,
           }}
         />
         {/* <Tab.Screen
           name="Profile"
           component={ProfileScreen}
           options={{
             title: "Profile",
             tabBarIcon: () => {
               return <Icon name="account-box" />;
             },
             headerShown: true,
           }}
         /> */}
         {/* <Tab.Screen
           name="Pantry"
           component={PantryStackScreen}
           options={{
             tabBarIcon: () => {
               return <Icon name="store" />;
             },
             headerShown: true,
           }}
         /> */}
         <Tab.Screen
           name="Settings"
           component={SettingsStackScreen}
           options={{
             tabBarIcon: () => {
               return <Icon name="settings" color="green"/>;
             },
             headerShown: true,
           }}
         />

         <Tab.Navigator
         screenOptions={{
           headerStyle: {
             backgroundColor: "#769353",
           },
         }}
       >
         <Tab.Screen
           name="Home"
           component={HomeStackScreen}
           options={({ navigation }) => ({
             title: "Home",
             // Sets up header buttons for notifications and sign out
             headerLeft: () => (
               <View>
                 <Button
                   icon={<Icon name="logout" size={25} color="#000000" />}
                   onPress={signOutAlert}
                   type="clear"
                 ></Button>
               </View>
             ),
             // sets the icon for the home bottom tab screen
             headerShown: true,
             tabBarShowLabel: false,
           })}
         />
       </Tab.Navigator>