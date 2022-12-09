import { useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Modal from 'react-modal'
import './App.css'

const API_URL = "http://localhost:8000"
const queryClient = new QueryClient()
Modal.setAppElement('#root')


const GetIssues = () => {
  const { isLoading, error, data } = useQuery('issuesData', () =>
     fetch(`${API_URL}/issues`).then(res =>
       res.json()
     )
   )

   if(isLoading) return 'Cargando...'

   if(error) return `Ocurrió un error ${error.message}`

   let issues = data.results

   return(
    <div className='issues-list'>
        {issues
          //.filter(i => i.description !== null && i.description !== "<br />" && i.description !== "<br/>")
          .map((i) => {
          return <SpawnModal issue={i}></SpawnModal>
        })}
    </div>
   )
}

const SpawnModal = (props) => {
  const issue = props.issue
  const [modalIsOpen, setIsOpen] = useState(false);

  let openModal = () => {
    setIsOpen(true)
  }
  let closeModal = () => setIsOpen(false)

  const style = {
    content: {
      backgroundImage:"linear-gradient(to right, #242424 0%, black 100%)",
    }
  }

  return(
    <>
    <div onClick={() => openModal()} className="card" style={{backgroundImage:`url("${issue.image.super_url}")`, boxShadow:"0 0 50px rgba(0, 0, 0, 0.515)"}}></div>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={style}
      contentLabel={props.issue.cover_date}
      >

      <img src={issue.image.screen_url} />
      <h1>{issue.name ?? issue.volume.name ?? "El api no provee un nombre de issue ni de volumen"}</h1>
      <p dangerouslySetInnerHTML={{__html: issue.description ?? issue.deck ?? "No description"}}></p>
      <span><i className="fa-sharp fa-solid fa-calendars"></i>Release Date: {new Date(issue.cover_date).toLocaleDateString() ?? "No tiene fecha de publicacion"}</span>
      
    </Modal>
    </>
  )
}

function App() {

  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
          <GetIssues />
        </QueryClientProvider>
    </div>
  )

}

export default App
