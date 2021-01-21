import { useQuery, gql } from '@apollo/client'

const PodcastQuery = gql`
  {
    Podcast {
      title
    }
  }
`

const Podcasts = () => {
  const { data } = useQuery(PodcastQuery)

  return (
    <div>
      <ul>
        {data?.Podcast.map((v) => {
          return <li key={v.title}>{v.title}</li>
        })}
      </ul>
    </div>
  )
}

export default Podcasts
