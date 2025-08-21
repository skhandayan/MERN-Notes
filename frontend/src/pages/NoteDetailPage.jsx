import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from 'react-router'
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate();

  const { id } = useParams()

  useEffect(() => {
    async function fetchNote(){
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        console.log('Error in fetching note', error);
        toast.error('Failed to fetch the note')
      } finally {
        setLoading(false)
      }
    } ;
    
    fetchNote();
  }, [id])

  async function handleDelete() {
    if(!window.confirm('Are you sure you want to delete this note?')) return;
    
    try {
      await api.delete(`/notes/${id}`)
      toast.success('Note deleted')
      navigate('/')
    } catch (error) {
      console.log('Error deleting the note:', error);
      toast.error('Failed to delte note')
    }
  };

  async function handleSave() {
    if(!note.title.trim() || !note.content.trim()){
      toast.error('Please add a title or content');
      return
    }

    setSaving(true)

    try {
      await api.put(`/notes/${id}`, note)
      toast.success('Note updated Successfully')
      navigate('/')
    } catch (error) {
      console.log('Error saving the note:', error);
      toast.error('Failed to update note')
    } finally {
      setSaving(false)
    }
  }
  
  if(loading){
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    )
  }

  return (
    <div className="min-h-screen absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
           <div className="flex items-center justify-between mb-6">
              <Link to={'/'} className="btn btn-ghost mb-6 text-blue-500">
              <ArrowLeftIcon className="size-5 text-blue-500"/>
              Back to notes
              </Link>
              <button onClick={handleDelete} className="btn btn-error btn-outline">
                <Trash2Icon className="h-5 w-5" />Delete Note
              </button>
            </div>

            <div className="card bg-white border border-gray-200">
              <div className="card-body">
                <div className="form-control mb-4">
                  <h2 className="card-title text-2xl mb-4 text-blue-500">Create New Notes</h2>
                  <label className="label">
                    <span className="label-text font-medium">Title</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Note Title"
                    className="input input-bordered bg-white text-gray-500"
                    value={note.title}
                    onChange={(e) => setNote({...note, title: e.target.value})}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-medium">Content</span>
                  </label>
                  <textarea 
                    type="text" 
                    placeholder="write your note here..."
                    className="textarea textarea-bordered h-32 bg-white text-gray-500"
                    value={note.content}
                    onChange={(e) => setNote({...note, content: e.target.value})}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary text-white" disabled={saving} onClick={handleSave}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>

              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage
