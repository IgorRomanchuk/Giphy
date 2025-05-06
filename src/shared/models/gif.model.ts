import { ImagesModel } from './images.model'
import { UserModel } from './user.model'

export interface GifSchema {
  type: string
  id: string
  slug: string
  url: string
  bitly_url: string
  embed_url: string
  username: string
  source: string
  rating: string
  content_url: string
  user: UserModel
  source_tld: string
  source_post_url: string
  update_datetime: string
  create_datetime: string
  import_datetime: string
  trending_datetime: string
  images: ImagesModel
  title: string
  alt_text: string
}
