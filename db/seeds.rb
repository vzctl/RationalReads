# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

user1 = User.create({username: "amitpasdfmin", password_digest: "asdfasdfasdfasdf", email: "asdfasdf", session_token: "Afasdasdf"})
user2 = User.create({username: "amitsdpamin", password_digest: "asdfasdfasdfasdf", email: "asdfddddasdf", session_token: "Afasdsssasdf"})
user3 = User.create({username: "amddditpamin", password_digest: "asdfasdfasdfasdf", email: "asdfasddddf", session_token: "Afasdaaaasdf"})
user4 = User.create({username: "amiddsstpamin", password_digest: "asdfasdfasdfasdf", email: "asdfaaaasdf", session_token: "Afwwwwasdasdf"})


work1 = Work.create({name: "Harry Potter and the Methods of Rationality", author: " Eliezer Yudkowsky", link: "http://hpmor.com/", description: "Petunia married a biochemist, and Harry grew up reading science and science fiction. Then came the Hogwarts letter, and a world of intriguing new possibilities to exploit. And new friends, like Hermione Granger, and Professor McGonagall, and Professor Quirrell..."})
work2 = Work.create({name: "Harry Potter and the Methods of Rationality2", author: " Eliezer Yudkowsky", link: "http://hpmor.com/", description: "Petunia married a biochemist, and Harry grew up reading science and science fiction. Then came the Hogwarts letter, and a world of intriguing new possibilities to exploit. And new friends, like Hermione Granger, and Professor McGonagall, and Professor Quirrell..."})
work3 = Work.create({name: "Harry Potter and the Methods of Rationality3", author: " Eliezer Yudkowsky", link: "http://hpmor.com/", description: "Petunia married a biochemist, and Harry grew up reading science and science fiction. Then came the Hogwarts letter, and a world of intriguing new possibilities to exploit. And new friends, like Hermione Granger, and Professor McGonagall, and Professor Quirrell..."})
work4 = Work.create({name: "Harry Potter and the Methods of Rationality4", author: " Eliezer Yudkowsky", link: "http://hpmor.com/", description: "Petunia married a biochemist, and Harry grew up reading science and science fiction. Then came the Hogwarts letter, and a world of intriguing new possibilities to exploit. And new friends, like Hermione Granger, and Professor McGonagall, and Professor Quirrell..."})
work5 = Work.create({name: "Harry Potter and the Methods of Rationality5", author: " Eliezer Yudkowsky", link: "http://hpmor.com/", description: "Petunia married a biochemist, and Harry grew up reading science and science fiction. Then came the Hogwarts letter, and a world of intriguing new possibilities to exploit. And new friends, like Hermione Granger, and Professor McGonagall, and Professor Quirrell..."})
work6 = Work.create({name: "Harry Potter and the Methods of Rationality6", author: " Eliezer Yudkowsky", link: "http://hpmor.com/", description: "Petunia married a biochemist, and Harry grew up reading science and science fiction. Then came the Hogwarts letter, and a world of intriguing new possibilities to exploit. And new friends, like Hermione Granger, and Professor McGonagall, and Professor Quirrell..."})
work7 = Work.create({name: "Harry Potter and the Methods of Rationality7", author: " Eliezer Yudkowsky", link: "http://hpmor.com/", description: "Petunia married a biochemist, and Harry grew up reading science and science fiction. Then came the Hogwarts letter, and a world of intriguing new possibilities to exploit. And new friends, like Hermione Granger, and Professor McGonagall, and Professor Quirrell..."})
work8 = Work.create({name: "Harry Potter and the Methods of Rationality8", author: " Eliezer Yudkowsky", link: "http://hpmor.com/", description: "Petunia married a biochemist, and Harry grew up reading science and science fiction. Then came the Hogwarts letter, and a world of intriguing new possibilities to exploit. And new friends, like Hermione Granger, and Professor McGonagall, and Professor Quirrell..."})
work9 = Work.create({name: "Harry Potter and the Methods of Rationality9", author: " Eliezer Yudkowsky", link: "http://hpmor.com/", description: "Petunia married a biochemist, and Harry grew up reading science and science fiction. Then came the Hogwarts letter, and a world of intriguing new possibilities to exploit. And new friends, like Hermione Granger, and Professor McGonagall, and Professor Quirrell..."})


rating1 = Rating.create({work_id: 1, user_id: 1, rating: 4})
rating2 = Rating.create({work_id: 1, user_id: 2, rating: 5})
rating3 = Rating.create({work_id: 1, user_id: 3, rating: 1})
rating4 = Rating.create({work_id: 1, user_id: 4, rating: 1})

rating5 = Rating.create({work_id: 2, user_id: 1, rating: 2})
rating6 = Rating.create({work_id: 2, user_id: 2, rating: 2})
rating7 = Rating.create({work_id: 2, user_id: 3, rating: 1})
rating8 = Rating.create({work_id: 2, user_id: 4, rating: 1})

rating9 = Rating.create({work_id: 3, user_id: 1, rating: 4})
rating10 = Rating.create({work_id: 3, user_id: 3, rating: 4})
rating11 = Rating.create({work_id: 3, user_id: 3, rating: 5})
rating12 = Rating.create({work_id: 3, user_id: 4, rating: 5})



Work.create({name: "Harry Potter and the Methods of Rationality10", author: " Eliezer Yudkowsky", link: "http://hpmor.com/", description: "Petunia married a biochemist, and Harry grew up reading science and science fiction. Then came the Hogwarts letter, and a world of intriguing new possibilities to exploit. And new friends, like Hermione Granger, and Professor McGonagall, and Professor Quirrell..."})
