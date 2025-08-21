import { useState } from "react"
import { Link, useNavigate } from 'react-router'
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    
    if(!title.trim() || !content.trim() ){
      toast.error('All fields are required');
      return
    }

    setLoading(true)
    try {
      await api.post('/notes', {
        title,
        content
      })
      toast.success('Note Created Successfully')
      navigate('/')
    } catch (error) {
      console.log('Error creating note', error);
      if(error.response.status === 429){
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀"
        });
      } else {
        toast.error('Failed to create note')
      }
      
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Link to={'/'} className="btn btn-ghost mb-6 text-blue-500">
            <ArrowLeftIcon className="size-5 text-blue-500"/>
            Back to notes
            </Link>

            <div className="card bg-white border border-gray-200">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4 text-blue-500">Create New Notes</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-medium">Title</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Note Title"
                      className="input input-bordered bg-white"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-medium">Content</span>
                    </label>
                    <textarea 
                      type="text" 
                      placeholder="write your note here..."
                      className="textarea textarea-bordered h-32 bg-white"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>

                  <div className="card-actions justify-end">
                    <button type="submit" className="btn btn-primary text-white" disabled={loading}>
                      {loading ? 'Creating...' : 'Create Note'}
                    </button>
                  </div>
                </form>

              </div>

            </div>
          </div>
        </div>
    </div>
  )
}

export default CreatePage
