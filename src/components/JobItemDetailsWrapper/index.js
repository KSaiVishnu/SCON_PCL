// JobItemDetailsWrapper.js
import React from 'react'
import { useParams } from 'react-router-dom'
import JobItemDetails from '../JobItemDetails'

const JobItemDetailsWrapper = () => {
  const params = useParams()
  return <JobItemDetails params={params} />
}

export default JobItemDetailsWrapper
