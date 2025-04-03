  import { useState, useCallback } from "react"
  import axios from "axios"

  const useApi = (baseURL) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const api = axios.create({
      baseURL,
    })

    const req = useCallback(async (method, endpoint, reqData = null, headers = {}) => {
      setLoading(true)
      setError(null)
      try {
        const response = await api({
          method,
          url: endpoint,
          data: reqData,
          headers,
        })

        setData(response.data)
        return response.data
      } catch (err) {
        setError(err)
        console.error("API Error:", err)
        throw err
      } finally {
        setLoading(false)
      }
    }, [baseURL])

    return { req, loading, error, data }
  }

  export default useApi
    