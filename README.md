## The Golden Rule:

🦸 🦸‍♂️ `Stop starting and start finishing.` 🏁

If you work on more than one feature at a time, you are guaranteed to multiply your bugs and your anxiety.

## Making a plan

1. **Make a drawing of your app. Simple "wireframes"**
![wireframe for workshop organizer](/assets/Workshop%20Organizer.png)
![wireframe for workshop editor](/assets/workshop%20organizer%20edit.png)
1. **Once you have a drawing, name the HTML elements you'll need to realize your vision**
1. **For each HTML element ask: Why do I need this?**
1. **Once we know _why_ we need each element, think about how to implement the "Why" as a "How"**
1. **Find all the 'events' (user clicks, form submit, on load etc) in your app. Ask one by one, "What happens when" for each of these events. Does any state change?**
1. **Think about how to validate each of your features according to a Definition of Done**
1. **Consider what features _depend_ on what other features. Use this dependency logic to figure out what order to complete tasks.**

## HTML Elements for workshop page
-template header, main, footer
    -header
        -img logo with text
    -main
        -section 1
            -div for welcome
            -div to hold anchor tags
                -anchor tag for add page (way to connect to add member page)
                -anchor tag for workshop page (way to connect to workshops available)
        -section 2
            -div to hold search bar (to search for specific workshops)
                -button for search bar
                -input for search bar
            -div to hold all workshops (to display all rendered workshops)
    -footer

## HTML Elements for add page
-template heaeder, main, footer
    -header
        -image logo with text
    -main
        -section
            -div for description of what is happening on this page
                -h2 tag
            -div to hold form
                -input for first name
                -input for last name
                -selector for workshop
                    -render workshop options
                -button for form submit
    -footer

## HTML Elements for edit page
-template heaeder, main, footer
    -header
        -image logo with text
    -main
        -section
            -div for description of what is happening on this page
                -h2 tag
            -div to hold form
                -input for first name
                -input for last name
                -selector for workshop
                    -render workshop options
                -button for form submit
    -footer