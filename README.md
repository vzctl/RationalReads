== README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


Please feel free to use a different markup language if you do not plan to run
<tt>rake doc:app</tt>.

# Issues
1.  In both work_index and work_read, many functions duplicated
7.  Increment # of comments on show page when a user submits a comment
8.  Fetch all books once for entire site, instead of multiple times for each collection
9.  Not interested button (to filter recommendations)
10. Not doing bayesian average
13. Comment sort getting called in home page?
14. Am pluralizing comments and ratings, even when there's only 1
15. Avg rating isn't pushing based on size of object
16. Arrow syntax defining routes, get rid of api folder, point from route to controller action
18. If click on search item, shouldn't go to search action
20. Search results should have links as titles
21. In work show page, label average rating
22. In stats row, group together rating stars and average rating, and also make cleared (e.g. two numbers in a row might be confusing)
23. Move autocomplete to server-side, once database gets large
24. Add global function to fetch and give user id / currentUser backbone model
25. Instead of render json: comment on success, user jbuilder
26. Need to add event for onclick, if not in searchbar, clear search items (current only mouseout)
27. Move chapter controller to api namespace
28. Update comment count when leave comment
29. Move chapter show jbuilder to partial
<!-- 30. Parse page count in collection instead of model (requires manually parsing collection) -->

# Features to add
0. Add length to work
1. Tags
2. Chapter Functionality
3. Like comments
4. Karma?
5. Sequels / Series
6. Author Functionality
8. Lists
9. Calc time on client side, auto-update, e.g. every minute (search for plugin)

# Display Ideas
1. Logo
2. Navbar styling
3. Everything

# ToDo
1. Add works (put in all major works - 20 - 30)
2. For new chapter form, add plus sign and hover change color
3. Figure out filtering animation for homepage
4. Get "more..." on homepage to somehow go down (probs have to move out of left and right) and into a page footer
10. PG backup gem
11. Send out r post

transparent white background, on top of light bookshelf background
