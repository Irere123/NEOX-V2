SELECT * FROM users AS u JOIN friends AS f ON u.id = f.userId WHERE  f.friendId = 2
UNION SELECT * FROM users as u join friends AS f ON p.userId  = f.friendId WHERE f.userId