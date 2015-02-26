# Issues
1.  In both work_index and work_read, many functions duplicated
7.  Increment # of comments on show page when a user submits a comment
8.  Fetch all books once for entire site, instead of multiple times for each collection
9.  Not interested button on recommendation results (to filter recommendations)
10. Not doing bayesian average
13. Comment sort getting called in home page?
14. Am pluralizing comments and ratings, even when there's only 1
15. Avg rating isn't pushing based on size of object
16. Arrow syntax defining routes, get rid of api folder, point from route to controller action
18. If click on search item, shouldn't go to search action
20. Search results should have links as titles
24. Add global function to fetch and give user id / currentUser backbone model
25. Instead of render json: comment on success, user jbuilder
26. Need to add event for onclick, if not in searchbar, clear search items (current only mouseout)
27. Move chapter controller to api namespace
29. Move chapter show jbuilder to partial
30. For index, fetching entire collection, and then fetching individual pages (double fetching)
32. Instead of using pre-wrap, convert newlines to p elements, probably using a regex
33. Implement pagination on recommendation and search pages
34. Add alt text to search results (from searchForm, not filterForm)
35. Mention that a user must be logged in to add a work before they click the add button (so they don't waste time)
36. Add average_rating column to works table (to avoid having to re-calc average all the time)

# Features to add
1. Filter out comments functionality
2. Edit/delete comments
3. Show ratings distribution on work show page
3. Like comments
4. Karma?
5. Sequels / Series
6. Author Functionality
8. Lists
9. Add group id to tags, perhaps even add a group table (e.g. completion status, genre, medium, etc...)
10. Add delete button next to edit button
11. Password reset

# ToDo
6. Calc bayes avg every time a user adds a rating (add column to works table)
8. Change "Log in first" text to "Log in first" link
9. Recommendation algorithm
