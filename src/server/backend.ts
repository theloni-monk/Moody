export default function handleReq(){}

/**OUTLINE: websocket-server 
 * socket once opened will send google id_token
 * server will check to see if id_token is valid
 * if the id_token is invalid, it sends back an error response
 * 
 * if the id_token is valid and the profile_info in the id_token is that of an already existing user-
 * - in the MongoDb database then the server will establish a secure connection with the client and begin listening for requests
 * 
 * if the id_token is valid but the profile_info doesn't match an existing user then the server create the user in the database - 
 * - before establishing a secure connection and listening for requests
 * 
 * Once a secure connection is established, clients can request mood data from the database for client-side anal (FAROFF_TODO: server-side anal)
 * - or clients can send new mood data/ update existing mood data for the day
*/