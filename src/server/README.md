# OUTLINE: backend-server

----------------

client will send login request with google id_token
server will check to see if id_token is valid
if the id_token is invalid, it sends back an error response

if the id_token is valid and the profile_info in the id_token is that of an already existing user in the MongoDb database then the server will establish a secure connection with the client and begin listening for requests

if the id_token is valid but the profile_info doesn't match an existing user then the server create the user in the database before establishing a secure connection and listening for requests

the secure connection will be established by establishing that the session is secure on the server-side

if sess.isAuthernticated is true, then the server will listen to any requests, otherwise not

Once a secure connection is established, clients can request mood data from the database for client-side anal (//FAROFF: server-side anal) or clients can send new mood data/ update existing mood data for the day
