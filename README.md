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
2.  In Your Bookshelf, the items are sorted by avg rating rather than your rating
3.  Instead of replacing starts with, e.g. "Rating updating!", just flash it instead (so, gone, updated, back)
4.  Limit number of characters displayed in read_item and full_item
7.  Increment # of comments on show page when a user submits a comment
8.  Fetch all books once for entire site, instead of multiple times for each collection
9.  Not interested button (to filter recommendations)
10. Not doing bayesian average
11. Raty not working fully on front page
12. Add about page
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

# Features to add
0. Add length to work
1. Tags
2. Chapter Functionality
3. Like comments
4. Karma?
5. Sequels / Series
6. Author Functionality
7. Add tabs to homepage, to each side (e.g. highest rated, most commented, longest)
8. Use amazon api to populate work form from search bar
15. Calc time on client side, auto-update, e.g. every minute (search for plugin)

# Display Ideas
1. Logo
2. Navbar styling
3. Everything

# ToDo
1. Add works (put in all major works - 20 - 30)
2. Styling
3. Bells and whistles
4. Styling
5. Bug fixes
6. Edit git log to repace aastudent with amit
7. Send out r post
