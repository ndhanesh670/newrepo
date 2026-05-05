import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"

const Search = () => {
    const [searchParams] = useSearchParams()
    const find = searchParams.get('q')
  return (
    <>
    c
    </>
  )
}

export default Search