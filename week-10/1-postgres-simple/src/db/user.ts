import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
   // await client.connect();

   const query = `INSERT INTO users (username, password, name) VALUES ($1 ,$2, $3) RETURNING username, password, name`;
   const res = await client.query(query,[username, password, name]);

   return res.rows[0];
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    // await client.connect();

    const query = `SELECT users.username, users.id, users.name FROM users WHERE users.id = $1`;
    const res = await client.query(query,[userId]);

    return res.rows[0];
    
}
