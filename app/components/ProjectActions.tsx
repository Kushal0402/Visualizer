"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { deleteProject, fetchToken } from '@/lib/actions'
import { useRouter } from 'next/navigation'

const ProjectActions = ({projectId} : {projectId: string}) => {
  
  const [isDeleting, setIsDeleting] = useState(false)
  
  const router = useRouter();


  const handleDelete = async () => {
    setIsDeleting(true);
    const { token } = await fetchToken();
    try {
      await deleteProject(projectId, token);
      router.push('/')
    } catch(err) {
      console.log(err)
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <Link href={`/edit-project/${projectId}`} className='flexCenter edit-action_btn'>
        <Image src="/pencile.svg" width={16} height={16} alt="edit"/>
      </Link>

      <button type='button' className={`flexCenter delete-action_btn ${isDeleting ? 'bg-gray' : 'bg-red-600'} `} onClick={handleDelete}>
        <Image src='/trash.svg' width={16} height={16} alt='Delete'/>
      </button>
    </>
  )
}

export default ProjectActions