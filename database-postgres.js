import { randomUUID } from "crypto"
import sql from './db.js';

export class DatabasePostgres {

  async list(search) {
    let videos

    if (search) {
      videos = await sql`SELECT * FROM videos WHERE title LIKE ${'%'+search+'%'}`
    } else {
      videos = await sql`SELECT * FROM videos`
    }

    return videos
  }

  async create(video) {
    const videoId = randomUUID()
    video.id = videoId
    await sql`INSERT INTO videos (id, title, description, duration) VALUES (${videoId}, ${video.title}, ${video.description}, ${video.duration})`
    return videoId
  }

  async update(id, video) {
    await sql`UPDATE videos SET title=${video.title}, description=${video.description}, duration=${video.duration} WHERE id=${id}`
    return id
  }

  async delete(id) {
    await sql`DELETE FROM videos WHERE id=${id}`
    return id
  }
}