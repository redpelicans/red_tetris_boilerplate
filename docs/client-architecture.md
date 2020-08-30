# **Client** Architecture

The entry point of the client side application is index.js which is located at the root of the client folder.

## **Folders**

### **actions**

This folder contains all actions that can be used for the global state manager.

### **reducers**

This folder contains all the reducers used by the global state manager.

### **components**

This is where you will put your UI components. These should be small independent piece of code with high reusability.

### **screens**

It contains the pages (URLs) of the application. A screen (or page, or container... Call it as you want) is made of components. This is why their reusability is very important to avoid code bloat.

### **hooks**

If you write a custom hook, this is where you should put it.
