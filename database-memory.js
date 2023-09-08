import { randomUUID } from "crypto"

export class DatabaseMemory {
  #videos = new Map()

  list(search) {
    // Array.from(this.#videos.values())
    return [...this.#videos.values()].filter(video => {
      if (!search) {
        return true
      }
      return video.title.includes(search)
    })
  }

  create(video) {
    const videoId = randomUUID()
    video.id = videoId
    this.#videos.set(videoId, video)
  }

  update(id, video) {
    this.#videos.set(id, video)
  }

  delete(id) {
    this.#videos.delete(id)
  }
}