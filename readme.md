# Reactive lib with jQuery

- In the file main.js contains all programing, you need import JQuery lib in your html, copy and paste this code into to de your file javascript and then in your html mark the fields input with 'required' or with your customization.

- In case of customization, you must to pass a array with params indicanting your inputs files that will be requireds.

###  Putting errors message

- For this, you need to put 'label-error' in property of span after input with your custom message.
See example: 
   <pre>
 ```html
    <label  for="name">Name</label>
	<input  id="name"  placeholder="Name"  required>
	<span  label-error>Field name invalid</span>
   ```
   </pre>

Enjoy!
By [Caio Torres](https://github.com/caiotorrez)
