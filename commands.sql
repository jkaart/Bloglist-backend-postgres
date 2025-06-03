CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author character varying(255),
    url character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    likes int DEFAULT 0
);

INSERT INTO blogs (title, author, url, likes)
  VALUES
    ('React patterns', 'Michael Chan', 'https://reactpatterns.com/', 7),
    ('Go To Statement Considered Harmful', 'Edsger W. Dijkstra','http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', 0);